import { useState } from "react";

import { Widget } from "./Widget";
import { LineGraph } from "./Graph/LineGraph";
import { DataTable } from "./Table/DataTable";
import { DefaultSidebar } from "./Sidebar/Sidebar";

import { Text } from "dracula-ui";

export function Dashboard({ fetchResult, timeDisplay }) {
    const fromOldest = useState(false);
    const selectPlayer = useState(Object.keys(fetchResult).at(0));

    let netRatingChange;

    if (fetchResult[selectPlayer[0]].length) {
        netRatingChange = fetchResult[selectPlayer[0]].at(-1).rating -
        fetchResult[selectPlayer[0]].at(0).rating;
    }

    return (
        <div className="grid grid-cols-2" style={{ position: "absolute" }}>
            <DefaultSidebar />
            <div>
                <div
                    className="grid grid-cols-[27.5%_27.5%_27.5%_27.5%] p-3"
                    style={{ position: "absolute" }}>
                    <Widget
                        Title="Current Rating"
                        Content={fetchResult[selectPlayer[0]].length ? 
                            <Text size="lg" color="white">{fetchResult[selectPlayer[0]].at(-1).rating}</Text> : 
                            <Text size="lg" color="white">N/A</Text>} />
                    <Widget
                        Title="Past Week"
                        Content={fetchResult[selectPlayer[0]].length ?
                            <Text size="lg" color="white">
                                {netRatingChange > 0 ? 
                                <Text size="lg" color="green">+<Text size="lg" color="white">{netRatingChange}</Text></Text>
                                : <Text size="lg" color="red">-<Text size="lg" color="white">{netRatingChange}</Text></Text>}
                            </Text>
                            : <Text size="lg" color="white">N/A</Text>} />
                    <Widget
                        Title="Current Rank"
                        Content={fetchResult[selectPlayer[0]].length ?
                            <Text size="lg" color="white">
                                {fetchResult[selectPlayer[0]].at(-1).rank}
                            </Text> : <Text size="lg" color="white">N/A</Text>} />
                    <Widget
                        Title="Rank Percentile"
                        Content={fetchResult[selectPlayer[0]].length ?
                            <Text size="lg" color="white">
                                Placeholder
                            </Text> : <Text size="lg" color="white">N/A</Text>} />
                </div>
                <div 
                    className="grid grid-cols-[60%_40%] p-4"
                    style={{ position: "absolute", bottom: 0 }}>
                    <LineGraph fetchResult={fetchResult} selectPlayer={selectPlayer} />
                    <DataTable
                        fetchResult={fetchResult}
                        fromOldest={fromOldest}
                        selectPlayer={selectPlayer}
                        timeDisplay={timeDisplay} />
                </div>
            </div>
        </div>
    );
}