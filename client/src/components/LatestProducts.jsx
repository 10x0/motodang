import React, { useEffect, useState } from "react";
import axios from "axios";
import cart from "../services/cart";

const BASE = process.env.REACT_APP_API_URI;

const LatestProduct = () => {
  const [products, setProducts] = useState(null);
  const [_, refresh] = useState(false);
  const addToCart = (product) => {
    cart.addToCart(product);
    refresh(!_);
  };
  const removeFromCart = (product) => {
    cart.removeItem(product);
    refresh(!_);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await axios.get(`${BASE}/api/products`);
        setProducts(res.data.allProducts.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [_]);
  return (
    <section className="pt-3 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h2 className="text-primary">Latest Products</h2>
          </div>
          <div className="col-md-6 text-end mb-4">
            <a className="btn btn-primary" href="#e">
              View All Products
            </a>
          </div>

          {products?.map((product) => (
            <div className="col-md-3">
              <a className="d-block mb-3" href="#single-product">
                <img
                  alt="gloves with hand"
                  className="rounded w-100"
                  src={`${BASE}${product.image}`}
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
                <p className="text-muted mb-3">{product.stock} items left</p>
                {cart.checkItemInCart(product) ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove from cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;
