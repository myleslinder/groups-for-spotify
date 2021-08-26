import '../web/styles/global.css'
import { ReactElement } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import AppLayout from '../web/layouts/AppLayout'
import MarketingLayout from '../web/layouts/MarketingLayout'

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  const router = useRouter()
  const Layout = router.route.slice(1).startsWith('app')
    ? AppLayout
    : MarketingLayout
  return (
    <>
      <Head>
        {/* <link rel="icon" href="/M-logo.svg" /> */}
        <title>Groups for Spotify</title>
        <meta name="description" content="Groups for Spotify"></meta>
      </Head>
      {/* nned to use the page props to populate components and color in the app navigation */}
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
