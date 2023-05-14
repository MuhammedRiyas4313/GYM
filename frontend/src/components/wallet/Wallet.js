import React, { useEffect, useState } from "react";
import "./Wallet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getWallet } from "../../axios/services/trainerServices/trainerService";


function Wallet() {

    const navigate = useNavigate()
    const location = useLocation()

    const [wallet, setWallet] = useState({})
    const userId = location?.state?.userId

    useEffect(()=>{
        getWallet(userId).then((res)=>{
            setWallet(res.data)
        })
    }, [])

    function transactions(){
        navigate('/transaction',{ state: { userId: userId } })
    }

  return (
    <div className="w-full h-full flex justify-center items-center p-10 md:p-20">
      <div class="cardTransaction mt-20">
        <div class="contentTransaction">
          <div class="titleTransaction">Current Balance</div>
          <div class="priceTransaction">{wallet?.balance} &nbsp;₹</div>
        </div>
        <button onClick={transactions} className="text-white btn ">Transactions</button>
      </div>
    </div>
  );
}

export default Wallet;
