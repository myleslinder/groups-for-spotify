import { db } from '../../lib/db'

// check for maximum capacity here and throw an error
export const prepareSlotForGroup = async (
  dayOfWeek: number,
  utc24Hour: number
): Promise<string> => {
  let syncSlotId: string | void
  const existingSyncSlot = await db.syncSlot.findFirst({
    where: {
      dayOfWeek: dayOfWeek,
      utc24Hour: utc24Hour,
    },
  })

  if (existingSyncSlot) {
    syncSlotId = existingSyncSlot.id
  } else {
    const createdSyncSlot = await db.syncSlot.create({
      data: {
        dayOfWeek: dayOfWeek,
        utc24Hour: utc24Hour,
      },
    })
    syncSlotId = createdSyncSlot.id
  }
  return syncSlotId
}
