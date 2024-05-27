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
      <div className={styles['header-switch']}>
        <Switch
          color="purple"
          id="toggleOrder"
          defaultChecked={oldestFirst}
          onChange={handleSwitchChange} />
        <label className={styles['switch-label']} htmlFor="toggleOrder">
          Oldest First
        </label>
      </div>
    </div>
  );
}