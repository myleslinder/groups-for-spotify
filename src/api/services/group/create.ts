import { Group, GroupMembership } from '@prisma/client'
import { db } from '../../lib/db'
import { createMembership } from '../membership/create'
import { prepareSlotForGroup } from '../sync/slot'

const insertGroup = async ({
  dayOfWeek,
  utc24Hour,
  name,
  description,
}: {
  dayOfWeek: number
  utc24Hour: number
  name: string
  description: string
}) => {
  const syncSlotId = await prepareSlotForGroup(dayOfWeek, utc24Hour)
  return db.group.create({
    data: {
      name: name,
      description: description,
      syncSlotId,
    },
  })
}

export const createGroup = async (
  userId: string,
  groupDetails
): Promise<{ group: Group; membership: GroupMembership }> => {
  // CREATE GROUP
  const group = await insertGroup(groupDetails)
  // CREATE MEMBERSHIP
  const membership = await createMembership(group, userId)
  return { group, membership }
}
