import { useAuth0 } from "@auth0/auth0-react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cart from "../services/cart";
import http from "../services/http";

const BASE = process.env.REACT_APP_API_URI;

const Cart = () => {
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const [items, setItems] = useState(null);
  const [update, forceUpdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  useEffect(() => {
    setItems(cart.getCartItems());
  }, [update]);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: cart.totalPrice(),
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const payLater = async () => {
    try {
      await http.post(BASE + "/api/orders", {
        _id: new Date() + user.email,
        buyer: `${user.given_name} ${user.family_name}`,
        email: user.email,
        country: user.address,
        products: cart.getCartItems(),
        total: cart.totalPrice(),
      });
      cart.removeAll();
      forceUpdate(!update);
      toast.success("Order has been placed successfully.");
    } catch (error) {
      toast.error("Internal server error!");
    }
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      const { payer } = details;
      setSuccess(true);
      try {
        await http.post(BASE + "/api/orders", {
          _id: payer.payer_id,
          buyer: `${payer.name.given_name} ${payer.name.surname}`,
          email: payer.email_address,
          country: payer.address.country_code,
          products: cart.getCartItems(),
          total: cart.totalPrice(),
        });
        cart.removeAll();
        forceUpdate(!update);
        toast.success("Order has been placed successfully.");
      } catch (error) {
        toast.error("Internal server error!");
      }
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    console.log(data);
    setErrorMessage("An Error occured with your payment ");
  };

  return (
    <div className="container my-5">
      <h4 className="mb-4">Cart</h4>
      <div className="row">
        <div className="col-12 col-md-7">
          <ul className="list-group list-group-lg list-group-flush-x mb-4">
            <li className="list-group-item">
              {items?.map((item) => (
                <div className="row align-items-center py-2 border-bottom">
                  <div className="col-3">
                    <a href="product.html">
                      <img
                        src={BASE + item.image}
                        alt="..."
                        className="img-fluid"
                      />
                    </a>
                  </div>
                  <div className="col">
                    <div className="d-flex justify-content-between mb-2 font-weight-bold">
                      <a className="text-body" href="product.html">
                        {item.name}
                      </a>{" "}
                      <span className="ml-auto">Rs {item.discountedPrice}</span>
                    </div>

                    <p className="mb-7 font-size-sm text-muted">
                      Size: {item.size} <br />
                    </p>

                    <div className="d-flex align-items-center">
                      <select className="form-select custom-select-xxs w-auto me-3">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                      </select>

                      <button
                        className="small text-danger ml-auto"
                        onClick={() => {
                          let yes = window.confirm("Are you sure?");
                          if (yes) {
                            cart.removeItem(item);
                            forceUpdate(!update);
                          }
                        }}
                      >
                        <i className="bi bi-x-circle"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
          <a href="/products" className="btn btn-link btn-sm px-0 text-body">
            Continue shopping
          </a>
          {items && items.length >= 1 && (
            <>
              <div className=" mb-7 bg-light">
                <div>
                  <ul className="list-group list-group-sm mb-4">
                    <li className="list-group-item d-flex">
                      <span>Subtotal</span>{" "}
                      <span className="ml-auto font-size-sm">
                        ${cart.totalPrice()}.00
                      </span>
                    </li>
                    <li className="list-group-item d-flex">
                      <span>Tax</span>{" "}
                      <span className="ml-auto font-size-sm">$00.00</span>
                    </li>
                    <li className="list-group-item d-flex ">
                      <span>Total</span>{" "}
                      <span className="ml-auto font-size-sm">
                        ${cart.totalPrice()}.00
                      </span>
                    </li>
                    <li className="list-group-item small text-center text-gray-500">
                      Shipping cost calculated at Checkout *
                    </li>
                  </ul>
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  <PayPalScriptProvider
                    options={{
                      "client-id": process.env.REACT_APP_PAYPAL_ID,
                      // "data-client-token": process.env.REACT_APP_PAYPAL_TOKEN,
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "horizontal" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </PayPalScriptProvider>
                  <button
                    className="btn btn-secondary container-fluid"
                    onClick={payLater}
                  >
                    Pay on delivery
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-dark container-fluid"
                  onClick={loginWithPopup}
                >
                  Please login to pay
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
