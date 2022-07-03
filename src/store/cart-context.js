import React from "react";

const CartContext = React.createContext(
    {
        items: [],
        total: 0,
        addItem: (item) => {},
        removeItem: (item) => {},
    }
);

export default CartContext;