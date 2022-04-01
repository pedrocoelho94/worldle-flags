export const pageView = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    path_url: url,
  })
}