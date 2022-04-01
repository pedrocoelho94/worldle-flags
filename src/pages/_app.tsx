import type { AppProps } from 'next/app'
import { toast, ToastContainer, Flip } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

import Script from 'next/script'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Worldle Flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
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
