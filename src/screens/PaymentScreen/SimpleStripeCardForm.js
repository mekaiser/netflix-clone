import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../features/userSlice";
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

const SimpleStripeCardForm = ({ name, id, handleAfterPaymentStatusLoader }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const user = useSelector(selectUser);
  const history = useHistory();

  const insertSubscriberToDatabase = (paymentId) => {
    // order-time and renew-time setup
    const orderTime = new Date();
    const orderTimeReadable = orderTime.toString();
    const year = orderTime.getFullYear();
    const month = orderTime.getMonth();
    const day = orderTime.getDate();
    const renewTime = new Date(year + 1, month, day).toString();

    //subscription details
    const subscriberData = {
      email: user.email,
      subscriptionDetails: [
        {
          planId: id,
          planRole: name,
          orderTime: orderTimeReadable,
          renewTime: renewTime,
          paymentId: paymentId,
        },
      ],
    };

    fetch("https://limitless-ravine-50377.herokuapp.com/insertSubscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriberData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleAfterPaymentStatusLoader(false);
          alert("Subscription completed successfully");
          history.push("/");
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAfterPaymentStatusLoader(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    if (error) {
      console.log("[error]", error);
      handleAfterPaymentStatusLoader(false);
    } else {
      insertSubscriberToDatabase(paymentMethod.id);
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
