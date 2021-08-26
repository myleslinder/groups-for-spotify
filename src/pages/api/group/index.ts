import { NextApiRequest, NextApiResponse } from 'next'
import requireAuth from '../../../api/middleware/auth'
import { createGroup } from '../../../api/services/group/create'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // need to add a PUT/PATCH or w/e for updating/editing groups
  if (req.method === 'POST') {
    const session = await requireAuth(req, res)
    const { name, description, dayOfWeek, utc24Hour } = req.body
    // need to take the image as separate likely and do something with it

    // try catch required for handling syncSlot client side abuse
    const { group } = await createGroup(session?.user.id, {
      name,
      description,
      dayOfWeek,
      utc24Hour,
    })
    res.status(201).json(group)
  }
  res.status(401).end()
}
