export function TableHeader({ fetchResult }) {
    if (!fetchResult) {
      return <p>Loading Player Summary</p>;
    }
    
    function mmrToPlace(ratingDiff){
      if (ratingDiff>60){
        return 1;
      }
      else if (ratingDiff>35){
        return 2;
      }
      else if (ratingDiff>10){
        return 3;
      }
      else if (ratingDiff>-15){
        return 4;
      }
      else if (ratingDiff>-40){
        return 5;
      }
      else if (ratingDiff>-65){
        return 6;
      }
      else if (ratingDiff>-90){
        return 7;
      }
      else {
        return 8;
      }
    }

    const results = fetchResult.data.dog;

    let gamesPlayed=0;
    let mmrGained=0;
    let totalPoints=0;
    let previousResult;
    let ratingDifference;
    results.forEach(result => {
      if (gamesPlayed!==0){
        ratingDifference = result.rating - previousResult.rating;
        ratingDifference= result.rating-previousResult.rating;
        mmrGained += ratingDifference;
        totalPoints+=mmrToPlace(ratingDifference);
      }
      
      gamesPlayed += 1;
      previousResult = result;
    });
    gamesPlayed -=1;

    return (
      <div>
        {`MMR gained is ${mmrGained}. You played ${gamesPlayed} games. Average MMR gained per game is ${(mmrGained/gamesPlayed).toFixed(3)}. Estimated Winrate is ${(totalPoints/gamesPlayed).toFixed(3)} `}
      </div>
    );
  }