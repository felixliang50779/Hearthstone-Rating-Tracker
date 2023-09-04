import { Dropdown } from "../Dropdown/Dropdown";
import styles from './GraphHeader.module.css';

export function GraphHeader({ fetchResult, setPlayer }) {
    return (
        <div className={styles.graphHeader}>
            <p className={styles.graphTitle}>Rating Fluctuations</p>
            <Dropdown fetchResult={fetchResult} setPlayer={setPlayer} />
        </div>
    )
}