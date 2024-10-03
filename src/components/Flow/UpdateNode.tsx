import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Button from '@mui/material/Button';
import './UpdateNode.css';
import Box from '@mui/material/Box';
import AddDatasetModal from './AddDatasetModal';
import { saveInputData , fetchInputData,saveSparkSqlInputData } from '../../api/DataApi';
import SparkSqlModal from './SparkSqlModalProp';
import { SparkSqlInputData,FlowMapping } from '../../api/DataModels';


const getNodeId = () => `${String(+new Date()).slice(6)}`;
 const initialNodes:{
  id: string;
  data: {
      label: string;
  };
  position: {
      x: number;
      y: number;
  };
}[] = [];

 const initialEdges:{
  id: string;
  source: string;
  target: string;
}[] = [];

const defaultViewport = { x: 0, y: 0, zoom: .5 };

const UpdateNode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openAddDataset, setOpenAddDataset] = useState(false);
  const [openSparkSql, setOpenSparkSql] = useState(false);
  const handleOpenAddDataset = () => setOpenAddDataset(true);
  const handleCloseAddDataset = () => setOpenAddDataset(false);

  const handleOpenSparkSql = () => setOpenSparkSql(true);
  const handleCloseSparkSql = () => setOpenSparkSql(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  //const [nodeName, setNodeName] = useState('Node 1');
//  const [nodeBg, setNodeBg] = useState('#eee');
//  const [nodeHidden, setNodeHidden] = useState(false);

const addNode = (node: any) => {
  setNodes((nds) => [...nds, node]);
};

const addEdge = (edge: any) => {
  setEdges((eds) => [...eds, edge]);
};



  const handleAddDataset = useCallback(async (
    datasetName: string,
    sourceType: string,
    schemaName: string,
    tableName: string,
    fileLocation: string
  ) => {
    try {
      await saveInputData(datasetName, sourceType, schemaName, tableName, fileLocation);
      const newDataset = await fetchInputData()
      
        newDataset.forEach((dataset) => {
          const id = getNodeId();
          addNode({
            id: id,
            data: { label: dataset.inputDatasetName },
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for example
          });
        });
      
        handleCloseAddDataset();
    } catch (error) {
      console.error('Error adding dataset:', error);
    }
  }, [setNodes]);



  const fetchDatasets = async () => {
    try {
      console.log("in fetch dataset")
      const newDataset = await fetchInputData() // Replace with your API endpoint
      console.log('Fetched Nodes:', newDataset); 
      

      const newNodes = newDataset.map((node) => ({
        id:   node.inputDataId.toString(),
        data: { label: node.inputDatasetName },
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // Adjust position as needed
      }));
      setNodes((nds) => [...nds, ...newNodes]);
      
      
      const newNodes2 = newDataset.map((node) => ({
        id:   node.outputDatasetId.toString(),
        data: { label: node.outputDatasetName },
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // Adjust position as needed
      }));

      newNodes2.map((node) => {
        if(node.id != "out_"){
          addNode(node)
        }
      })
      console.log('Set Nodes1:', newNodes); 
      console.log('Set Nodes2:', newNodes2); 

      const edges = newDataset.map((node) => ({
        id : `e${node.inputDataId}->${node.outputDatasetId}`,
        source : node.inputDataId.toString(),
        target : node.outputDatasetId.toString()
      }))
      console.log('Set Edges :', edges);

      setEdges((eds) => [...eds,...edges])

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   useEffect(() => {
     console.log("in useEffect")
     fetchDatasets();
   }, []);

 
   const handleSparkSqlSubmit = async (data: SparkSqlInputData) => {
    setLoading(true);
    setError(null);
    console.log("InputOutMapping Data",data)
    try {
      const response = await saveSparkSqlInputData(data);
      const id=getNodeId()
      const newNode = {
        id: id,
        data: { label: data.outputDataset },
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for example
      };
      addNode(newNode);
      data.selectedInputNames.forEach((inputName: string) => {
        addEdge({ id: `e${inputName}-id`, source: inputName, target: id });
      });

      handleCloseSparkSql();
    } catch (error) {
      setError('Error saving data');
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };



const handleRun = () => {
    console.log('Run button clicked');
};


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
      fitView
      fitViewOptions={{ padding: 0.5 }}
    >
      <div className="updatenode__controls">
      <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100vh',
                padding: '10px',
                gap: '10px',
            }}
        >
            <Button
                variant="contained"
                fullWidth
                onClick={handleOpenAddDataset}
                sx={{ minWidth: '150px' }}
            >
                Add Dataset
            </Button>
            <Button
                variant="contained"
                fullWidth
                onClick={handleOpenSparkSql}
                sx={{ minWidth: '150px' }}
            >
                Spark SQL
            </Button>
            <Button
                variant="contained"
                fullWidth
                onClick={handleRun}
                sx={{ minWidth: '150px' }}
            >
                Run
            </Button>

            
            <AddDatasetModal open={openAddDataset} handleClose={handleCloseAddDataset} handleAddDataset={handleAddDataset} />
            <SparkSqlModal open={openSparkSql} handleClose={handleCloseSparkSql} handleSubmit={handleSparkSqlSubmit} />
        </Box>
      </div>
    </ReactFlow>
  );
};

export default UpdateNode;