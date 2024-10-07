import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Handle,Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Button from '@mui/material/Button';
import './UpdateNode.css';
import Box from '@mui/material/Box';
import AddDatasetModal from './AddDatasetModal';
import { saveInputData , fetchInputData,saveSparkSqlInputData } from '../../api/DataApi';
import SparkSqlModal from './SparkSqlModalProp';
import { SparkSqlInputData,FlowMapping } from '../../api/DataModels';
import SideDrawer from './SideDrawer';
import { Navigate, useNavigate } from 'react-router-dom';


const getNodeId = () => `${String(+new Date()).slice(6)}`;

 const initialNodes:{
  id: string;
  data: {
      label: string,
      nodeType: string,
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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openAddDataset, setOpenAddDataset] = useState(false);
  const [openSparkSql, setOpenSparkSql] = useState(false);
  const [openSideDrawer,setOpenSideDrawer] = useState(false)

  const handleOpenAddDataset = () => setOpenAddDataset(true);
  const handleCloseAddDataset = () => setOpenAddDataset(false);
  const [inputNames, setInputNames] = useState<FlowMapping[]>([]);
  const [distinctOutputNames, setdistinctOutputNames] = useState<FlowMapping[]>([]);

  const handleOpenSparkSql = () => {
    fetchInputNames()
    setOpenSparkSql(true);
  }
  const handleCloseSparkSql = () => setOpenSparkSql(false);



  const handleDrawerClose = () => {
    console.log("Close is called")
    setOpenSideDrawer(false);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeBg, setNodeBg] = useState('#eee');


const addNode = (node: any) => {
  setNodes((nds) => [...nds, node]);
};

const addEdge = (edge: any) => {
  setEdges((eds) => [...eds, edge]);
};

const fetchInputNames = async () => {
  setLoading(true);
  try {
    console.log("Inside FetchInputNamed from UpdateNode");
      const response = await fetchInputData()
      console.log("Fetch input names from UpdateNode",response)

      const distinctInuputDataNode = Array.from(new Set(response.map(item => item.inputDataId)))
      .map(id => response.find(item => item.inputDataId === id)).filter((item): item is FlowMapping => item !== undefined);

      const distinctOutputDataNode = Array.from(new Set(response.map(item => item.outputDatasetId)))
     .map(id => response.find(item => item.outputDatasetId === id)).filter((item): item is FlowMapping => item !== undefined);
     console.log("Fetch input names from UpdateNode with distinctData",distinctInuputDataNode)
     console.log("Fetch input names from UpdateNode with distinctOutputDataNode",distinctOutputDataNode)
      setInputNames(distinctInuputDataNode);
      setdistinctOutputNames(distinctOutputDataNode)

  } catch (error) {
      setError('Error fetching input names');
      console.error('Error fetching input names:', error);
    } finally {
      setLoading(false);
    }
};


  const handleAddDataset = useCallback(async (
    datasetName: string,
    sourceType: string,
    schemaName: string,
    tableName: string,
    fileLocation: string,
    datasetType:String
  ) => {
    try {
      await saveInputData(datasetName, sourceType, schemaName, tableName, fileLocation,datasetType);
      console.log("Adding dataset ",datasetName+"=="+sourceType+"=="+schemaName+"=="+tableName+"=="+fileLocation+"=="+datasetType)
      const newDataset = await fetchInputData()
      
    
        newDataset.forEach((dataset) => {
          const id = getNodeId();
          const backgroundColor = dataset.datasetType === 'input' ? '#eee' : '#eee'; 
          console.log(backgroundColor)
          addNode({
            id: id,
            data: { label: dataset.inputDatasetName},
            type: 'default',
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for example
            style: { backgroundColor },
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
      

      const newNodes = newDataset.map((node1) => 
         ({
        id:   node1.inputDataId.toString(),
        type: 'default',
        data: { label: node1.inputDatasetName , nodeType: node1.datasetType },
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // Adjust position as needed
        
      }));
      setNodes((nds) => [...nds, ...newNodes]);
      
 
    
      console.log('Set Nodes1:', newNodes); 


      const edges = newDataset.map((node) => ({
        
        id : `e${node.inputDataId}->${node.outputDatasetId}`,
        source : node.inputDataId.toString(),
        target : node.outputDatasetId.toString()
      }))
      console.log('Set Edges :', edges);

      edges.map((node) => {
        if(node.target != "0" ){
          addEdge(node)
        }
      })
      
      //setEdges((eds) => [...eds,...edges])

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
      navigate("/coderecipe")
    } catch (error) {
      setError('Error saving data');
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };

const onNodeClick = (event: React.MouseEvent, node: Node) => {
  console.log("Node Click Called")
  console.log(node.data.nodeType)
  //setOpenSideDrawer(true)
  if(node.data.nodeType === 'input'){
    navigate("/datarecipe")
  }
  if(node.data.nodeType === 'output'){
    navigate("/coderecipe")
  }
  
}

const handleRun = () => {
    console.log('Run button clicked');
};

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDoubleClick={onNodeClick}
      
      //onNodeClick={onNodeClick}
      defaultViewport={defaultViewport}
      //minZoom={0.2}
      //maxZoom={4}
      
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
            <SparkSqlModal open={openSparkSql} handleClose={handleCloseSparkSql} handleSubmit={handleSparkSqlSubmit} inputNamesForSparkSql={inputNames} 
            distinctOutputNamesForSparkSql={distinctOutputNames}/>
            <SideDrawer open={openSideDrawer} onClose={handleDrawerClose}/>
        </Box>
      </div>
    </ReactFlow>
  );
};

export default UpdateNode;