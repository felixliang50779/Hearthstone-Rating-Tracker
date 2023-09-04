export function TableHeader({ results }) {
    
    
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

    let gamesPlayed=0;
    let netDifference=0;
    let totalPoints=0;
    let previousResult;
    let ratingDifference;
    results.forEach(result => {
      if (gamesPlayed!==0){
        ratingDifference = result.rating - previousResult.rating;
        ratingDifference= result.rating-previousResult.rating;
        netDifference += ratingDifference;
        totalPoints+=mmrToPlace(ratingDifference);
      }
      
      gamesPlayed += 1;
      previousResult = result;
    });

    let mmrOutcome;

    if (netDifference < 0) {
      mmrOutcome = "lost";
    }
    else {
      mmrOutcome = "gained";
    }

    return (
      <div>
        {`${mmrOutcome === "lost" ? '-' : '+'}${netDifference} over ${gamesPlayed} records. Average rating ${mmrOutcome} per match was ${(netDifference/gamesPlayed).toFixed(3)} points. Average match placement is estimated from this data to be ~${(Math.round((totalPoints/gamesPlayed)))}`}
      </div>
    );
  }