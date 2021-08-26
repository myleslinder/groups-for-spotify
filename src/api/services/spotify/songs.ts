import fetch from 'node-fetch'
import { getAccessToken } from './auth'

export const saveSongsForUserWeekly = async (
  userId: string
): Promise<string[]> => {
  const { items } = await getSongsForUser(userId)
  const validSongUris = items
    .filter((item) => {
      const addedAt = new Date(item.added_at)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return addedAt > sevenDaysAgo
    })
    .map(({ track: { uri } }) => uri)
  return validSongUris
}

// TODO: update the offset as its possible to save more than 20 songs? could just be a max
const getSongsForUser = async (
  userId: string
): Promise<SpotifyApi.UsersSavedTracksResponse> => {
  const endpoint = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=20'
  const accessToken = await getAccessToken(userId)
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.json()
}
