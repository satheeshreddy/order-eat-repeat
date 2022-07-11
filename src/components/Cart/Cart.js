import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCxt = useContext(CartContext);
  const totalAmount = `$${cartCxt.total.toFixed(2)}`;
  const isNotEmptyCart = cartCxt.items.length > 0;
  const orderHandler = () => {
    setShowCheckout(true);
  };
  const addCartItemHanlder = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const removeCartItemHandler = (id) => {
    cartCxt.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeCartItemHandler.bind(null, item.id)}
            onAdd={addCartItemHanlder.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {isNotEmptyCart && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total:</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onCancel = {props.onClose}/>}
      {!showCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
