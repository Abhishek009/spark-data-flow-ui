import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { saveInputData, fetchInputData,saveSparkSqlInputData } from '../../api/DataApi';
import { DataSet, AllDataInput,SparkSqlInputData } from '../../api/DataModels';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Modal, Box, TextField, Button, Typography, MenuItem, Link, IconButton, Divider, CircularProgress } from '@mui/material';



interface SparkSqlModalProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (inputDataForSparkSql:SparkSqlInputData) => void;
}

const SparkSqlModal: React.FC<SparkSqlModalProps> = ({ open, handleClose,handleSubmit }) => {


    const [inputNames, setInputNames] = useState<DataSet[]>([]);
    // const [selectedInputName, setSelectedInputName] = useState('');
    const [selectedInputNames, setSelectedInputNames] = useState<string[]>(['']);
    const [selectedInputId, setSelectedInputId] = useState<string[]>(['']);
    const [outputDataset, setOutputDataset] = useState('');
    const [format, setFormat] = useState('');
    const [tableName, setTableName] = useState('');
    const [schemaName, setSchemaName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInputNames = async () => {
            setLoading(true);
            try {
                //const response = await axios.get('http://localhost:5000/api/input-names'); // Adjust the endpoint as needed
                const response = await fetchInputData()

                setInputNames(response);


            } catch (error) {
                setError('Error fetching input names');
                console.error('Error fetching input names:', error);
              } finally {
                setLoading(false);
              }
        };

        fetchInputNames();
    }, []);

    const handleAddInputName = () => {
        setSelectedInputNames([...selectedInputNames, '']);
    };

    const handleRemoveInputName = (index: number) => {
        const newSelectedInputNames = selectedInputNames.filter((_, i) => i !== index);
        setSelectedInputNames(newSelectedInputNames);
    };


    const handleInputNameChange = (index: number, value: string, id:string ) => {
        const newSelectedInputNames = [...selectedInputNames];
        newSelectedInputNames[index] = value;
        console.log("Selected input id",id)
        console.log("Selected input value",value)
        setSelectedInputNames(newSelectedInputNames);
    };

    const onSubmit = () => {
        if (!outputDataset || !format || !tableName || !schemaName || selectedInputNames.some(name => !name)) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            let inputOutputData:SparkSqlInputData = {
            selectedInputNames:selectedInputNames,
            outputDataset:outputDataset,
            format:format,
            tableName:tableName,
            schemaName:schemaName};
            handleSubmit(inputOutputData)

            
            console.log({
                selectedInputNames,
                outputDataset,
                format,
                tableName,
                schemaName,
            });
            handleClose();
        } catch (error) {
            setError('Error submitting form');
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="spark-sql-modal-title"
            aria-describedby="spark-sql-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="spark-sql-modal-title" variant="h3" component="h2">
                    Spark SQL
                </Typography>
                <Divider />
                {loading ? (
          <CircularProgress />
        ) : (
         <Grid container spacing={2}>

                    <Grid size={6}>

                        {selectedInputNames.map((inputName, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    select
                                    id={`inputName-${index}`}
                                    label={`Input Name ${index + 1}`}
                                    name={`inputName-${index}`}
                                    value={inputName}
                                    onChange={(e) => handleInputNameChange(index, e.target.value,e.target.id)}
                                >
                                    {inputNames.map((name) => (
                                        <MenuItem key={name.id} id={name.id} value={name.id}>
                                            {name.dataSetName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <IconButton onClick={() => handleRemoveInputName(index)} disabled={selectedInputNames.length === 1}>
                                    <RemoveIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            type="button"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddInputName}
                            sx={{ mb: 2 }}
                        >
                            Add Input Name
                        </Button>


                    </Grid>

                    <Grid size={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="outputDataset"
                            label="Output Dataset"
                            name="outputDataset"
                            value={outputDataset}
                            onChange={(e) => setOutputDataset(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            select
                            id="format"
                            label="Format"
                            name="format"
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                        >
                            <MenuItem value="csv">CSV</MenuItem>
                            <MenuItem value="json">JSON</MenuItem>
                            <MenuItem value="parquet">Parquet</MenuItem>
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

                    </Grid>

                </Grid>  )}
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        type="button"
                        size="medium" // Adjust the size to medium
                        variant="contained"
                        sx={{ width: '170px', height: '40px' }} // Custom size
                        onClick={onSubmit} disabled={loading}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SparkSqlModal;
