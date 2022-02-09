import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
          <div className="flex items-center absolute bottom-6">
              <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="m-2 p-2">
                <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40c11.045 0 20-8.955 20-20S31.045 0 20 0 0 8.955 0 20s8.955 20 20 20zm3.177-28.333s2.736-.06 5.613 2.083c0 0 2.877 5.178 2.877 11.567 0 0-1.699 2.878-6.114 3.016 0 0-.718-.853-1.318-1.606 2.617-.734 3.617-2.362 3.617-2.362-.72.475-1.491.868-2.299 1.17-1 .417-1.958.695-2.896.853-1.711.313-3.465.306-5.174-.02a16.785 16.785 0 01-2.936-.851 11.752 11.752 0 01-1.55-.725c-.029-.015-.059-.03-.089-.05a.275.275 0 01-.08-.06 7.025 7.025 0 01-.56-.337s.96 1.588 3.497 2.342c-.6.753-1.338 1.646-1.338 1.646-4.417-.138-6.094-3.016-6.094-3.016 0-6.389 2.877-11.567 2.877-11.567 2.877-2.143 5.613-2.083 5.613-2.083l.2.238c-3.596 1.032-5.253 2.6-5.253 2.6s.438-.238 1.178-.577c2.137-.933 3.835-1.19 4.534-1.25l.045-.006c.101-.017.191-.034.295-.034a16.364 16.364 0 0110.05 1.865s-1.579-1.486-4.975-2.518l.28-.317v-.001zm-8.95 9.603c0 1.21.918 2.202 2.038 2.202 1.138 0 2.037-.992 2.037-2.202.02-1.21-.9-2.203-2.039-2.203-1.138 0-2.036.993-2.036 2.203zm7.291 0c0 1.21.919 2.202 2.039 2.202 1.138 0 2.036-.992 2.036-2.202s-.9-2.203-2.038-2.203-2.037.993-2.037 2.203z" fill="#fff"></path>
                </svg>
              </a>
              <a href="http://twitter.com/" target="_blank" rel="noopener noreferrer" className="m-2 p-2">
                <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40c11.045 0 20-8.955 20-20S31.045 0 20 0 0 8.955 0 20s8.955 20 20 20zm9.292-23.172c0 6.117-4.817 13.172-13.62 13.172v-.003a13.894 13.894 0 01-7.339-2.077c2.521.3 5.06-.387 7.085-1.918a4.903 4.903 0 01-2.77-.914 4.641 4.641 0 01-1.703-2.3 4.954 4.954 0 002.162-.08 4.818 4.818 0 01-2.757-1.606 4.537 4.537 0 01-1.083-2.932v-.058a4.886 4.886 0 002.173.578 4.633 4.633 0 01-2.007-2.805 4.5 4.5 0 01.524-3.373 13.518 13.518 0 004.401 3.433c1.7.833 3.562 1.31 5.467 1.403a4.492 4.492 0 01.302-2.961 4.7 4.7 0 012.103-2.172 4.933 4.933 0 013.035-.487c1.032.16 1.985.65 2.717 1.397a9.795 9.795 0 003.04-1.123 4.675 4.675 0 01-2.105 2.561 9.81 9.81 0 002.75-.73 9.565 9.565 0 01-2.389 2.395c.014.2.014.399.014.6z" fill="#fff"></path>
                </svg>
              </a>
              <a href="https://youtube.com" className="m-2 p-2">
                <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40c11.045 0 20-8.955 20-20S31.045 0 20 0 0 8.955 0 20s8.955 20 20 20zm9.117-27.052c1.003.247 1.795.972 2.061 1.894.489 1.671.489 5.158.489 5.158s0 3.487-.489 5.158c-.266.922-1.058 1.647-2.063 1.894C27.3 27.5 20 27.5 20 27.5s-7.297 0-9.117-.447c-1.003-.248-1.795-.973-2.061-1.895C8.333 23.487 8.333 20 8.333 20s0-3.487.489-5.158c.266-.922 1.058-1.647 2.061-1.894C12.703 12.5 20 12.5 20 12.5s7.297 0 9.117.448zM23.71 20l-6.098-3.167v6.334l6.1-3.167h-.002z" fill="#fff"></path>
                </svg>
              </a>
              <a className="m-2 p-2">
                <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40c11.045 0 20-8.955 20-20S31.045 0 20 0 0 8.955 0 20s8.955 20 20 20zm-4.991-11.409v2.391l.037.01a.158.158 0 00.04.008h.576c.77 0 1.54 0 2.308-.006.091 0 .2-.066.268-.132.725-.69 1.444-1.385 2.154-2.088a.634.634 0 01.5-.197c.538.004 1.077.004 1.615.004.539 0 1.077 0 1.615.005a.51.51 0 00.398-.16 2225.82 2225.82 0 015.312-5.15.493.493 0 00.168-.39c-.003-3.873-.003-7.75-.003-11.624v-.259H25.205c-4.585 0-9.17.001-13.755-.003-.16 0-.221.049-.271.194-.214.635-.43 1.268-.648 1.9-.155.453-.31.905-.463 1.357a1.235 1.235 0 00-.065.388C10 19.34 10 23.838 10 28.337c0 .042.003.085.005.13l.007.124h4.997zm-1.904-3.02V12.804H28.15v.222l-.001 3.1v6.199a.44.44 0 01-.144.348l-1.095 1.06-.001.001c-.585.567-1.17 1.134-1.759 1.696a.529.529 0 01-.333.134c-1.535.009-3.067.009-4.602.003a.457.457 0 00-.36.143c-.49.48-.984.957-1.478 1.435l-.74.716a4 4 0 01-.08.075l-.061.056v-2.42h-4.39zM20 17v5h-2v-5h2zm3 5h2v-5h-2v5z" fill="#fff"></path>
                </svg>
              </a>
          </div>
      </footer>
    </>
  )
}
