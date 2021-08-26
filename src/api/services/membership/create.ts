import { GroupMembership } from '@prisma/client'
import { db } from '../../lib/db'
import { getSpotifyAccount } from '../spotify/auth'
import { createPlaylist } from '../spotify/playlists'

const createSpotifyPlaylist = async (
  userId: string,
  name: string,
  description: string
): Promise<string> => {
  const spotifyAccount = await getSpotifyAccount(userId)

  const spotifyPlaylist = await createPlaylist(
    spotifyAccount?.providerAccountId as string,
    { name, description }
  )
  return spotifyPlaylist.id
}

export const createMembership = async (
  group,
  userId
): Promise<GroupMembership> => {
  const playlistId = await createSpotifyPlaylist(
    userId,
    group.name,
    group.description
  )
  return db.groupMembership.create({
    data: {
      groupId: group.id,
      userId,
      playlistId,
      status: 'OKAY',
    },
  })
}
