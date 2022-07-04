import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = amountInputRef.current.value;
    const enteredAmount = +amount;
    if (amount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setIsAmountValid(false);
      return;
    }
    props.onAdd(enteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Amount must be between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
