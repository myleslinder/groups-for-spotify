import { NextApiRequest, NextApiResponse } from 'next'
import { findGroup } from '../../../api/services/group/find'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const { groupId } = req.body
    // GET THE GROUP
    const group = await findGroup(groupId)
    // GET THE SONGS FOR THE IDENTIFIED GROUPSYNC
  }

  res.json({})
}
