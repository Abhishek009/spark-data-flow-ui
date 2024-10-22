// import React, { useEffect, useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
// import { Box, Container, TextField, InputLabel, MenuItem, Tooltip, useMediaQuery, Modal } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
// import { saveInputData , fetchInputData } from '../../api/DataApi';
// import InputTable from '../TableInterface/InputTable';
// import { DataSet , AllDataInput } from '../../api/DataModels';




// // interface Props {
// //   open:boolean;
// //   onClose: () => void;
// // }

// {/* const InputForm=( {open, onClose } : Props)=> { */}
//   const InputForm=()=> {
//     //const [sourceType, setSourceType] = useState<string>('');
//     const [inputDataSetName, setInputDataSetName] = useState<string>('');
//     const [inputSourceType, setInputSourceType]  = useState<string>('');
//     const [inputSchemaName, setInputSchemaName] = useState<string>('');
//     const [inputTableName, setInputTableName] = useState<string>('');
//     const [inputFileLocation, setInputFileLocation] = useState<string>('')
//     const [isFileBoxVisible, setIsFileBoxVisible] = useState<boolean>(true);
//     const [isVisible, setIsVisible] = useState<boolean>(true);
//     const [rowData,setRowData] = useState<AllDataInput[]>([])


//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//     const handleChangeInputDataSet = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setInputDataSetName(event.target.value);
//       };
    
//       const handleChangeSchemaName = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setInputSchemaName(event.target.value);
//       };
    
//       const handleChangeTableName = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setInputTableName(event.target.value);
//       };
    
//       const handleChangeFileLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setInputFileLocation(event.target.value);
//       };
    


//       const handleChangeSourceType = (event: SelectChangeEvent) => {
//         const value = event.target.value;
//         setInputSourceType(value);
//         console.log(value)
//         if (value === "File_HDFS") {
//           setIsVisible(false);
//           setIsFileBoxVisible(true)
//         }
//         else {
//           setIsVisible(true);
//           setIsFileBoxVisible(false)
//         }
    
//       };
    
//       const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
       
       
//        await saveInputData(inputDataSetName,inputSourceType,inputSchemaName,inputTableName,inputFileLocation)
//        console.log("Form is submitted")
//        const fetchData = await fetchInputData()
        

//        const data = fetchData.map(  rawpost => {
//         return{
//           id:rawpost.id,
//           inputDataSetName: rawpost.dataSetName,
//           inputSchemaName:rawpost.schemaName,
//           inputType:rawpost.dataSetType,
//           inputTableName:rawpost.tableName,
//           inputFileLocation:rawpost.directoryFileLocation,
  
          
//         }
//       })
//        setRowData(data)
//       };

// useEffect(()=>{
//   async function getInputData(){
//     const fetchData = await fetchInputData() as DataSet[]
//     const data = fetchData.map(  rawpost => {
//       return{
//         id:rawpost.id,
//         inputDataSetName: rawpost.dataSetName,
//         inputSchemaName:rawpost.schemaName,
//         inputType:rawpost.dataSetType,
//         inputTableName:rawpost.tableName,
//         inputFileLocation:rawpost.directoryFileLocation,

        
//       }
//     })
//     setRowData(data)
//     console.log(data)
//   }
//   getInputData()
// },[])

//     return(
// <>
// {/* 
// <Modal open={open} onClose={() => onClose()}>

// <div>*/}
// <form onSubmit={handleSubmit}>
// <Grid container rowSpacing={2} spacing={2}>
//                 <Grid size={4}>
//                   <TextField id="inputDataSetName" 
//                   label="DataSet Name" 
//                   value={inputDataSetName} 
//                   onChange={handleChangeInputDataSet} variant="outlined" />
//                 </Grid>
//                 <Grid size={4}>
//                   <FormControl sx={{
//         width: isSmallScreen ? '100%' : '210px',
//       }} >
//                     <InputLabel id="demo-simple-select-label">Source Type</InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       value={inputSourceType}
//                       label="source_type"
//                       onChange={handleChangeSourceType}
//                     >
//                       {/* <MenuItem value="Jdbc_Mysql">Jdbc_Mysql</MenuItem>
//                       <MenuItem value="Jdbc_Postgress">Jdbc_Postgress</MenuItem> */}
//                       <MenuItem value="Hive">Hive</MenuItem>
//                       <MenuItem value="File_HDFS">File_HDFS</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid size={4}>

//                 </Grid>

//                 {/* Row 2*/}
//                 {isVisible && (<><Grid size={4}>
//                   {isVisible && (<TextField id="outlined-basic" label="Schema Name"  value={inputSchemaName} 
//                   onChange={handleChangeSchemaName} variant="outlined" />)}
//                 </Grid>
//                   <Grid size={4}>
//                     {isVisible && (<TextField id="outlined-basic" label="Table Name" value={inputTableName} 
//                   onChange={handleChangeTableName} variant="outlined" />)}
//                   </Grid>
//                   <Grid size={4}>
//                   </Grid></>)}

//                 {/* Row 3*/}
//                 <Grid>

//                   {isFileBoxVisible && (<>
//                     <TextField id="outlined-basic" label="File/Directory Location" value={inputFileLocation} 
//                   onChange={handleChangeFileLocation} variant="outlined" /><br />
//                     <Tooltip title="Add" arrow>
//                       <Button >Add Options</Button>
//                     </Tooltip>
//                   </>)}

//                 </Grid>
//               </Grid>
//               <Grid container rowSpacing={2} spacing={2}>
//                 <Grid>
//                   <Button variant="contained" type='submit'>Save Input</Button>
//                 </Grid>
//                 <Grid size={12}>
                  
//                 </Grid>

//               </Grid></form>
//               <Grid container rowSpacing={2} spacing={2}>
//                 <Grid size={12}>
//                 <InputTable rows={rowData} />
//                 </Grid>
//                 <Grid size={12}>
                  
//                 </Grid>

//               </Grid>
//              {/*  </div>
// </Modal> */}
// </>
//     );
// }

// export default InputForm;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new SparkLogWebSocketHandler(), "/spark-logs").setAllowedOrigins("*");
    }
}

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SparkLogWebSocketHandler extends TextWebSocketHandler {
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Fetch logs from Spark History Server
        String logs = fetchLogsFromHistoryServer();
        session.sendMessage(new TextMessage(logs));
    }

    private String fetchLogsFromHistoryServer() {
        // Implement logic to fetch logs from Spark History Server
        return "Sample Spark Logs";
    }
}


Connect to WebSocket in React:
import React, { useEffect, useState } from 'react';

const SparkLogViewer: React.FC = () => {
    const [logs, setLogs] = useState('');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/spark-logs');

        socket.onmessage = (event) => {
            setLogs(event.data);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>Spark Logs</h1>
            <pre>{logs}</pre>
        </div>
    );
};

export default SparkLogViewer;

Using Polling
Update Spring Boot to Provide Logs:

The same as before, but the /spark-logs endpoint can provide partial logs as needed.

Polling in React:
import React, { useEffect, useState } from 'react';

const SparkLogViewer: React.FC = () => {
    const [logs, setLogs] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch('/spark-logs')
                .then(response => response.text())
                .then(data => setLogs(data));
        }, 5000); // Polling every 5 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>Spark Logs</h1>
            <pre>{logs}</pre>
        </div>
    );
};

export default SparkLogViewer;
