import Head from 'next/head'
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from '@components/Link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ModalConnectWallet from '@components/Modal'
import { Ratio } from "react-bootstrap";

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {ADDRESS, ABI} from "../config.js"

import { WalletContext } from '../context/Web3Context';

export default function Mint() {
  const [modalShow, setModalShow] = useState(false);

  const { walletAddress, TheArtOfOriContract, signIn, signOut, signedIn, setSignedIn, totalSupply, setTotalSupply, tokenPrice, setTokenPrice } = React.useContext(WalletContext);
  
  if(signedIn == true){
    let reduceWallet = walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length-4, walletAddress.length);
  }  
  
  return (
    <div className="w-full h-screen min-h-screen bg-mint-page-pattern bg-cover bg-center bg-no-repeat">
      <Head>
        <title>TheArtOfOri</title>
        <link rel="icon" href="/logo_ori.png" />
  
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
        <Link href="/" className=""><img src="images/logo_ori.png" width="108" alt="TheArtOfOri" className="logo-image" /></Link>
        <nav className="flex flex-wrap flex-row justify-around">
          <Link href="/mint" className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6 hidden md:block">
            MINT YOUR BADGE
          </Link>
          { signedIn != true ?
            <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6"  onClick={() => setModalShow(true)}>
              CONNECT WALLET
            </a>        
            :
            <>
              <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6">
                {reduceWallet}
              </a>
              <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6" onClick={() => signOut()}>
                Disconnect
              </a>                             
            </>
          }
        </nav>
      </div>  
      <main>
        <h1 className="text-3xl md:text-4xl custom-text">
          MINT YOUR BADGE
        </h1>        
        <div style={{ width: 320, height: '' }}>
          <Ratio aspectRatio="1x1">
            <video width="320" height="320" loop autoPlay muted>
              <source src="./images/3278_SQ_Green-V.webm" type="video/mp4"/>
            </video>               
          </Ratio> 
        </div>    
        { signedIn != true ?
          <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5" onClick={() => setModalShow(true)}>
            Connect Wallet
          </button>  
         :
          <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5">
            Mint Badge
          </button>       
        }
      </main> 
      <Footer />
     <ModalConnectWallet
        show={modalShow}
        onHide={() => setModalShow(false)}
        signin={signIn}
        signedin={signedIn}
      />
     </div>
  )
}
