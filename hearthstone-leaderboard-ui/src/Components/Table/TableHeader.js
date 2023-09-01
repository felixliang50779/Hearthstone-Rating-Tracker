export function TableHeader({ fetchResult }) {
    if (!fetchResult) {
      return <p>Loading Player Summary</p>;
    }

    const results = fetchResult.data.dog;
    let gamesPlayed=0;
    let mmrGained=0
    
    let previousResult;
    let ratingDifference;
    results.forEach(result => {
      if (gamesPlayed!==0){
        ratingDifference = result.rating - previousResult.rating;
        ratingDifference= result.rating-previousResult.rating;
        mmrGained += ratingDifference;
      }
      
      gamesPlayed += 1;
      previousResult = result;
    });

    return (
      <div>
        {`MMR gained is ${mmrGained}. You played ${gamesPlayed} games. Average MMR gained per game is ${(mmrGained/gamesPlayed).toFixed(3)} `}
      </div>
    );
  }

