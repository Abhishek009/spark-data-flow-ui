
// import React, { useEffect, useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
// import { Box, Container, TextField, InputLabel, MenuItem, Tooltip, useMediaQuery } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
// import { saveInputData, fetchInputData, saveTransData } from '../../api/DataApi';
// import InputTable from '../TableInterface/InputTable';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import FormLabel from '@mui/material/FormLabel';

// import { DataSet , AllDataInput } from '../../api/DataModels';



// export default function TransformationForm() {

//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//     //const [sourceType, setSourceType] = useState<string>('');
//     const [transDataSetName, setTransDataSetName] = useState<string>('');
//     const [rowData,setRowData] = useState<AllDataInput[]>([])
//     const [transQuery, setTransQuery] = useState<string>('');
//     const [selectedValue, setSelectedValue] = React.useState<string[]>([]);
//     const [radioSelectedValue, setRadioSelectedValue] = React.useState('');
//     const [transOutputDataSetName,setTransOutputDataSetName] =useState<string>('')

    

//     const handleChangeTransDataSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setTransDataSetName(event.target.value);
//     };

//     const handleChangeTransOutputDataSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setTransOutputDataSetName(event.target.value);
//     };

//     const handleChangeTransQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setTransQuery(event.target.value);
//     };

//     const handleOnClickSourceType = async (e:React.MouseEvent<HTMLElement>) => {
        
       
        
//         const fetchData = await fetchInputData() as DataSet[]
//           const data = fetchData.map(  rawpost => {
//             return{
//               id:rawpost.id,
//               inputDataSetName: rawpost.dataSetName,
//               inputSchemaName:rawpost.schemaName,
//               inputType:rawpost.dataSetType,
//               inputTableName:rawpost.tableName,
//               inputFileLocation:rawpost.directoryFileLocation,
      
              
//             }
//           })
//           setRowData(data)

//     };

 

//     const handleChangeSourceType = (event: SelectChangeEvent<typeof selectedValue>) => {
//         const {
//             target: { value },
//           } = event;
//           setSelectedValue(
//             typeof value === 'string' ? value.split(',') : value,
//           );
//       };

//     const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRadioSelectedValue(event.target.value);
//     };

//     useEffect(()=>{
//         async function getInputData(){
//           const fetchData = await fetchInputData() as DataSet[]
//           const data = fetchData.map(  rawpost => {
//             return{
//               id:rawpost.id,
//               inputDataSetName: rawpost.dataSetName,
//               inputSchemaName:rawpost.schemaName,
//               inputType:rawpost.dataSetType,
//               inputTableName:rawpost.tableName,
//               inputFileLocation:rawpost.directoryFileLocation,
//             }
//           })
//           setRowData(data)
//           console.log(data)
//         }
//         getInputData()
//       },[])

//       const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
//         await saveTransData(transDataSetName,"",transOutputDataSetName,transQuery)
//         console.log("Form is submitted")
//         const fetchData = await fetchInputData()
         
 
//         const data = fetchData.map(  rawpost => {
//          return{
//            id:rawpost.id,
//            inputDataSetName: rawpost.dataSetName,
//            inputSchemaName:rawpost.schemaName,
//            inputType:rawpost.dataSetType,
//            inputTableName:rawpost.tableName,
//            inputFileLocation:rawpost.directoryFileLocation,
   
           
//          }
//        })
//         setRowData(data)
       
        
//        };



//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <Grid container rowSpacing={2} spacing={2}>
//                     <Grid size={4}>
//                         <TextField id="transDataSetName"
//                             label="Transformation Name"
//                             value={transDataSetName}
//                             onChange={handleChangeTransDataSetName} variant="outlined" />
//                     </Grid>
//                     <Grid size={4}>
//                         <FormControl sx={{
//                             width: isSmallScreen ? '100%' : '210px',
//                         }} >
//                             <InputLabel id="label-inputType">Input</InputLabel>
//                             <Tooltip title="Select inputs which are used in your sql." arrow placement="right">


//                                 <Select
//                                     labelId="multi-select-label"
//                                     id="demo-multiple-name"
//                                     multiple
//                                     value={selectedValue}
//                                     label="select-inputType"
//                                     onChange={handleChangeSourceType}
//                                     input={<OutlinedInput label="Name" />}
//                                     onMouseEnter={handleOnClickSourceType}
//                                 >
//                                     {rowData.map((item) => (
//           <MenuItem key={item.id} value={item.inputDataSetName}>
//             {item.inputDataSetName}
//           </MenuItem>
//         ))}
//                                 </Select></Tooltip>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={4}>
//                         <TextField id="transOutputDataSetName"
//                             label="OutputName"
//                             value={transOutputDataSetName}
//                             onChange={handleChangeTransOutputDataSetName} variant="outlined" />
//                     </Grid>

//                     <br />


//                 </Grid>
//                 <Grid container rowSpacing={2} spacing={2}>

//                     <FormControl component="fieldset">
//                         <Grid size={12}>
//                             <FormLabel component="legend">Choose Query Type</FormLabel></Grid>
//                         <Grid size={12}>
//                             <RadioGroup row
//                                 aria-labelledby="demo-radio-buttons-group-label"
//                                 defaultValue="queryType"
//                                 name="radio-buttons-group"
//                                 value={radioSelectedValue}
//                                 onChange={handleRadioChange}
//                             >

//                                 <FormControlLabel value="query" control={<Radio />} label="Query" />
//                                 <FormControlLabel value="file" control={<Radio />} label="file" />

//                             </RadioGroup>
//                         </Grid>
//                         <Grid size={12}>
//                             {radioSelectedValue === 'query' && (
//                                 <TextField
//                                     label="Enter your query"
//                                     variant="outlined"
//                                     value={transQuery}
//                                     onChange={handleChangeTransQuery}
//                                     multiline
//                                     rows={4}
//                                     sx={{
//                                         width: isSmallScreen ? '100%' : '400%'
//                                     }}
//                                 />
//                             )}
//                         </Grid>
//                         <Grid size={12}>
//                             {radioSelectedValue === 'file' && (
//                                 <Box sx={{ mt: 2 }}>
//                                     <Button
//                                         variant="contained"
//                                         component="label"
//                                     >
//                                         Choose File
//                                         <input
//                                             type="file"
//                                             hidden
//                                         />
//                                     </Button>
//                                 </Box>
//                             )}
//                         </Grid>

//                     </FormControl>
//                 </Grid>
//                 <br />





//                 <Grid container rowSpacing={2} spacing={2}>
//                     <Grid>
//                         <Button variant="contained" type='submit' >Save Transformation</Button>
//                     </Grid>
//                     <Grid size={12}>

//                     </Grid>

//                 </Grid>
//                 </form>
//             <Grid container rowSpacing={2} spacing={2}>
//                 <Grid size={12}>

//                 </Grid>
//                 <Grid size={12}>

//                 </Grid>

//             </Grid>
//         </>
//     )
// }

