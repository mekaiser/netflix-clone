import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useMemo } from "react";
import "./SimpleStripeCardForm.css";
import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#97a6b2",
          },
        },
        invalid: {
          color: "#e50914",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const SimpleStripeCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <form className="simpleStripeCardForm___form" onSubmit={handleSubmit}>
      <h2>Pay with card</h2>
      <label>
        Card number
        <div className="cardElement">
          <CardNumberElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </div>
      </label>
      <label>
        Expiration date
        <div className="cardElement">
          <CardExpiryElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </div>
      </label>
      <label>
        CVC
        <div className="cardElement">
          <CardCvcElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </div>
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default SimpleStripeCardForm;
