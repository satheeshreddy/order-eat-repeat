import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
const Cart = (props) => {
  const cartItems = [
    {
      id: "p1",
      name: "Pizza",
      price: 10,
      amount: 2,
    },
  ].map((item) => {
    return <li key={item.id}>{item.name}</li>;
  });
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total:</span>
        <span>10.00</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
