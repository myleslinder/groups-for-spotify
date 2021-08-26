import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../api/lib/db'
import executeBackground from '../../../api/services/sync/execute-background'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // verify the sender
  // determine the dow and utc24Hour
  const date = new Date()
  const dayOfWeek = date.getUTCDay()
  const utc24Hour = date.getUTCHours()
  // find all the groups with this sync slot
  const syncSlot = await db.syncSlot.findUnique({
    where: {
      dayOfWeek,
      utc24Hour,
    },
  })
  if (syncSlot) {
    const groups = await db.group.findMany({
      where: { syncSlotId: syncSlot.id },
    })
    // fan out the sync for each of the groups
    await Promise.all(groups.map(executeBackground))
  }
  res.status(200).json({})
}
