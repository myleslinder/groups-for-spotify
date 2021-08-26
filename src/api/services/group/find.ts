import { Group } from '@prisma/client'
import { db } from '../../lib/db'

export const findGroup = async (groupId: string): Promise<Group | null> => {
  return db.group.findFirst({
    where: {
      id: groupId,
    },
  })
}
