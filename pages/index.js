import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import { Link } from '@components/Link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ModalConnectWallet from '@components/Modal'

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {ADDRESS, ABI} from "../config.js"

import { WalletContext } from '../context/Web3Context';

export default function Home() {
  const [modalShow, setModalShow] = useState(false);

  const { walletAddress, network, TheArtOfOriContract, signIn, signOut, signedIn, setSignedIn, totalSupply, setTotalSupply, tokenPrice, setTokenPrice } = React.useContext(WalletContext);
  
  if(signedIn == true){
    let reduceWallet = walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length-4, walletAddress.length);
  }  
  
  useEffect(() => {
    setModalShow(false);
  },[signedIn]);
 
  return (
    <div className="w-full h-screen min-h-screen bg-black bg-cover bg-center bg-no-repeat">
      <Head>
        <title>Souq</title>
        <link rel="icon" href="/logo.ico" />
  
        <meta property="og:title" content="souq" key="ogtitle" />
        <meta property="og:description" content="Here is mint.souq.com." key="ogdesc" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content="https://mint.souq.com/" key="ogurl"/>
        <meta property="og:image" content="https:/mint.souq.com/images/Hola.gif" key="ogimage"/>
        <meta property="og:site_name" content="https://mint.souq.com/" key="ogsitename" />

        <meta name="twitter:card" content="summary_large_image" key="twcard"/>
        <meta property="twitter:domain" content="mint.souq.com" key="twdomain" />
        <meta property="twitter:url" content="https://mint.souq.com/" key="twurl" />
        <meta name="twitter:title" content="Souq" key="twtitle" />
        <meta name="twitter:description" content="mint.souq.com" key="twdesc" />
        <meta name="twitter:image" content="https://mint.souq.com/images/Hola.gif" key="twimage" />
      </Head>
      <div className="flex items-center custom-text justify-between w-full p-3">
        <Link href="/" className=""><img src="images/logo.png" width="108" alt="Souq" className="logo-image" /></Link>
        <nav className="flex flex-wrap flex-row justify-around">
          <Link href="/mint" className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6 hidden md:block">
            MINT YOUR CARD
          </Link>             
          { signedIn != true ?
            <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6"  onClick={() => setModalShow(true)}>
              CONNECT WALLET
            </a>        
            :
            <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6" onClick={() => setModalShow(true)}>
              {reduceWallet}
            </a>                 
          }   
        </nav>
      </div> 
      <main>
        <img src="./images/souq-sign.png" className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2" width="640" style={{maxWidth:640}} />
      </main> 
      <Footer page="landing"/>
     <ModalConnectWallet
        show={modalShow}
        onHide={() => setModalShow(false)}
        signin={signIn}
        signedin={signedIn}
      />
     </div>
  )
}
