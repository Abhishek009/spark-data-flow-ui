import React, { useState } from 'react';
import { Box, Breadcrumbs, Button, Link, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/sql/sql';
import './CodeRecipe.css'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { saveCode } from '../../api/DataApi';
import { useLocation } from 'react-router-dom';

interface Table {
    name: string;
    columns: string[];
}

interface CodeRecipeProps {
    tables: Table[];
}


export const CodeRecipe: React.FC<CodeRecipeProps> = ({ tables }) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [code, setCode] = useState('SELECT * FROM users WHERE id = 1;');
    const location = useLocation();
    const { nodeId,nodeName } = location.state;
    
    const handleTabChange = (event: any, newIndex: any) => {
        setTabIndex(newIndex);
    };

    const handleSubmit = async () => {
        try {
            console.log("Node id for the code",nodeId)
            const response = await saveCode(code,nodeId);
            console.log("Save Code response"+response)
          
        } catch (error) {
          alert('An error occurred while saving the code.');
        }
      };

    return (
        <Box display="flex" height="100vh">
            <Box width="15%" bgcolor="#f0f0f0" padding={2}>
                <SimpleTreeView>
                    {tables.map((table, index) => (
                        <TreeItem itemId={`table-${index}`} label={table.name} key={index}>
                            {table.columns.map((column, colIndex) => (
                                <TreeItem itemId={`column-${index}-${colIndex}`} label={column} key={colIndex} />
                            ))}
                        </TreeItem>
                    ))}
                </SimpleTreeView>
            </Box>
            <Box flex={1} padding={2} >
                {/* Tabs on the right side
            <Box display="flex" justifyContent="flex-end">
                <Tabs value={tabIndex} onChange={handleTabChange} >
                    <Tab label="Code" />
                    <Tab label="Config" />
                </Tabs>
                </Box> */}
<Breadcrumbs aria-label="breadcrumb">
  
  <Typography sx={{ color: 'text.primary' }}> / {nodeName}</Typography>
</Breadcrumbs>
                <Tabs value={tabIndex} onChange={handleTabChange} >
                    <Tab label="Code" />
                    <Tab label="Config" />
                </Tabs>
                {tabIndex === 0 && (
                    <Box sx={{   overflow:'auto', fontSize: '20px' }}>
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
                                height: '500px'
                            }}

                            onBeforeChange={(editor, data, value) => {
                                setCode(value);
                            }}
                            className="CodeMirror"
                        />
                        <Box marginTop={2}>
                            <Button variant="contained" color="success" onClick={handleSubmit}>
                                Save & Run
                            </Button>
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
        </Box>

    );
};



