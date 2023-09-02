import Table from "@mui/material/Table";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

export function DataTable({ fetchResult, timeDisplay }) {
    let results;

    if (!fetchResult) {
        return <p>Loading Player Records</p>;
    } 
    else {
        results = fetchResult.data.dog;
        if (results.length === 0) {
            return <p>No results available</p>;
        }
    }
        
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>Rank</TableCell>
                    <TableCell>Rating Difference</TableCell>
                    <TableCell>Timestamp</TableCell>
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
                            <TableCell>{result.rating}</TableCell>
                            <TableCell>{result.rank}</TableCell>
                            <TableCell>{ratingDifference}</TableCell>
                            <TableCell>{timeDisplay(result.timeStamp)}</TableCell>
                        </TableRow>
                    )
                })}
            </Table>
        </TableContainer>
    );
}