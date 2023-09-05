import Box from '@mui/material/Box';
import { Select } from 'dracula-ui';

import styles from './Dropdown.module.css'

export function Dropdown({ fetchResult, setPlayer }) {

    const handleDropdownChange = event => {
        setPlayer(event.target.value);
    }

    return (
        <Box className={styles.dropdown} sx={{ minWidth: 120 }}>
            <Select
                onChange={handleDropdownChange}
                color='purple'>
                {Object.keys(fetchResult).map((playerName, index) => {
                    return <option key={index}>{playerName}</option>
                })}
            </Select>
        </Box>
    )
}