import React from 'react'
import NavBar from '../../components/navbar/Header'
import FooterComponent from '../../components/footer/Footer'
import Transaction from '../../components/transactions/Transaction'
import './Transactions.css'

function Transactions() {
  return (
    <div className='transaction'>
      <NavBar />
      <Transaction />
      <FooterComponent />
    </div>
  )
}

export default Transactions
