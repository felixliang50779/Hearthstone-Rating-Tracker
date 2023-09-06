import { Dropdown } from "../Dropdown/Dropdown";
import { Button } from "dracula-ui";
import styles from './GraphHeader.module.css';

import { Text } from "dracula-ui";

export function GraphHeader({ fetchResult, setPlayer }) {
    return (
        <div className={styles.graphHeader}>
            <Text
                size="lg"
                weight="bold"
                color="pink">Player Rating</Text>
            <Button
                variant="ghost"
                disabled={true}
                color="purple"
                title="Coming Soon!"
                style={{ marginLeft: "40%" }}>+/- Player</Button>
            <Dropdown fetchResult={fetchResult} setPlayer={setPlayer} />
        </div>
    )
}