import React from 'react'
import NavBar from '../../components/navbar/Header'
import Wallet from '../../components/wallet/Wallet'
import FooterComponent from '../../components/footer/Footer'
import './Wallet.css'

function Wallets() {
  return (
    <div className='wallet'>
      <NavBar />
      <Wallet />
      <FooterComponent />
    </div>
  )
}

export default Wallets
