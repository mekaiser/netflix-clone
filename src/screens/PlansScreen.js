import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./PlansScreen.css";

function PlanScreen() {
    const user = useSelector(selectUser);
  const products = [
    {
      name: "Premium",
      description: "4K + HDR",
      prices: {
        priceId: 1,
      },
    },
    {
      name: "Basic",
      description: "720p",
      prices: {
        priceId: 2,
      },
    },
    {
      name: "Standard",
      description: "1080p",
      prices: {
        priceId: 3,
      },
    },
  ];

  const loadCheckout = async (priceId) => {

  };
  return (
    <div className="planScreen">
      {products.map((productData) => {
        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
