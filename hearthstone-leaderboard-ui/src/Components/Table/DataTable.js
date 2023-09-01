import Table from "@mui/material/Table";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

export function DataTable({ fetchResult, timeDisplay }) {
    let results;

    if (!fetchResult) {
        return <p>Loading</p>;
    } 
    else {
        results = fetchResult.data.dog;
        if (results.length === 0) {
            return <p>No results available</p>;
        }
    }
        
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Rating Difference</TableCell>
                    </TableRow>
                    {results.map((result, index) => {
                        let previousResult
                        if (index!==0) {
                            previousResult = results[index - 1];
                        }
                        else {
                            previousResult = result;
                        }
                        
                        let ratingDifference = result.rating - previousResult.rating;
                        return (
                            <TableRow key={index}>
                                <TableCell>{result.rank}</TableCell>
                                <TableCell>{result.rating}</TableCell>
                                <TableCell>{timeDisplay(result.timeStamp)}</TableCell>
                                <TableCell>{ratingDifference}</TableCell>
                            </TableRow>
                        )
                    })}
                </Table>
            </TableContainer>
        </div>
    );
}