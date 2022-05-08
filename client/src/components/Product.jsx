import React from "react";
import cart from "../services/cart";
const BASE = process.env.REACT_APP_API_URI;

const Product = ({ product, load, update }) => {
  const addToCart = () => {
    cart.addToCart(product);
    update(!load);
  };
  const removeFromCart = () => {
    cart.removeItem(product);
    update(!load);
  };
  return (
    <>
      <a className="d-block mb-3" href="#single-product">
        <img
          alt={product.name}
          className="rounded w-100"
          src={BASE + product.image}
        />
      </a>
      <div className="text-center">
        <h4>
          <a className="link-dark text-decoration-none" href="#product">
            {product.name}
          </a>
        </h4>
        <div className="price mb-2">
          <ins className="me-2 text-decoration-none">
            Rs {product.discountedPrice}
          </ins>
          <del>Rs {product.actualPrice}</del>
        </div>
        <p className="text-muted mb-3">
          {product.stock} {product.stock > 1 ? "items" : "item"} left
        </p>
        {cart.checkItemInCart(product) ? (
          <button className="btn btn-primary" onClick={addToCart}>
            Add to cart
          </button>
        ) : (
          <button className="btn btn-danger" onClick={removeFromCart}>
            Remove from cart
          </button>
        )}
      </div>
    </>
  );
};

export default Product;
