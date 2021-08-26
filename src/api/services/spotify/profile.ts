import fetch from 'node-fetch'

export const getSpotifyProfile = async (
  accessToken: string
): Promise<SpotifyApi.UserProfileResponse> => {
  const SPOTIFY_USER_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me'

  const meRes = await fetch(SPOTIFY_USER_PROFILE_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return meRes.json()
}
