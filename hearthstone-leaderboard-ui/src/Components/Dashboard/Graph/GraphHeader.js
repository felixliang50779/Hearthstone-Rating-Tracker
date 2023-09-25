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
                color="pink">Tracked Player</Text>
            <Button
                variant="ghost"
                disabled={true}
                color="purple"
                title="Coming Soon!">+/- Player</Button>
            <Dropdown fetchResult={fetchResult} setPlayer={setPlayer} />
        </div>
    )
}