import { Fragment } from "react";
import AvialableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvialableMeals />
    </Fragment>
  );
};

export default Meals;
