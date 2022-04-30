import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast'
import Swal from 'sweetalert'

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {ADDRESS, ABI, CHAIN_ID} from "../config.js"
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
    
  }, [mintResult]);

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: CHAIN_ID,  // 0x89
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "Polygon",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mainnet.matic.network"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ]
      })
    } catch(error) {
      throw error;
    };
  }

  const switchNetwork = async() => {
    try {
      const result = await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_ID }], // testnet // mainnet
      });
    } catch (err) {
      let error_msg = "";
      if (err.code === 4902) {
        await addNetwork();
      } else {
        throw err;
      }
    }
  }

  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);

      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const chainNum = parseInt(chainId, 16);
        if (chainNum !== 0x89) {
          await switchNetwork();
        }
        setNetworkId(0x89);
        const accounts = await window.ethereum.enable();
        const network = await window.web3.eth.net.getNetworkType();
        const wallet = accounts[0];
        setWalletAddress(wallet);
        setSignedIn(true);
        callContractData(walletAddress);
      } catch (error) {
        console.log(error);
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
        const gasPrice = await window.web3.eth.getGasPrice();
        const gas = await SouqContract.methods.buy().estimateGas({from: walletAddress, value: tokenPrice})
        SouqContract.methods
          .buy()
          .send({from: walletAddress, value: tokenPrice, gas, gasPrice})
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
        const gasPrice = await window.web3.eth.getGasPrice();
        const gasFee = await SouqContract.methods.withdraw().estimateGas({
            from: walletAddress, 
        });
        const result = await SouqContract.methods.withdraw().send({
            from: walletAddress,
            gas: gasFee,
            gasPrice
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