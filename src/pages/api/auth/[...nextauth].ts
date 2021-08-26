import NextAuth, { Session } from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getSpotifyProfile } from '../../../api/services/spotify'
import { db } from '../../../api/lib/db'

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: [
        'user-library-read',
        'playlist-modify-private',
        'ugc-image-upload',
        'user-read-playback-state',
      ].join(' '),
    }),
  ],
  callbacks: {
    session: async (session, user): Promise<Session> => {
      // this is where spotify access token should be refreshed when needed (how to confirm okay to do so)
      // also will augment the session with whats needed for api calls to spotify
      const dbUser = await db.user.findFirst({
        where: { id: user.id as string },
      })
      session.user.id = dbUser?.id
      return session
    },
  },
  events: {
    linkAccount: async ({ user, providerAccount }) => {
      if (providerAccount.provider === 'spotify') {
        const { id } = user
        const { accessToken } = providerAccount
        const spotifyUserProfile = await getSpotifyProfile(
          accessToken as string
        )
        const username = spotifyUserProfile.id
        const displayName = spotifyUserProfile.display_name
        let image
        if (spotifyUserProfile.images?.length) {
          image = spotifyUserProfile.images[0].url
        }
        // we can ignore return?
        await db.user.update({
          where: {
            id: id as string,
          },
          data: {
            image,
            username,
            displayName,
          },
        })
        // need to add the expiry here to the Account
        // but the providerAccount object isnt the db one?
        // await db.account.update({where: {}})
      }
      return
    },
  },
  adapter: PrismaAdapter(db),
})
