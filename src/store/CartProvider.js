import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedTotal =
        state.total + action.payload.price * action.payload.amount;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingItemIndex];


      let updateItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.amount,
        };

        updateItems = [...state.items];
        updateItems[existingItemIndex] = updatedItem;
      } else {
        updateItems = state.items.concat(action.payload);

      }
      return {
        items: updateItems,
        total: updatedTotal,
      };
    }

    case "REMOVE_ITEM": {

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );



      const existingItem = state.items[existingItemIndex];

      const updateTotalAmount = state.total - existingItem.price;

      let updateItems;
      if (existingItem.amount === 1) {
        updateItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updateItems = [...state.items];
        updateItems[existingItemIndex] = updatedItem;
      }

      return {
        items: updateItems,
        total: updateTotalAmount,
      };
    }

    default:
      return defaultCartState;
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
  const removeItemFromCartHandler = (id) => {
    cartDispatch({
      type: "REMOVE_ITEM",
      id: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    total: cartState.total,
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
