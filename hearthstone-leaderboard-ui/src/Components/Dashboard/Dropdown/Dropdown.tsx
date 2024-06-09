// External stuff
import Box from '@mui/material/Box';
import { Select } from 'dracula-ui';
import React, { ChangeEvent } from 'react';

// Internal stuff
import { FetchResult } from '../../../App';

export interface Props {
    fetchResult: FetchResult,
    setPlayer: React.Dispatch<React.SetStateAction<string>>
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