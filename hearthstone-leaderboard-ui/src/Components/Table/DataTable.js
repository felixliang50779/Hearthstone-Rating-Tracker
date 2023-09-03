import Table from "@mui/material/Table";

import { useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TablePagination } from "@mui/material";

import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

export function DataTable({ fetchResult, timeDisplay }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    if (!fetchResult) {
        return <p>Loading Player Records</p>;
    } 

    const results = fetchResult.data.dog;
    if (results.length === 0) {
        return <p>No results available</p>;
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
            <TablePagination
                component="div"
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                count={fetchResult.data.dog.length}
                rowsPerPage={rowsPerPage}
            />
        </TableContainer>
    );
}