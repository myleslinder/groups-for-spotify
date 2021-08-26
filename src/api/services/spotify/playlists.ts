import fetch from 'node-fetch'

import { getAccessToken } from './auth'
// export const getPlaylistsForGroup = async groupId => {}

export const createPlaylist = async (
  spotifyUserId: string,
  group: { name: string; description: string }
): Promise<any> => {
  const access_token = await getAccessToken(spotifyUserId)
  const endpoint = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${access_token}` },
    body: JSON.stringify({
      name: group.name,
      public: false,
      description: group.description,
    }),
  })
  const { id } = await res.json()
  const playlist = { spotifyUserId, id }

  return playlist
}

export const setPlaylistImage = async (
  accessToken: string,
  playlistId: string
): Promise<any> => {
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/images`
  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'image/jpeg',
    },
    // TODO: Update
    body: '',
  })
  return res.json()
}

export const updatePlaylistForUser = async (
  userId: string,
  playlistId: string,
  songUris: string[]
): Promise<any> => {
  const endpoint = new URL(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
  )

  endpoint.searchParams.append('uris', songUris.join())

  const access_token = await getAccessToken(userId)
  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}
