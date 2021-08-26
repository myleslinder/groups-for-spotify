import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../api/lib/db'
import requireAuth from '../../../api/middleware/auth'
import { findGroup } from '../../../api/services/group/find'
import { createMembership } from '../../../api/services/membership/create'
import executeBackground from '../../../api/services/sync/execute-background'

// when someone *new* joins a group we need to ensure they're added
// to the most recent group sync and everyones playlists are updated
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const session = await requireAuth(req, res)
    const { groupId } = req.body
    const group = await findGroup(groupId)
    const mostRecentGroupSync = await db.groupSync.findFirst({ where: {} })
    const membership = await createMembership(group, session?.user.id)
    // change to a membership count >= 2 check?
    if (group) {
      executeBackground(group, mostRecentGroupSync?.id)
    }
    res.status(201).json(membership)
  } else {
    res.status(401).end()
  }
}
