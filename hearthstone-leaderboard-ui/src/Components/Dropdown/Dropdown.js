import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import styles from './Dropdown.module.css';

export function Dropdown({ fetchResult, setPlayer }) {

    const handleDropdownChange = event => {
        setPlayer(event.target.value);
    }

    return (
        <Box className={styles.dropdown} sx={{ minWidth: 120 }}>
            <FormControl small="true">
                <InputLabel variant="standard" htmlFor="uncontrolled-native">Select Player</InputLabel>
                <NativeSelect
                    defaultValue={Object.keys(fetchResult)[0]}
                    inputProps={{
                        name: "tracked-player",
                        id: "uncontrolled-native"
                    }}
                    sx={{ maxHeight: 25 }}
                    onChange={handleDropdownChange}>
                    {Object.keys(fetchResult).map((playerName, index) => {
                        return <option key={index} value={playerName}>{playerName}</option>
                    })}
                </NativeSelect>
            </FormControl>
        </Box>
    )
}