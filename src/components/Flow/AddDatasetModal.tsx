import React, { useState } from 'react';

import { saveInputData , fetchInputData } from '../../api/DataApi';
import { Modal, Box, TextField, Button, Typography, MenuItem ,Divider} from '@mui/material';
interface AddDatasetModalProps {
    open: boolean;
    handleClose: () => void;
    handleAddDataset: (
        datasetName: string,
        sourceType: string,
        schemaName: string,
        tableName: string,
        fileLocation: string
      ) => void; // Add this prop to fetch updated datasets
}



const AddDatasetModal: React.FC<AddDatasetModalProps> = ({ open, handleClose, handleAddDataset   }) => {
    const [datasetName, setDatasetName] = useState('');
    const [datasetType, setDatasetType] = useState('');
    const [schemaName, setSchemaName] = useState('');
    const [tableName, setTableName] = useState('');
    const [fileLocation, setFileLocation] = useState('');

    const handleSubmit = async () =>  {
        // const newDataset = await saveInputData(datasetName,datasetType,schemaName,tableName,fileLocation)
        
        // addNode({
        //     id: newDataset.id,
        //     data: { label: newDataset.dataSetName },
        //     position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for example
        // });
        // handleClose();
        handleAddDataset(datasetName, datasetType, schemaName, tableName, fileLocation);
        
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-dataset-modal-title"
            aria-describedby="add-dataset-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="add-dataset-modal-title" variant="h3" component="h2">
                    Add Dataset
                </Typography>
                
                <Divider />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="datasetName"
                    label="Dataset Name"
                    name="datasetName"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    select
                    id="datasetType"
                    label="Dataset Type"
                    name="datasetType"
                    value={datasetType}
                    onChange={(e) => setDatasetType(e.target.value)}
                >
                    <MenuItem value="hive">Hive</MenuItem>
                    <MenuItem value="file">File</MenuItem>
                </TextField>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="schemaName"
                    label="Schema Name"
                    name="schemaName"
                    value={schemaName}
                    onChange={(e) => setSchemaName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="tableName"
                    label="Table Name"
                    name="tableName"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                />
                {/* <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button> */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            type="button"
            size="medium" // Adjust the size to medium
            variant="contained"
            sx={{ height: '40px' }} // Custom size
            onClick={handleSubmit}
          >
            Add Input DataSet
          </Button>
        </Box>
            </Box>
        </Modal>
    );
};

export default AddDatasetModal;
