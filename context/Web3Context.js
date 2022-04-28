import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast'
import Swal from 'sweetalert'

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {ADDRESS, ABI} from "../config.js"
import swal from 'sweetalert';

// import { addNetwork, switchNetwork } from 'ethereum.js';

export const WalletContext = React.createContext({});

const WalletContextProvider = ({children}) => {

  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  const [network, setNetwork] = useState(null)
  const [networkId, setNetworkId] = useState(0)

  // FOR MINTING
  const [SouqContract, setSouqContract] = useState(null)
  const [mintResult, setMintResult] = useState(false)
  const [mintStart, setMintStart] = useState(false)

  // INFO FROM SMART Contract
  const [totalSupply, setTotalSupply] = useState(0)
  const [tokenPrice, setTokenPrice] = useState(0)
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenOwner, setTokenOwner] = useState('')

  useEffect( () => { 

    // signOut()

  }, [signedIn])
  
  useEffect( () => { 
    if(signedIn == true){
      callContractData(walletAddress)
      setMintResult(false)
      setMintStart(false)
    }
    
  }, [mintResult])

  const addNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID_HEX,  // 0x89
          chainName: "Polygon",
          nativeCurrency: {
            name: "Polygon",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mainnet.matic.network"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ]
    }).catch((error) => {
      console.log("addnetowrk: ", error)
    });
  }
  
    const switchNetwork = () =>
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID_HEX }], // testnet // mainnet
      }).catch(err => {
        addNetwork();
      });
   
  
  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
        
        window.ethereum.enable()
        .then(function (accounts) {
            window.web3.eth.net.getNetworkType()
            // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
            .then((network) => {
                setNetwork(network)
                if(network != "main"){
   
                } 
            }).catch(function (err) {
                console.log(err)
            });  

            let wallet = accounts[0]
            setWalletAddress(wallet)

            // notify('Wallet connected!', 'success');
            // window.userWalletAddress = userAcc;
        })
        .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error)
        })

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const chainNum = parseInt(chainId, 16)
        
        setNetworkId(chainNum)
        if (chainNum === 0x89){
          setSignedIn(true)
          callContractData(walletAddress)
          Swal("You are on Polygon mainnet")
      
        } else if (chainNum === 0x13881){  //  0x13881 - 80001
          Swal("You are on Polygon testnet")
          setSignedIn(true)
          callContractData(walletAddress)
        } else {
           switchNetwork()
        }
    } else {
      swal({
        title: "Please install metamask!",
        text: "No Ethereum interface injected into browser. Read-only access",
        icon: "warning",
        button: "OK",
      });
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
        return Number.parseFloat(window.web3.utils.fromWei(await window.web3.eth.getBalance(address), 'ether')).toFixed(6)
    } else {
        return 0
    }
  }

  async function mintSouq() {
    const walletBalance = await getWalletBalance(walletAddress);
  
    if(networkId != 137){
      swal({
        title: "Mint Error",
        text: "Please change network to Polygon mainnet.",
        icon: "warning",
        dangerMode: true,
      })
      return                 
    } 
    if (SouqContract) {

      const tokenPriceInEth = window.web3.utils.fromWei(`${tokenPrice}`, "ether");

      if(parseFloat(walletBalance) >= parseFloat(tokenPriceInEth)){
        setMintStart(true);
        const gasAmount = await SouqContract.methods.buy().estimateGas({from: walletAddress, value: tokenPrice})
        SouqContract.methods
          .buy()
          .send({from: walletAddress, value: tokenPrice, gas: String(gasAmount)})
          .on('transactionHash', function(hash){
            setMintResult(true)
            swal({
              title: "Success!",
              text: "Mint success!",
              icon: "success",
              button: "Ok",
            });
          })
          .on('error', function(error, receipt) {
            setMintStart(false);
          })
      } else {
        swal({
          title: "Mint Error",
          text: "The your balance is lower, the price of this token is 0.05 Matic.",
          icon: "warning",
          dangerMode: true,
        })
      }      
    } else {
        swal({
          title: "Connect Error",
          text: "Contract not connected.",
          icon: "warning",
          dangerMode: true,
        })
    }
  };

  const withdraw = async () => {
    if (!window.web3) {
        return false
    }
    try {
      let balanceOfContract = await web3.eth.getBalance(ADDRESS)
      if( balanceOfContract > 0){
        let gasFee = await SouqContract.methods.withdraw().estimateGas({
            from: walletAddress, 
        });
        let result = await SouqContract.methods.withdraw().send({
            from: walletAddress,
            gas: gasFee
        });
        return result;
      } else {
        swal({
          title: "Please withdraw after",
          text: "The balance of this contract is 0.",
          icon: "warning",
          // buttons: true,
          dangerMode: true,
        })
      }
    } catch(e) {
        console.log(e)
        return false
    }
  }
  
  async function callContractData(wallet) {
    const mySouqContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setSouqContract(mySouqContract)
        
    const total_Supply = await mySouqContract.methods.totalSupply().call() 
    setTotalSupply(total_Supply)

    const token_Price = await mySouqContract.methods.tokenPrice().call() 
    setTokenPrice(token_Price)

    const name = await mySouqContract.methods.name().call() 
    setTokenName(name)
    
    const symbol = await mySouqContract.methods.symbol().call() 
    setTokenSymbol(symbol)
    
    const owner = await mySouqContract.methods.owner().call() 
    setTokenOwner(owner.toLowerCase())
  }

  
    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                network,
                networkId,
                SouqContract,
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
                mintSouq,
                withdraw,
                mintStart
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContextProvider;