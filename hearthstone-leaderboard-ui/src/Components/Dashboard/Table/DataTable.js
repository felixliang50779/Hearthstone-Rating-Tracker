import { useState, useEffect } from "react";

import { TableHeader } from "./TableHeader";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";

import { Card } from 'dracula-ui';


export function DataTable({ fetchResult, fromOldest, selectPlayer, timeDisplay }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedPlayer,] = selectPlayer;
    const [oldestFirst, setOldestFirst] = fromOldest;

    let processedData;

    if (!oldestFirst) {
        processedData = [...fetchResult[selectedPlayer]].sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1);
    }
    else {
        processedData = [...fetchResult[selectedPlayer]].sort((a, b) => (a.timeStamp > b.timeStamp) ? 1 : -1);
    }

    useEffect(() => {
        setPage(0);
    }, [selectedPlayer]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    
    let subtract;
    if (page===0) {
        subtract = 0;
    }
    else {
        subtract = 1;
    }

    return (
        <Card
            color="black"
            p="sm"
            width="md"
            height="lg"
            style={{ boxShadow: "none", position: "absolute", bottom: 0, marginBottom: "30%", marginLeft: "2080%" }}>
            <TableHeader oldestFirst={oldestFirst} setOldestFirst={setOldestFirst} />
            <TableContainer
                style={{ overflowy: "auto", maxHeight: "24rem", width: "100%", height: "100%" }}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: 10
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#282a36"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#44475a",
                        borderRadius: 20
                    }
                }}>
                <Table component="div" style={{ overflow: "auto" }}>
                    <TableRow sx={{ color: "#f8f8f2" }}>
                        <TableCell sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>ID</TableCell>
                        <TableCell sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>Rating</TableCell>
                        <TableCell sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>Rank</TableCell>
                        <TableCell sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>Rating Change</TableCell>
                        <TableCell sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>Timestamp</TableCell>
                    </TableRow>
                    {processedData.slice(page * rowsPerPage-subtract, page * rowsPerPage + rowsPerPage).map((result, index) => {
                        let previousResult
                        if (index !== 0) { 
                            previousResult = processedData[index + page * rowsPerPage-subtract- 1];
                        }
                        else {
                            previousResult = result;
                        }
                        
                        let ratingDifference = result.rating - previousResult.rating;
                        if (ratingDifference === 0){
                            ratingDifference= "N/A";
                        }
                        if (index === 0 && page !== 0){
                            return null
                        }
                        return (
                            <TableRow key={index} sx={{ color: "#f8f8f2" }}>
                                <TableCell
                                    sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>
                                        {index + 1 + page * rowsPerPage-subtract}
                                </TableCell>
                                <TableCell
                                    sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>
                                        {result.rating}
                                </TableCell>
                                <TableCell
                                    sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>
                                        {result.rank}
                                </TableCell>
                                <TableCell
                                    sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>
                                        {ratingDifference}
                                </TableCell>
                                <TableCell
                                    sx={{ fontFamily: "Roboto-Mono", fontSize: 14 }}>
                                        {timeDisplay(result.timeStamp)}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </Table>
            </TableContainer>
            <TablePagination
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    count={processedData.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    sx={{ color: "white", fontFamily: "Roboto-Mono", fontSize: 14, maxHeight: "40px", overflow: "hidden" }}
            />
        </Card>
    );
}