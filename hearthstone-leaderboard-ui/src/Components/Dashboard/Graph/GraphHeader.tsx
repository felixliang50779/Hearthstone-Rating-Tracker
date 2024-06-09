// External stuff
import { Dropdown } from "../Dropdown/Dropdown";
import { Button } from "dracula-ui";
import { Text } from "dracula-ui";

// Internal stuff
import { Props } from "../Dropdown/Dropdown";
import styles from './GraphHeader.module.css';


export function GraphHeader({ fetchResult, setPlayer }: Props) {
    return (
        <div className={styles.graphHeader}>
            <Text
                size="lg"
                weight="bold"
                color="pink">Tracked Player</Text>
            <div className={styles['header-buttons']}>
                <Button
                    variant="ghost"
                    disabled={true}
                    color="purple"
                    title="Coming Soon!">+/- Player</Button>
                <Dropdown fetchResult={fetchResult} setPlayer={setPlayer} />
            </div>
        </div>
    )
}