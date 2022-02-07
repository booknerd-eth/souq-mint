import { Link } from '@components/Link'
export default function Header({ title }) {
  return <>
          <div className="flex items-center custom-text justify-between w-full p-3">
          <Link href="/" className=""><img src="images/logo.png" width="108" alt="TheArtOfOri" className="logo-image" /></Link>
          <nav className="flex flex-wrap flex-row justify-around">
            <Link href="/mint" className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6 hidden md:block">
              MINT YOUR BADGE
            </Link>
            <button className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6"  onClick={() => setModalShow(true)}>
              CONNECT WALLET
            </button>        
          </nav>
        </div> 
      </>
}
