import Head from 'next/head'
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from '@components/Link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ModalConnectWallet from '@components/Modal'
import { Button, Ratio, Toast, Row, Col, ToastContainer } from "react-bootstrap";
import Web3 from "web3";

import { WalletContext } from '../context/Web3Context';
export default function Mint() {
  const [modalShow, setModalShow] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const { walletAddress, networkID, SouqContract, signIn, signOut, signedIn, 
          tokenPrice, tokenOwner, totalSupply, mintSouq, withdraw, mintStart 
        } = React.useContext(WalletContext);
  
  if(signedIn === true){
    let reduceWallet = walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length-4, walletAddress.length);
  }

  useEffect(() => {
    setModalShow(false);   
  },[signedIn]);
  
  let buttonContent;

    if (signedIn !== true ) {
      buttonContent = <>            
                        <span className="custom-menu text-2xl text-white hover:text-slate-100 m-1">Price : .05 Matic</span>
                        <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5" onClick={() => setModalShow(true)}>
                                            Connect Wallet
                        </button>      
                      </>
     
    } else if (signedIn === true) {
      if (mintStart == false){
          buttonContent =  <>            
                          <span className="custom-menu text-2xl text-white hover:text-slate-100 m-1">Minted Count : {totalSupply}</span>
                          <span className="custom-menu text-2xl text-white hover:text-slate-100 m-1">Price : .05 Matic</span>
                            <button type="button" className="btn-mint text-xl md:text-2xl m-3 p-3 md:p-5" onClick={() => mintSouq()}>
                            Mint Badge
                          </button>       
                        </>
      } else {
        buttonContent =  <>            
                            <span className="custom-menu text-2xl text-white hover:text-slate-100 m-1">Minted Count : {totalSupply}</span>
                            <span className="custom-menu text-2xl text-white hover:text-slate-100 m-1">Price : .05 Matic</span>
                            <button type="button" className="btn-mint flex text-xl md:text-2xl m-3 p-3 md:p-5">
                              <span className="pr-3">Processing</span> 
                              <img src="images/loading.gif" width="30" />
                            </button>       
                          </>
      }
    } else {      
      buttonContent = <button type="button" className="btn-mint flex text-xl md:text-2xl m-3 p-3 md:p-5">
                         <span className="pr-3">Connecting</span> 
                         <img src="images/loading.gif" width="30" />
                      </button>
    }
  
  return (
    <div className="w-full bg-cover bg-center min-h-screen bg-no-repeat" style={{"backgroundColor": "#060614"}}>
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
        <Link href="https://souq.gg/" className="">
          <img src="images/logo.png" width="108" alt="Souq" className="logo-image" />
        </Link>
        <nav className="flex flex-wrap flex-row justify-around">
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
          { signedIn === true  && tokenOwner === walletAddress && 
            <a className="custom-menu text-white hover:text-slate-100 m-3 sm:m-6" onClick={() => withdraw()}>
              Withdraw
            </a>  
          }
        </nav>
      </div>  
      <main>
        <h1 className="text-3xl md:text-4xl custom-text">
          MINT YOUR BADGE
        </h1>        
        <div style={{ width: 320, height: ''}}>
          <img  className="rounded-full shadow-lg" src="./images/souq_token.gif"/>
        </div>  
        { buttonContent }
        <ToastContainer className="p-3" position="top-end">         
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
            <Toast.Header>
              <img
                src="/logo.png"
                className="rounded me-2"
                width="30"
                alt=""
              />
              <strong className="me-auto">Souq</strong>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </ToastContainer> 
       
      </main> 
      <Footer page="mint"/>
     <ModalConnectWallet
        show={modalShow}
        onHide={() => setModalShow(false)}
        signin={signIn}
        signedin={signedIn}
      />
    
     </div>
  )
}
