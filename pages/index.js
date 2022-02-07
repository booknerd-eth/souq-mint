import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import { Link } from '@components/Link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ModalConnectWallet from '@components/Modal'

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

export default function Home() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="w-full h-screen min-h-screen bg-main-page-pattern bg-cover bg-center bg-no-repeat">
      <Head>
        <title>TheArtOfOri</title>
        <link rel="icon" href="/favicon.ico" />
  
        <meta property="og:title" content="TheArtOfOri" key="ogtitle" />
        <meta property="og:description" content="Here is mint.theartofori.com." key="ogdesc" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content="https://mint.theartofori.com/" key="ogurl"/>
        <meta property="og:image" content="https:/mint.theartofori.com/images/Hola.gif" key="ogimage"/>
        <meta property="og:site_name" content="https://mint.theartofori.com/" key="ogsitename" />

        <meta name="twitter:card" content="summary_large_image" key="twcard"/>
        <meta property="twitter:domain" content="mint.theartofori.com" key="twdomain" />
        <meta property="twitter:url" content="https://mint.theartofori.com/" key="twurl" />
        <meta name="twitter:title" content="TheArtOfOri" key="twtitle" />
        <meta name="twitter:description" content="mint.theartofori.com" key="twdesc" />
        <meta name="twitter:image" content="https://mint.theartofori.com/images/Hola.gif" key="twimage" />
      </Head>
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
      <main>
        <img src="./images/demo-main-page-logo.png" class="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2" width="250" style={{maxWidth:250}} />
      </main> 
      <Footer />
     <ModalConnectWallet
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
     </div>
  )
}
