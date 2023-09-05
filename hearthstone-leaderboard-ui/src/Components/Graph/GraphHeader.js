import { Dropdown } from "../Dropdown/Dropdown";
import styles from './GraphHeader.module.css';

import 'dracula-ui/styles/dracula-ui.css'
import { Text } from "dracula-ui";

export function GraphHeader({ fetchResult, setPlayer }) {
    return (
        <div className={styles.graphHeader}>
            <Text size="lg" weight="bold" color="pinkPurple">Player Rating</Text>
            <Dropdown fetchResult={fetchResult} setPlayer={setPlayer} />
        </div>
    )
}