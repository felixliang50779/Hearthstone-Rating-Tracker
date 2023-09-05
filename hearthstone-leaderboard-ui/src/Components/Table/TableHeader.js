import { Text } from "dracula-ui";
import { Switch } from "dracula-ui";

import styles from './TableHeader.module.css';

export function TableHeader({ oldestFirst, setOldestFirst }) {
  const handleSwitchChange = () => {
    setOldestFirst(prevState => {
      return !prevState;
    })
  }

  return (
    <div className={styles['tableHeader']}>
      <Text
        size="lg"
        weight="bold"
        color="pink">Player Records</Text>
      <Switch
        color="purple"
        id="toggleOrder"
        defaultChecked={oldestFirst}
        style={{ marginLeft: "48%" }}
        onChange={handleSwitchChange} />
      <label htmlFor="toggleOrder" style={{ fontFamily: "Roboto-Mono", color: "white" }}>
        Oldest First
      </label>
    </div>
  );
}