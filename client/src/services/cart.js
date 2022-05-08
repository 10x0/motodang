import { toast } from "react-toastify";

const checkItemInCart = (data) => {
  let cart = JSON.parse(localStorage.getItem("cart_session"));
  return cart ? cart.every((item) => item._id !== data._id) : true;
};

function totalPrice() {
  let cart = JSON.parse(localStorage.getItem("cart_session"));

  let sum = 0;
  cart &&
    cart.forEach(function (item) {
      sum += item.discountedPrice;
    });
  return sum;
}

const getCartItems = () => JSON.parse(localStorage.getItem("cart_session"));

const addToCart = (data) => {
  let cart = JSON.parse(localStorage.getItem("cart_session"));
  if (cart === null || cart.length === 0) {
    localStorage.setItem("cart_session", JSON.stringify([data]));
  } else {
    let not = checkItemInCart(data);
    not &&
      localStorage.setItem("cart_session", JSON.stringify([...cart, data]));
  }
};

const removeItem = (data) => {
  let cart = JSON.parse(localStorage.getItem("cart_session"));
  if (cart !== null || cart.length > 0) {
    let filtered = cart.filter((item) => item._id !== data._id);
    localStorage.setItem("cart_session", JSON.stringify(filtered));
  }
  toast.error("Item removed from cart.");
};

const removeAll = () => {
  localStorage.setItem("cart_session", JSON.stringify([]));
};

export default {
  checkItemInCart,
  totalPrice,
  getCartItems,
  addToCart,
  removeItem,
  removeAll,
};
