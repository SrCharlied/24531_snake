function Snake({ snake }) {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;

        return (
          <span
            className={`snake-segment${isHead ? " snake-head" : ""}`}
            key={`${segment.x}-${segment.y}-${index}`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
            aria-hidden="true"
          />
        );
      })}
    </>
  );
}

export default Snake;
