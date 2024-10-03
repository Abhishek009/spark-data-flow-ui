import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Box, Container, TextField, InputLabel, MenuItem, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';


import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import InputForm from '../InputForm/InputForm';
//import TransformationForm from '../TransformationForm/TransformationForm';
//import OutputForm from '../OutputForm/OutputForm';





export default function Accord() {

const [inputFormOpen,setInputFormOpen] = useState(false)

const handleInputFormOpen=()=>{
  setInputFormOpen(true)
}

const handleInputFormClose=()=>{
  setInputFormOpen(false)
}

  return (
    <div>


      <Container maxWidth="lg">
        <Box sx={{ height: '100vh' }} >
       
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Input
            </AccordionSummary>
            <AccordionDetails>
            {/* <Button variant='contained' onClick={handleInputFormOpen}>Add Options</Button> 
            <InputForm open={inputFormOpen} onClose={handleInputFormClose} />*/}
            {/* <InputForm/> */}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Transformation
            </AccordionSummary>
            <AccordionDetails>
              {/* <TransformationForm/> */}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Output
              
            </AccordionSummary>
            <AccordionDetails>
              {/* <OutputForm></OutputForm> */}
            </AccordionDetails>
            
          </Accordion>
          


        </Box>
        
      </Container>
      

    </div>
  );
}