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
import { saveInputData , fetchInputData } from '../../api/DataApi';
import InputTable from '../TableInterface/InputTable';



export type AllDataInput = {
    inputDataSetName:string;
    inputSchemaName:string;
    inputTableName:string;
    inputFileLocation:string;
  }

export type RawBlogPost ={
  id: string;
  userId: string;
  title: string;
  body:string;
}


const InputForm=()=> {

    const [sourceType, setSourceType] = useState<string>('');
    const [inputDataSetName, setInputDataSetName] = useState<string>('');
    const [inputSchemaName, setInputSchemaName] = useState<string>('');
    const [inputTableName, setInputTableName] = useState<string>('');
    const [inputFileLocation, setInputFileLocation] = useState<string>('')
    const [isFileBoxVisible, setIsFileBoxVisible] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    //const [allDataInput,setAllDataInput] = useState<AllDataInput>();
    const [rowData,setRowData] = useState<AllDataInput[]>([])

    //const [allDataInput, setAllDataInput] = useState({
    //    inputDataSetName:'',
    //    inputSchemaName:'',
    //    inputTableName:'',
    //    inputFileLocation:''
    //  });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChangeInputDataSet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDataSetName(event.target.value);
      };
    
      const handleChangeSchemaName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSchemaName(event.target.value);
      };
    
      const handleChangeTableName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTableName(event.target.value);
      };
    
      const handleChangeFileLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputFileLocation(event.target.value);
      };
    
    // Code can be used to get data from the fields  
    //  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    setAllDataInput({
    //      ...allDataInput,
    //      [e.target.name]: e.target.value
    //    });
    //  };


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
    
      const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       
       await saveInputData(inputDataSetName,inputSchemaName,inputTableName,inputFileLocation)
       console.log("Form is submitted")
       
      };

useEffect(()=>{
  async function getInputData(){
    const fetchData = await fetchInputData() as RawBlogPost[]
    const data = fetchData.map(  rawpost => {
      return{
        inputDataSetName: rawpost.id,
        inputSchemaName:rawpost.title,
        inputTableName:rawpost.userId,
        inputFileLocation:rawpost.body,
      }
    })
    setRowData(data)
    console.log(data)
  }
  getInputData()
},[])

    return(
<>
<form onSubmit={handleSubmit}>
<Grid container rowSpacing={2} spacing={2}>
                <Grid size={4}>
                  <TextField id="inputDataSetName" 
                  label="DataSet Name" 
                  value={inputDataSetName} 
                  onChange={handleChangeInputDataSet} variant="outlined" />
                </Grid>
                <Grid size={4}>
                  <FormControl sx={{
        width: isSmallScreen ? '100%' : '210px',
      }} >
                    <InputLabel id="demo-simple-select-label">Source Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sourceType}
                      label="source_type"
                      onChange={handleChangeSourceType}
                    >
                      <MenuItem value="Jdbc_Mysql">Jdbc_Mysql</MenuItem>
                      <MenuItem value="Jdbc_Postgress">Jdbc_Postgress</MenuItem>
                      <MenuItem value="Hive">Hive</MenuItem>
                      <MenuItem value="File_HDFS">File_HDFS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={4}>

                </Grid>

                {/* Row 2*/}
                {isVisible && (<><Grid size={4}>
                  {isVisible && (<TextField id="outlined-basic" label="Schema Name"  value={inputSchemaName} 
                  onChange={handleChangeSchemaName} variant="outlined" />)}
                </Grid>
                  <Grid size={4}>
                    {isVisible && (<TextField id="outlined-basic" label="Table Name" value={inputTableName} 
                  onChange={handleChangeTableName} variant="outlined" />)}
                  </Grid>
                  <Grid size={4}>
                  </Grid></>)}

                {/* Row 3*/}
                <Grid>

                  {isFileBoxVisible && (<>
                    <TextField id="outlined-basic" label="File/Directory Location" value={inputFileLocation} 
                  onChange={handleChangeFileLocation} variant="outlined" /><br />
                    <Tooltip title="Add" arrow>
                      <Button >Add Options</Button>
                    </Tooltip>
                  </>)}

                </Grid>
              </Grid>
              <Grid container rowSpacing={2} spacing={2}>
                <Grid>
                  <Button variant="contained" type='submit'>Save Input</Button>
                </Grid>
                <Grid size={12}>
                  
                </Grid>

              </Grid></form>
              <Grid container rowSpacing={2} spacing={2}>
                <Grid size={12}>
                <InputTable rows={rowData} />
                </Grid>
                <Grid size={12}>
                  
                </Grid>

              </Grid>
</>
    );
}

export default InputForm;