import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../api/lib/db'
import requireAuth from '../../../api/middleware/auth'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await requireAuth(req, res)
  if (req.method === 'GET') {
    const groups = await db.group.findMany({
      where: {
        memberships: {
          some: {
            userId: session?.user.id,
          },
        },
      },
    })
    res.status(200).json(groups)
  }
}
