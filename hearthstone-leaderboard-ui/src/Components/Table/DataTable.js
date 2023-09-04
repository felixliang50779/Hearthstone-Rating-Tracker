import Table from "@mui/material/Table";

import { useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TablePagination } from "@mui/material";

import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

export function DataTable({ results, timeDisplay }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    
    if (results.length === 0) {
        return <p>No results available</p>;
    }
    let subtract;
    if (page===0) {
        subtract = 0;
    }
    else {
        subtract = 1;
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Rank</TableCell>
                    <TableCell>Rating Change</TableCell>
                    <TableCell>Timestamp</TableCell>
                </TableRow>
                {results.slice(page * rowsPerPage-subtract, page * rowsPerPage + rowsPerPage).map((result, index) => {
                    let previousResult
                    if (index !== 0) { 
                        previousResult = results[index + page * rowsPerPage-subtract- 1];
                    }
                    else {
                        previousResult = result;
                    }
                    
                    let ratingDifference = result.rating - previousResult.rating;
                    if (ratingDifference===0){
                        ratingDifference= "N/A";
                    }
                    if (index===0 & page!==0){
                        return null
                    }
                    return (
                        <TableRow key={index}>
                            <TableCell>{index + 1 + page * rowsPerPage-subtract}</TableCell>
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
                count={results.length}
                rowsPerPage={rowsPerPage}
            />
        </TableContainer>
    );
}