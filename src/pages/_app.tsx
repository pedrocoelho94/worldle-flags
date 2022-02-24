import type { AppProps } from 'next/app'
import { ToastContainer, Flip } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Worldle Flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
