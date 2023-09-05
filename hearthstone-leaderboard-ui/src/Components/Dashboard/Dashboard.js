import { Fragment, useState } from "react";

import { LineGraph } from "../Graph/LineGraph";
import { DataTable } from "../Table/DataTable";

export function Dashboard({ fetchResult, timeDisplay }) {
    const selectPlayer = useState(Object.keys(fetchResult).at(0));

    return (
        <Fragment>
            <LineGraph fetchResult={fetchResult} selectPlayer={selectPlayer} />
            <DataTable fetchResult={fetchResult} selectPlayer={selectPlayer} timeDisplay={timeDisplay} />
        </Fragment>
    );
}