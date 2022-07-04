import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const totalAmount = `$${cartCxt.total.toFixed(2)}`;
  const isNotEmptyCart = cartCxt.items.length > 0;
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
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {isNotEmptyCart && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
