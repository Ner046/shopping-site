export default function starRating({rating}: {rating:number}){

    const safeRating = Math.max(0, Math.min(5, rating));


  return (
    <span role="img" aria-label={`Rating: ${safeRating} out of 5`}>
      {[0, 1, 2, 3, 4].map((starPosition) => {
        const fill = Math.max(0, Math.min(1, safeRating - starPosition));

        return (
          <span
            key={starPosition}
            aria-hidden="true"
            style={{
              background: `linear-gradient(90deg, orange ${fill * 100}%, lightgray ${fill * 100}%)`,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ★
            </span>
        );

      })}
    </span>
  );

    
}