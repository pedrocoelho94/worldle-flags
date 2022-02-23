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
        autoClose={3000}
        pauseOnHover={false}
        bodyClassName="font-bold text-center"
        pauseOnFocusLoss={false}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
