import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import "./PaymentScreen.css";
import SimpleStripeCardForm from "./SimpleStripeCardForm";

const stripePromise = loadStripe(
  "pk_test_51J4oyHJilqE90uetUW7VYHGRDr3lvnbNT3rOeNuguMA1zauTNwitkqtrPl92mBfcqzEFG5g0y3alSATuTyZ522KZ00ZxK5hBFE"
);

function PaymentScreen() {
  const productId = useParams();
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);
  const [afterPaymentStatusLoader, setAfterPaymentStatusLoader] =
    useState(false);

  useEffect(() => {
    fetch(
      "https://limitless-ravine-50377.herokuapp.com/loadSinglePlan/" +
        productId.productId
    )
      .then((res) => res.json())
      .then((selectedProduct) => {
        setProduct(selectedProduct[0]);
        setLoader(false);
      });
  }, [productId.productId]);

  const handleAfterPaymentStatusLoader = (status) => {
    setAfterPaymentStatusLoader(status);
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="paymentScreen__container">
          {afterPaymentStatusLoader && (
            <div className="after__payment__status__loader__container">
              <Loader />
            </div>
          )}
          <div className="row paymentScreen__container__row">
            <div className="col-md-6">
              <div className="paymentScreen__subscription">
                <div>
                  <h5>Subscribe to {product.name}</h5>
                  <h1>${product.price}</h1>
                  <p>per month</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="paymentScreen__stripe">
                <div>
                  <Elements stripe={stripePromise}>
                    <SimpleStripeCardForm
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      id={product.id}
                      handleAfterPaymentStatusLoader={handleAfterPaymentStatusLoader}
                    />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentScreen;
