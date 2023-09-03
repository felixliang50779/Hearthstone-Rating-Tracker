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
    gamesPlayed -=1;

    let mmrOutcome;

    if (netDifference < 0) {
      mmrOutcome = "Lost";
    }
    else {
      mmrOutcome = "Gained";
    }

    return (
      <div>
        {`${mmrOutcome === "Lost" ? '-' : '+'}${netDifference} over ${gamesPlayed} games. Average MMR ${mmrOutcome} per game is ${(netDifference/gamesPlayed).toFixed(3)}. Average match placement is ${((totalPoints/gamesPlayed).toFixed(3))}`}
      </div>
    );
  }