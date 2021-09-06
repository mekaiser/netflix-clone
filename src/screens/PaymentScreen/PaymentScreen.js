import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import "./PaymentScreen.css";
import SimpleStripeCardForm from "./SimpleStripeCardForm";

const stripePromise = loadStripe(
  "pk_test_51J4oyHJilqE90uetUW7VYHGRDr3lvnbNT3rOeNuguMA1zauTNwitkqtrPl92mBfcqzEFG5g0y3alSATuTyZ522KZ00ZxK5hBFE"
);

function PaymentScreen() {
  return (
    <div className="paymentScreen__container">
      <div className="row paymentScreen__container__row">
        <div className="col-md-6">
          <div className="paymentScreen__subscription">
            <div>
              <h5>Subscribe to Premium</h5>
              <h1>$13.99</h1>
              <p>per month</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="paymentScreen__stripe">
            <div>
            <Elements stripe={stripePromise}>
              <SimpleStripeCardForm />
            </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
