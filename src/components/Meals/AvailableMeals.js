import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvialableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      // await new Promise((r) => setTimeout(r, 2000)); // simulate server latency
      const response = await fetch(
        "https://react-http-38370-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const meals = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        };
      });
      setMeals(meals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      console.error(error);
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }

  if (httpError) {
    return <section className={classes.MealsError}>{httpError}</section>;
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvialableMeals;
