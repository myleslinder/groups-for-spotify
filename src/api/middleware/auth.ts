import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> => {
  const session = await getSession({ req })
  if (session) {
    return session
  } else {
    res.status(401).end()
    return null
  }
}
