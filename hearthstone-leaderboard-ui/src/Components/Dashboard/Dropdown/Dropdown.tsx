// External stuff
import Box from '@mui/material/Box';
import { Select } from 'dracula-ui';
import { ChangeEvent } from 'react';

export interface Props {
    fetchResult: any,
    setPlayer: Function
}

export function Dropdown({ fetchResult, setPlayer }: Props) {

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setPlayer(event.target.value);
    }

    return (
        <Box>
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