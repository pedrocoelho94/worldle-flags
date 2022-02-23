import type { AppProps } from 'next/app'
import { ToastContainer, Flip } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={2000}
        bodyClassName="font-bold text-center"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
