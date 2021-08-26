import { InvitationLink } from '@prisma/client'
import { db } from '../../lib/db'

export const createGroupInvitation = async (
  userId: string,
  groupId: string
): Promise<InvitationLink> => {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)
  return db.invitationLink.create({
    data: {
      hash: 'something-short-but-unique',
      expiresAt,
      groupId,
      userId,
    },
  })
}

export const deleteExpriredInvitations = async () => {
  return db.invitationLink.deleteMany({ where: {} })
}
