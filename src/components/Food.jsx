function Food({ food }) {
  if (!food) {
    return null;
  }

  return (
    <span
      className="food"
      style={{
        gridColumnStart: food.x + 1,
        gridRowStart: food.y + 1,
      }}
      aria-hidden="true"
    />
  );
}

export default Food;
