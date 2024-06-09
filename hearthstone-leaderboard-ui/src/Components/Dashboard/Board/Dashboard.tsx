import { useState } from "react";

import { Widget } from "../Widget/Widget";
import { LineGraph } from "../Graph/LineGraph";
import { DataTable } from "../Table/DataTable";
import { Sidebar } from "../Sidebar/Sidebar";

import { Text } from "dracula-ui";

import styles from "./Dashboard.module.css"


interface Props {
    fetchResult: any,
    timeDisplay: Function
}

export function Dashboard({ fetchResult, timeDisplay }: Props) {
    const fromOldest = useState(false);
    const selectPlayer = useState(Object.keys(fetchResult).at(0));

    console.log(typeof(selectPlayer[1]))

    let netRatingChange = null;

    const selectedPlayerName = selectPlayer[0] as string;


    if (fetchResult[selectedPlayerName].length) {
        netRatingChange = fetchResult[selectedPlayerName].at(-1).rating -
        fetchResult[selectedPlayerName].at(0).rating;
    }

    return (
        <div className={styles.board}>
            <Sidebar />
            <div className={styles["content-container"]}>
                <div className={styles["widget-grid"]}>
                    <Widget
                            Title="Current Rating"
                            Content={fetchResult[selectedPlayerName].length ? 
                                <Text size="lg" color="white">{fetchResult[selectedPlayerName].at(-1).rating}</Text> : 
                                <Text size="lg" color="white">N/A</Text>} />
                        <Widget
                            Title="Past Week"
                            Content={fetchResult[selectedPlayerName].length ?
                                <Text size="lg" color="white">
                                    {netRatingChange! >= 0 ? 
                                    <Text size="lg" color="green" weight="bold">+<Text size="lg" color="white">{netRatingChange}</Text></Text>
                                    : <Text size="lg" color="red" weight="bold">-<Text size="lg" color="white">{Math.abs(netRatingChange!)}</Text></Text>}
                                </Text>
                                : <Text size="lg" color="white">N/A</Text>} />
                        <Widget
                            Title="Current Rank"
                            Content={fetchResult[selectedPlayerName].length ?
                                <Text size="lg" color="white">
                                    {`${fetchResult[selectedPlayerName].at(-1).rank} (NA)`}
                                </Text> : <Text size="lg" color="white">N/A</Text>} />
                        <Widget
                            Title="Latest Record"
                            Content={fetchResult[selectedPlayerName].length ?
                                <Text size="lg" color="white">
                                    {timeDisplay(fetchResult[selectedPlayerName].at(-1).timeStamp)}
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