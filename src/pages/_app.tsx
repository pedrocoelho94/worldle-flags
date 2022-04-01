import type { AppProps } from 'next/app'
import { toast, ToastContainer, Flip } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import * as ga from '../lib/google-analytics'

import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="description" content="Worldle Flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>

      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={3000}
        pauseOnHover={false}
        bodyClassName="font-bold text-center"
        pauseOnFocusLoss={false}
      />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
