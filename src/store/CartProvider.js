import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    total: 0,
};

const cartReducer = (state, action) => {
}

const CartProvider = (props) => {
  const addItemHandler = (item) => {};
  const removeItemHandler = (item) => {};
  const cartContext = {
    items: [],
    total: 0,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
