import { Group } from '@prisma/client'
import { db } from '../../lib/db'
import { updatePlaylistForUser } from '../spotify/playlists'
import { saveSongsForUserWeekly } from '../spotify/songs'

const createGroupSync = async (groupId: string) => {
  return db.groupSync.create({
    data: {
      groupId,
      datetime: new Date(),
    },
  })
}

const getMemberships = async (groupId: string) => {
  return db.groupMembership.findMany({
    where: {
      groupId,
    },
  })
}

const createSongSync = async (
  userId: string,
  membershipId: string,
  groupSyncId: string
) => {
  // check if this work has been done already by looking in the db
  // for a songsync?
  const songUris = await saveSongsForUserWeekly(userId)
  return db.songSync.create({
    data: {
      membershipId,
      songIds: songUris,
      groupSyncId,
    },
  })
}

const createPlaylistSync = async (
  membership,
  groupSyncId: string,
  songIds: string[]
) => {
  await updatePlaylistForUser(membership.userId, membership.playlistId, songIds)
  await db.playlistSync.create({
    data: {
      membershipId: membership.id,
      groupSyncId,
    },
  })
}

// Need to handle deleting the group if no more memberships
export default async (
  group: Group,
  groupSyncId: string | void
): Promise<void> => {
  // create the groupsync
  if (!groupSyncId) {
    const groupSync = await createGroupSync(group.id)
    groupSyncId = groupSync.id
  }
  const memberships = await getMemberships(group.id)
  // create the songsyncs
  const songSyncs = await Promise.all(
    memberships.map((membership) => {
      return createSongSync(membership.userId, membership.id, groupSyncId)
    })
  )
  // create the playlistsync
  await Promise.all(
    memberships.map((membership) => {
      const songIds = songSyncs.reduce((all, curr) => {
        if (curr.membershipId !== membership.id) {
          return all.concat(curr.songIds)
        }
        return all
      }, [])
      return createPlaylistSync(membership, groupSyncId, songIds)
    })
  )
}
