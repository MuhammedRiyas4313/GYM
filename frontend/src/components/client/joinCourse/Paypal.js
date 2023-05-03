import React from "react";
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './EnrollCourse.css'

function Paypal(props) {


  const payment = props.payment.toString()

  const clientId = {
    "client-id":
      "AR42grD4Fqqv1V4oGhhDPhkgDZXkpqqczu5vwOUSlurBEo_b4ckeUGHzLQjszeKJZ60yUTSCTkxjohua",
  };


  return (
    <div>
      <PayPalScriptProvider options={clientId}>
        <PayPalButtons createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: payment,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        console.log(details,'Payment details')
                        toast.success("Thank you for your payment. An automated payment receipt will be sent to your registered email.")
                        
                        const paymentDetails = {
                          id: details.id,
                          first_name: details.payer.name.given_name,
                          last_name: details.payer.name.surname,
                          email: details.payer.email_address,
                          payerID: details.payer.payer_id,
                          currency: details.purchase_units[0].payments.captures[0].amount.currency_code,
                          amount: details.purchase_units[0].payments.captures[0].amount.value,
                          create: details.purchase_units[0].payments.captures[0].create_time,
                          status: details.purchase_units[0].payments.captures[0].status,
                          transactionID: details.purchase_units[0].payments.captures[0].id,
                          payee_email: details.purchase_units[0].payee.email_address,
                          payee_merchantID: details.purchase_units[0].payee.merchant_id,
                        }

                        props.paypalpayment(paymentDetails)
                        console.log(paymentDetails,'payment details')
                        // const name = details.payer.name.given_name;
                        // alert(`Transaction completed by ${name}`);
                    });
                }} />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
