import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: state.items.concat(action.payload),
        total: state.total + action.payload.price * action.payload.amount,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        total: state.total - action.payload.price * action.payload.amount,
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };
  const removeItemFromCartHandler = (item) => {
    cartDispatch({
      type: "REMOVE_ITEM",
      payload: item,
    });
  };
  const cartContext = {
    items: [],
    total: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
