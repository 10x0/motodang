import React, { useEffect, useState } from "react";
import { Product } from "../components";
import http from "../services/http";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [load, update] = useState(false);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let hasQuery = category !== "" || size !== "";
        let hasCategoryOnly = size === "";
        let hasSizeOnly = category === "";
        let res = hasQuery
          ? hasCategoryOnly
            ? await http.get(`/api/products`, {
                params: {
                  category,
                },
              })
            : hasSizeOnly
            ? await http.get(`/api/products`, {
                params: {
                  size,
                },
              })
            : await http.get(`/api/products`, {
                params: {
                  category,
                  size,
                },
              })
          : await http.get(`/api/products`);
        setProducts(res.data.allProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [category, size]);

  return (
    <section className="py-5">
      <div className="container">
        <h3 className="text-primary">Shop</h3>
        <div className="row">
          <div className="col-md-3">
            <h5 className="mb-4">Filter</h5>

            <div className="mb-3">
              <select
                className="form-select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Categories</option>
                <option value="Helmets">Helmets</option>
                <option value="Gloves">Gloves</option>
                <option value="Tshirts">Shirts</option>
                <option value="Jackets">Jackets</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products?.length > 0 ? (
                products?.map((product) => (
                  <div key={product._id} className="col-lg-4 mb-4">
                    <Product product={product} load={load} update={update} />
                  </div>
                ))
              ) : (
                <div>No items found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
