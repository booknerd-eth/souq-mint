import {createContext, useState} from 'react';
import 'tailwindcss/tailwind.css'
import '@styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import WalletContextProvider from '../context/Web3Context';

function Application({ Component, pageProps }) {
  const [context, setContext] = useState("default context value");

  return  (
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
  )
}

export default Application