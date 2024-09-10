
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Box, Container, TextField, InputLabel, MenuItem, Tooltip, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { saveInputData, fetchInputData } from '../../api/DataApi';
import InputTable from '../TableInterface/InputTable';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';

export default function TransformationForm() {

    const [sourceType, setSourceType] = useState<string>('');
    const [inputDataSetName, setInputDataSetName] = useState<string>('');
    const [inputSchemaName, setInputSchemaName] = useState<string>('');
    const [inputTableName, setInputTableName] = useState<string>('');
    const [inputFileLocation, setInputFileLocation] = useState<string>('')
    const [isFileBoxVisible, setIsFileBoxVisible] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(true);
  

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChangeInputDataSet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDataSetName(event.target.value);
    };


    const handleChangeSourceType = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSourceType(value);
        console.log(value)
        if (value === "File_HDFS") {
            setIsVisible(false);
            setIsFileBoxVisible(true)
        }
        else {
            setIsVisible(true);
            setIsFileBoxVisible(false)
        }

    };

    const [selectedValue, setSelectedValue] = useState<string>('query');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <form >
                <Grid container rowSpacing={2} spacing={2}>
                    <Grid size={4}>
                        <TextField id="inputDataSetName"
                            label="Transformation Name"
                            value={inputDataSetName}
                            onChange={handleChangeInputDataSet} variant="outlined" />
                    </Grid>
                    <Grid size={4}>
                        <FormControl sx={{
                            width: isSmallScreen ? '100%' : '210px',
                        }} >
                            <InputLabel id="demo-simple-select-label">Input</InputLabel>
                            <Tooltip title="Select inputs which are used in your sql." arrow placement="right">


                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sourceType}
                                    label="source_type"
                                    onChange={handleChangeSourceType}
                                >
                                    <MenuItem value="Jdbc_Mysql">mysqlread</MenuItem>
                                    <MenuItem value="Jdbc_Postgress">postgressread</MenuItem>
                                    <MenuItem value="Hive">accesstable</MenuItem>
                                    <MenuItem value="File_HDFS">hdfsanalysispath</MenuItem>
                                </Select></Tooltip>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <TextField id="inputDataSetName"
                            label="OutputName"
                            value={inputDataSetName}
                            onChange={handleChangeInputDataSet} variant="outlined" />
                    </Grid>

                    <br />


                </Grid>
                <Grid container rowSpacing={2} spacing={2}>

                    <FormControl component="fieldset">
                        <Grid size={12}>
                            <FormLabel component="legend">Choose Query Type</FormLabel></Grid>
                        <Grid size={12}>
                            <RadioGroup row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="queryType"
                                name="radio-buttons-group"
                                value={selectedValue}
                                onChange={handleRadioChange}
                            >

                                <FormControlLabel value="query" control={<Radio />} label="Query" />
                                <FormControlLabel value="file" control={<Radio />} label="file" />

                            </RadioGroup>
                        </Grid>
                        <Grid size={12}>
                            {selectedValue === 'query' && (
                                <TextField
                                    label="Enter your query"
                                    variant="outlined"

                                    multiline
                                    rows={4}
                                    sx={{
                                        width: isSmallScreen ? '100%' : '400%'
                                    }}
                                />
                            )}
                        </Grid><Grid size={12}>
                            {selectedValue === 'file' && (
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Choose File
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                </Box>
                            )}
                        </Grid>

                    </FormControl>
                </Grid>
                <br />





                <Grid container rowSpacing={2} spacing={2}>
                    <Grid>
                        <Button variant="contained" type='submit'>Save Transformation</Button>
                    </Grid>
                    <Grid size={12}>

                    </Grid>

                </Grid></form>
            <Grid container rowSpacing={2} spacing={2}>
                <Grid size={12}>

                </Grid>
                <Grid size={12}>

                </Grid>

            </Grid>
        </>
    )
}

