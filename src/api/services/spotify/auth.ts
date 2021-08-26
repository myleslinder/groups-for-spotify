import { Account } from '@prisma/client'
import fetch from 'node-fetch'
import { db } from '../../lib/db'

export const getSpotifyAccount = async (
  userId: string
): Promise<Account | null> => {
  const spotifyAccount = await db.account.findFirst({
    where: {
      providerType: 'spotify',
      user: {
        id: userId,
      },
    },
  })
  return spotifyAccount
}

export const getAccessToken = async (
  spotifyUserId: string
): Promise<string | undefined | null> => {
  const spotifyAccount = await getSpotifyAccount(spotifyUserId)

  // check the expiry and refresh if need be
  // adding it back to the db for next call
  // if(spotifyAccount?.accessTokenExpires){}
  return spotifyAccount?.accessToken
}

export const refreshSpotifyAuth = async (
  refreshToken: string
): Promise<SpotifyRefreshObject> => {
  const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const paramsUrl = new URL(SPOTIFY_TOKEN_ENDPOINT)
  paramsUrl.searchParams.append('grant_type', 'refresh_token')

  paramsUrl.searchParams.append('refresh_token', refreshToken)
  const credentials = `${clientId}:${clientSecret}`
  const basic = Buffer.from(credentials).toString('base64')
  const Authorization = `Basic ${basic}`
  const res = await fetch(paramsUrl.toString(), {
    method: 'POST',
    headers: {
      Authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return await res.json()
}

/**
 * MARK - Type Definitions
 */

type SpotifyRefreshObject = {
  access_token: string
  token_type: 'Bearer'
  scope: string
  expires_in: number
}
