import Head from 'next/head'
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from '@components/Link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ModalConnectWallet from '@components/Modal'
import { Button, Ratio, Toast, Row, Col, ToastContainer } from "react-bootstrap";
import Swal from 'sweetalert'

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {ADDRESS, ABI} from "../config.js"

import { WalletContext } from '../context/Web3Context';
import swal from 'sweetalert';

export default function Mint() {
  const [modalShow, setModalShow] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const { walletAddress, network, TheArtOfOriContract, signIn, signOut, signedIn, setSignedIn, 
          totalSupply, setTotalSupply, tokenPrice, setTokenPrice,  tokenName,
          tokenSymbol, tokenOwner, tokenUri, currentTokenCount, maxTokenCount, mintTheArtOfOri, withdraw 
        } = React.useContext(WalletContext);
  
  if(signedIn === true){
    let reduceWallet = walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length-4, walletAddress.length);
  }  

  console.log("=== Max token count ===",maxTokenCount);
  useEffect(() => {
    setModalShow(false);   
  },[signedIn]);
  
  useEffect(() => {
    // if(network === "main" && network != null){
    //   setShowToast(true)
    // }
  },[network]);


  let buttonContent;

    if (signedIn !== true ) {
      buttonContent = <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5" onClick={() => setModalShow(true)}>
                          Connect Wallet
                      </button>
    } else if (signedIn === true && maxTokenCount > 0) {
      buttonContent =  <>            
                          <span className="custom-menu text-2xl text-white hover:text-slate-100 m-1">{currentTokenCount} / {maxTokenCount}</span>
                          <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5" onClick={() => mintTheArtOfOri()}>
                            Mint Card
                          </button>       
                        </>
    } else {      
      buttonContent = <button type="button" className="btn-mint flex text-xl md:text-2xl m-3 p-3 md:p-5">
                         <span className="pr-3">Connecting</span> 
                         <img src="images/loading.gif" width="30" />
                      </button>
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
        <Link href="/" className="">
          <img src="images/logo_ori.png" width="108" alt="TheArtOfOri" className="logo-image" />
        </Link>
        <nav className="flex flex-wrap flex-row justify-around">
          <Link href="/mint" className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6 hidden md:block">
            MINT YOUR CARD
          </Link>
          { signedIn !== true ?
            <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6"  onClick={() => setModalShow(true)}>
              CONNECT WALLET
            </a>        
            :
            <>
              <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6" onClick={() => setModalShow(true)}>
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
          MINT YOUR CARD
        </h1>        
        <div style={{ width: 320, height: '' }}>
          <Ratio aspectRatio="1x1">
            <video width="320" height="320" loop autoPlay muted>
              <source src="./images/3278_SQ_Green-V.webm" type="video/mp4"/>
            </video>               
          </Ratio> 
        </div>  
        { buttonContent }
        { signedIn === true  && tokenOwner === walletAddress ?
          <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5" onClick={() => withdraw()}>
            Withdraw
          </button>  
          :
          <>
          </> 
        }
        <ToastContainer className="p-3" position="top-end">         
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
            <Toast.Header>
              <img
                src="/logo_ori.png"
                className="rounded me-2"
                width="30"
                alt=""
              />
              <strong className="me-auto">TheArtOfOri</strong>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </ToastContainer> 
       
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
