const Footer = () => {
  return (
    <footer className="my-8 flex h-12 flex-col items-center  justify-center px-2 text-white sm:px-10">
      <span className="text-center">
        If you find any bug, please let me know.
      </span>
      <span className="text-center">
        Worldle Flags by{' '}
        <a
          className="text-cyan-500 underline transition-all hover:text-cyan-600"
          href="https://pedrocoelho.netlify.app/"
          target="_blank"
        >
          Pedro Coelho
        </a>
      </span>
    </footer>
  )
}

export default Footer
