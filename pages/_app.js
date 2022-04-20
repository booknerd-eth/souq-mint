import {createContext, useState} from 'react';
import 'tailwindcss/tailwind.css'
import '@styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import WalletContextProvider from '../context/Web3Context';

function Application({ Component, pageProps }) {
  return  (
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
  )
}

export default Application