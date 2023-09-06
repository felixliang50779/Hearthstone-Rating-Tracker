import { useState } from "react";

import { LineGraph } from "./Graph/LineGraph";
import { DataTable } from "./Table/DataTable";
import { DefaultSidebar } from "./Sidebar/Sidebar";

export function Dashboard({ fetchResult, timeDisplay }) {
    const selectPlayer = useState(Object.keys(fetchResult).at(0));

    return (
        <div className="grid grid-cols-2" style={{ position: "absolute" }}>
            <DefaultSidebar />
            <div classname="grid grid-rows-[50%_50%]">
                <div classname="grid grid-cols-[25%_25%_25%_25%]">

                </div>
                <div 
                    className="grid grid-cols-[60%_40%] p-4"
                    style={{ position: "absolute", bottom: 0}}>
                    <LineGraph fetchResult={fetchResult} selectPlayer={selectPlayer} />
                    <DataTable fetchResult={fetchResult} selectPlayer={selectPlayer} timeDisplay={timeDisplay} />
                </div>
            </div>
        </div>
    );
}