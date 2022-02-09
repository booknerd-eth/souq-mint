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
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenOwner, setTokenOwner] = useState('')
  const [tokenUri, setTokenUri] = useState('')
  const [maxTokenCount, setMaxTokenCount] = useState(0)
  const [currentTokenCount, setCurrentTokenCount] = useState(0)

  useEffect( () => { 

    // signOut()

  }, [signedIn])

  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
        
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
     
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

  }

  


  async function signOut() {
    setSignedIn(false)
  }

  
 const getWalletBalance = async (address) => {
    if (!window.web3) {
        return
    }
    if (address !== "") {
        console.log("=getBalance=", await window.web3.eth.getBalance(address))
        console.log("=getNetworkType", await window.web3.eth.net.getNetworkType())
        return Number.parseFloat(window.web3.utils.fromWei(await window.web3.eth.getBalance(address), 'ether')).toFixed(6)
    } else {
        return 0
    }
  }

  async function mintTheArtOfOri() {
      const walletBalance = await getWalletBalance(walletAddress);
     console.log("============walletBalance==========", walletBalance)
    if (TheArtOfOriContract) { 
      const tokenId = 1;
      
      tokenId = (totalSupply + 1)  % 400; 
      tokenSupplyById = await TheArtOfOriContract.methods.currentSupply(tokenId).call() 
      if(tokenSupplyById == 10) return
      
      const price = tokenPrice
      console.log(price)

      if(walletBalance >= price){
        const gasAmount = await TheArtOfOriContract.methods.mint(tokenId).estimateGas({from: walletAddress, value: price})
        console.log("estimated gas",gasAmount)

        //   console.log({from: walletAddress, value: price})

          TheArtOfOriContract.methods
                .mint(tokenId)
                .send({from: walletAddress, value: price, gas: String(gasAmount)})
                .on('transactionHash', function(hash){
                  console.log("transactionHash", hash)
                })
      }else{
        alert("The your balance is lower, the price of this token is 2 ether.")
      }      
    } else {
        console.log("Wallet not connected")
    }
  };

  
  
  async function callContractData(wallet) {
    const myTheArtOfOriContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setTheArtOfOriContract(myTheArtOfOriContract)

    const totalSupply = await myTheArtOfOriContract.methods.totalSupply().call() 
    setTotalSupply(totalSupply)
    console.log("===total supply===", totalSupply)

    const tokenPrice = await myTheArtOfOriContract.methods.tokenPrice().call() 
    setTokenPrice(tokenPrice)
    console.log("===tokenPrice===", tokenPrice)

    // const baseURI = await TheArtOfOriContract.methods.baseURI().call() 
    // console.log("===baseURI===", baseURI)

    // const currentSupply = await TheArtOfOriContract.methods.currentSupply(1).call() 
    // console.log("===currentSupply===", currentSupply)

    const currentTokenCount = await myTheArtOfOriContract.methods.currentTokenCount().call() 
    setCurrentTokenCount(currentTokenCount)
    console.log("===currentTokenCount===", currentTokenCount)

    const MAX_TOKEN = await myTheArtOfOriContract.methods.MAX_TOKEN().call() 
    setMaxTokenCount(MAX_TOKEN)
  
    // const EACH_TOKEN_SUPPLY = await myTheArtOfOriContract.methods.EACH_TOKEN_SUPPLY().call() 
    // console.log("===EACH_TOKEN_SUPPLY===", EACH_TOKEN_SUPPLY)
    
    const name = await myTheArtOfOriContract.methods.name().call() 
    setTokenName(name)
    
    const symbol = await myTheArtOfOriContract.methods.symbol().call() 
    setTokenSymbol(symbol)
    
    const owner = await myTheArtOfOriContract.methods.owner().call() 
    setTokenOwner(owner)
   
    const uri = await myTheArtOfOriContract.methods.uri(11).call() 
    setTokenUri(uri)
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
                setTokenPrice,
                tokenName,
                tokenSymbol,
                tokenOwner,
                tokenUri,
                currentTokenCount,
                maxTokenCount,
                mintTheArtOfOri
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContextProvider;