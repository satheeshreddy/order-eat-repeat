import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCxt = useContext(CartContext);
  const [itemsChanged, setItemsChanged] = useState(false);
  const { items } = cartCxt;

  const noOfItems = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${itemsChanged ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setItemsChanged(true);

    const timer = setTimeout(() => {
      setItemsChanged(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
