import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../features/userSlice";
import "./PlansScreen.css";

function PlanScreen() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/loadPlans")
      .then((res) => res.json())
      .then((plans) => setProducts(plans));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/loadSubscriptions/" + user.email)
      .then((res) => res.json())
      .then((subscriptions) => {
        if (subscriptions) {
          setSubscriptionDetails(subscriptions[0]?.subscriptionDetails);
        }
      });
  }, [user.email]);

  const loadCheckout = (productId) => {
    history.push("/payment/" + productId);
  };
  return (
    <div className="planScreen">
      {products.map((product) => {
        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5>{product.name}</h5>
              <h6>{product.description}</h6>
            </div>
            {subscriptionDetails?.find(
              (subscription) => subscription.planId === product.id
            ) ? (
              <button className="planScreen__btn__currentPackage">
                Current Package
              </button>
            ) : (
              <button className="planScreen__btn__subscribe" onClick={() => loadCheckout(product.id)}>
                Subscribe
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
