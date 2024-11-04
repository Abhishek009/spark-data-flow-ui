import React, { useCallback, useEffect, useState } from 'react';
import { AlertProps, Box, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';
import PropTypes, { node } from 'prop-types';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/sql/sql';
import './CodeRecipe.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getCodeForNode, saveCodeForNode, generateMappingForExecution, fetchInputData } from '../../api/DataApi';
import { useLocation } from 'react-router-dom';
import CommonSnackbar from '../Snackbar/CommonSnackbar';
import { SparkSqlInputData, FlowMapping } from '../../api/DataModels';
import LogViewer from '../LogView/LogViewer';
interface Tables {
    name: string;
    columns: string[];
}

interface CodeRecipeProps {
    tables: Tables[];
}


export const CodeRecipe: React.FC<CodeRecipeProps> = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const [code, setCode] = useState('');
    const [nodeid, setNodeId] = useState('');
    const location = useLocation();
    const { nodeId, nodeName } = location.state;
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)
    const [snackBarMsg, setSnackBarMsg] = useState<string>('')
    const [snackBarMsgType, setSnackBarMsgType] = useState<AlertProps['severity']>('info')
    const [tableColumn,setTableColumn] = useState<Tables[] | undefined>()
    const handleCloseSnackBar = () => setOpenSnackBar(false);
    const handleTabChange = (event: any, newIndex: any) => { setTabIndex(newIndex); };

    useEffect(() => {
        console.log("Inside useEffect")
        getCode()
        fetchInputNames()
    }, []);

    const fetchInputNames = async() => {

        const tableData: Tables[] = [];
        const inputNamesForSparkSql = await fetchInputData()
        const distinctData = Array.from(new Set(inputNamesForSparkSql.map(item => item.outputDatasetId)))
        .map(id => inputNamesForSparkSql.find(item => item.inputDataId === id)).filter((item): item is FlowMapping => item !== undefined);
        inputNamesForSparkSql.map((name) => {if(name.outputDatasetId == nodeId) 
        {
            console.log("========input dataset name",name.inputDatasetName)
            tableData.push({
                name: name.inputDatasetName,
                columns: ['Column1','Column2','Column3']
            })
            setTableColumn(tableData)
        }
        })
        
    }

    const getCode = useCallback(async () => {
        try {
            console.log("Node id for the code", nodeId)
            const response = await getCodeForNode(nodeId.toString());
            console.log("Got the code for the node" + response)
            setCode(response)
        } catch (error) {
            setSnackBarMsg("Could not save the code")
            setOpenSnackBar(true)
            setSnackBarMsgType("error")
        }
    }, [setCode])

    const saveCode = async () => {
        try {
            console.log("Node id for the code", nodeId)
            console.log("code", code)
            const response = await saveCodeForNode(code, nodeId.toString());
            console.log("Save Code response" + response)
            setCode(code)
            setNodeId(nodeId.toString())
            setSnackBarMsg("Code save succesfully")
            setOpenSnackBar(true)
            setSnackBarMsgType('success')
        } catch (error) {
            setSnackBarMsg("Could not save the code")
            setOpenSnackBar(true)
            setSnackBarMsgType('error')
        }
    }

    const getInputOutputNode = async () => {
            console.log("Node id for the code", nodeId)
            console.log("code", code)
            const response = await generateMappingForExecution(nodeId.toString());
    }

    const handleSaveButton = async () => {
            saveCode()
        };

    const handleRunButton = async () => {
        saveCode()
        getInputOutputNode()
        console.log({code})
        
    }
    return (
        <Box display="flex" height="100vh">
            <Box width="15%" bgcolor="#f0f0f0" padding={2}>
                <SimpleTreeView>
                    {tableColumn?.map((table, index) => (
                        <TreeItem itemId={`table-${index}`} label={table.name} key={index}>
                            {table.columns.map((column, colIndex) => (
                                <TreeItem itemId={`column-${index}-${colIndex}`} label={column} key={colIndex} />
                            ))}
                        </TreeItem>
                    ))}
                </SimpleTreeView>
            </Box>
            <Box flex={1} padding={2} >

                <Breadcrumbs aria-label="breadcrumb">

                    <Typography sx={{ color: 'text.primary' }}> / {nodeName}</Typography>
                </Breadcrumbs>
                <Tabs value={tabIndex} onChange={handleTabChange} >
                    <Tab label="Code" />
                    <Tab label="Config" />
                </Tabs>
                {tabIndex === 0 && (
                    <Box sx={{ overflow: 'auto', fontSize: '20px' }}>
                        <CodeMirror
                            value={code}

                            options={{
                                mode: 'sql',
                                theme: 'default',
                                lineNumbers: true,
                                lineWrapping: true,
                                viewportMargin: Infinity,
                                extraKeys: { 'Ctrl-Space': 'autocomplete' },
                                matchBrackets: true,
                                autoCloseBrackets: true,
                                //fontSize: '26px', // Set the font size here
                                //height: '500px'
                            }}

                            onBeforeChange={(editor, data, value) => {
                                setCode(value);
                            }}
                            className="CodeMirror"
                        />
                        <Box marginTop={2} display={'flex'}>
                            <Box mr={2}>
                                <Button variant="contained" color="success" onClick={handleSaveButton}>
                                    Save
                                </Button>

                            </Box>
                            <Box mr={2}>
                                <Button variant="contained" color="success" onClick={handleRunButton}>
                                    Run
                                </Button>

                            </Box>
<LogViewer userId='1234567'></LogViewer>
                        </Box>
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box marginTop={2}>
                        <Typography variant="body1">
                            Configuration info goes here...
                        </Typography>
                    </Box>
                )}
            </Box>
            <CommonSnackbar msg={snackBarMsg} open={openSnackBar} msgType={snackBarMsgType} handleClose={handleCloseSnackBar} />
        </Box>

    );
};



