import React, { useEffect, useState } from 'react';

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {ADDRESS, ABI} from "../config.js"

export const WalletContext = React.createContext({});

const WalletContextProvider = ({children}) => {
   
  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  // FOR MINTING
  const [TheArtOfOriContract, setTheArtOfOriContract] = useState(null)

  // INFO FROM SMART Contract
  const [totalSupply, setTotalSupply] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)

  useEffect( () => { 

    // signOut()

  }, [signedIn])

  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
     
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum.enable()
      .then(function (accounts) {
          window.web3.eth.net.getNetworkType()
          // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
          .then((network) => {
              console.log(network);
              if(network != "main"){
                alert("You are on " + network+ " network. Change network to mainnet or you won't be able to do anything here")
              } 
          }).catch(function (err) {
               console.log(err)
          });  
          let wallet = accounts[0]
          setWalletAddress(wallet)
          setSignedIn(true)

          callContractData(wallet)
       })
      .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error)
      })
  }

  async function signOut() {
    setSignedIn(false)
  }
  
  
  async function callContractData(wallet) {
    const TheArtOfOriContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setTheArtOfOriContract(TheArtOfOriContract)

    const totalSupply = await TheArtOfOriContract.methods.totalSupply().call() 
    setTotalSupply(totalSupply)
    console.log("===total supply===", totalSupply)

    // const tokenPrice = await TheArtOfOriContract.methods.tokenPrice().call() 
    // setTokenPrice(tokenPrice)
    // console.log("===tokenPrice===", tokenPrice)

    // const baseURI = await TheArtOfOriContract.methods.baseURI().call() 
    // console.log("===baseURI===", baseURI)

    // const currentSupply = await TheArtOfOriContract.methods.currentSupply(1).call() 
    // console.log("===currentSupply===", currentSupply)

    // const currentTokenCount = await TheArtOfOriContract.methods.currentTokenCount().call() 
    // console.log("===currentTokenCount===", currentTokenCount)

    // const MAX_TOKEN = await TheArtOfOriContract.methods.MAX_TOKEN().call() 
    // console.log("===MAX_TOKEN===", MAX_TOKEN)
  
    // const EACH_TOKEN_SUPPLY = await TheArtOfOriContract.methods.EACH_TOKEN_SUPPLY().call() 
    // console.log("===EACH_TOKEN_SUPPLY===", EACH_TOKEN_SUPPLY)
    
    // const name = await TheArtOfOriContract.methods.name().call() 
    // console.log("===name===", name)
    
    // const symbol = await TheArtOfOriContract.methods.symbol().call() 
    // console.log("===name===", symbol)
    
    // const owner = await TheArtOfOriContract.methods.owner().call() 
    // console.log("===owner===", owner)
   
    // const uri = await TheArtOfOriContract.methods.uri(11).call() 
    // console.log("===uri===", uri)
  }

  
    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                TheArtOfOriContract,
                // getValue,
                signIn,
                signOut,
                signedIn,
                setSignedIn,
                totalSupply,
                setTotalSupply,
                tokenPrice,
                setTokenPrice
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContextProvider;