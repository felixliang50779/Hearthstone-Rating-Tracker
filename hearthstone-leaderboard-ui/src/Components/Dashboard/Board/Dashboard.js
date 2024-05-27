import { useState } from "react";

import { Widget } from "../Widget/Widget";
import { LineGraph } from "../Graph/LineGraph";
import { DataTable } from "../Table/DataTable";
import { Sidebar } from "../Sidebar/Sidebar";

import { Text } from "dracula-ui";

import styles from "./Dashboard.module.css"

export function Dashboard({ fetchResult, timeDisplay }) {
    const fromOldest = useState(false);
    const selectPlayer = useState(Object.keys(fetchResult).at(0));

    let netRatingChange;

    if (fetchResult[selectPlayer[0]].length) {
        netRatingChange = fetchResult[selectPlayer[0]].at(-1).rating -
        fetchResult[selectPlayer[0]].at(0).rating;
    }

    return (
        <div className={styles.board}>
            <Sidebar />
            <div className={styles["content-container"]}>
                <div className={styles["widget-grid"]}>
                    <Widget
                            Title="Current Rating"
                            Content={fetchResult[selectPlayer[0]].length ? 
                                <Text size="lg" color="white">{fetchResult[selectPlayer[0]].at(-1).rating}</Text> : 
                                <Text size="lg" color="white">N/A</Text>} />
                        <Widget
                            Title="Past Week"
                            Content={fetchResult[selectPlayer[0]].length ?
                                <Text size="lg" color="white">
                                    {netRatingChange >= 0 ? 
                                    <Text size="lg" color="green" weight="bold">+<Text size="lg" color="white">{netRatingChange}</Text></Text>
                                    : <Text size="lg" color="red" weight="bold">-<Text size="lg" color="white">{Math.abs(netRatingChange)}</Text></Text>}
                                </Text>
                                : <Text size="lg" color="white">N/A</Text>} />
                        <Widget
                            Title="Current Rank"
                            Content={fetchResult[selectPlayer[0]].length ?
                                <Text size="lg" color="white">
                                    {`${fetchResult[selectPlayer[0]].at(-1).rank} (NA)`}
                                </Text> : <Text size="lg" color="white">N/A</Text>} />
                        <Widget
                            Title="Latest Record"
                            Content={fetchResult[selectPlayer[0]].length ?
                                <Text size="lg" color="white">
                                    {timeDisplay(fetchResult[selectPlayer[0]].at(-1).timeStamp)}
                                </Text> : <Text size="lg" color="white">N/A</Text>} />
                </div>
                <div className={styles["visualizer-grid"]}>
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