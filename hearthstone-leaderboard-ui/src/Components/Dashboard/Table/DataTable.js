import { useState, useEffect } from "react";

import { TableHeader } from "./TableHeader"; 

import { DataGrid, 
        useGridApiContext,
        useGridSelector,
        gridPaginationModelSelector,
        gridPageCountSelector } from "@mui/x-data-grid";

import { Pagination } from "@mui/material";

import styles from './DataTable.module.css';


export function DataTable({ fetchResult, fromOldest, selectPlayer, timeDisplay }) {
    const [,setPage] = useState(0);
    const [selectedPlayer,] = selectPlayer;
    const [oldestFirst, setOldestFirst] = fromOldest;

    let processedData;

    if (!oldestFirst) {
        processedData = [...fetchResult[selectedPlayer]].sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1);
    }
    else {
        processedData = [...fetchResult[selectedPlayer]].sort((a, b) => (a.timeStamp > b.timeStamp) ? 1 : -1);
    }

    const rows = processedData.map((record, index) => {
        let processedRatingChange = `${record.ratingChange}`;

        if ((record.ratingChange !== 'N/A') && (record.ratingChange > 0)) {
            processedRatingChange = `+${record.ratingChange}`;
        } 

        return {id: index + 1,
                rating: record.rating,
                rank: record.rank,
                ratingChange: processedRatingChange,
                timeStamp: timeDisplay(record.timeStamp)}
    })

    const columns = 
        [
            {
                field: "id",
                headerName: "ID",
                flex: 0.4
            },
            {
                field: "rating",
                headerName: "Rating",
                flex: 0.8
            },
            {
                field: "rank",
                headerName: "Rank",
                flex: 0.7
            },
            {
                field: "ratingChange",
                headerName: "Rating Change",
                flex: 0.8
            },
            {
                field: "timeStamp",
                headerName: "Timestamp",
                flex: 1.2
            }
        ]

    useEffect(() => {
        setPage(0);
    }, [selectedPlayer]);

    function CustomPagination() {
        const apiRef = useGridApiContext();
        const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);
      
        return (
          <Pagination
            count={pageCount}
            page={paginationModel.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
          />
        );
    }

    return (
        <div className={styles['data-table']}>
            <TableHeader oldestFirst={oldestFirst} setOldestFirst={setOldestFirst} />
            <DataGrid
                rows={rows}
                rowHeight={75}
                columns={columns}
                disableRowSelectionOnClick={true}
                disableColumnMenu={true}
                style={{
                    borderStyle: "none",
                    fontFamily: "Roboto-Mono",
                    fontSize: "0.93em",
                    color: "white",
                    marginTop: "0.3em",
                    maxHeight: "72vh",
                    overflow: "auto"
                }}
                sx={{
                    marginLeft: "0.2em",
                    "& .MuiDataGrid-columnHeaderTitle": {
                        whiteSpace: "normal",
                        lineHeight: "normal"
                    },
                    "& .MuiDataGrid-cell": {
                        whiteSpace: "normal !important",
                        wordWrap: "break-word !important",
                        "&:focus-within, &:focus": {
                            outline: "none"
                        }
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                        width: 10
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                        backgroundColor: "#282a36",
                        marginTop: "0.5vh"
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                        backgroundColor: "#44475a",
                        borderRadius: 20
                    },
                    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                    "& .MuiDataGrid-footerContainer": {
                        border: "none"
                    },
                    "& .MuiPaginationItem-root": {
                        color: "#f8f8f2",
                        "&.Mui-selected": {
                            background: "#f8f8f2",
                            color: "#282a36",
                            "&:hover": {
                                background: "#282a36",
                                color: "#f8f8f2"
                            }
                        }
                    }
                }}
                slots={{
                    pagination: CustomPagination
                }} />
        </div>
    );
}