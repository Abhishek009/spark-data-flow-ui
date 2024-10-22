import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Handle, Node, Edge } from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js';
import '@xyflow/react/dist/style.css';

import './UpdateNode.css';

import AddDatasetModal from './AddDatasetModal';
import { saveInputData, fetchInputData, saveSparkSqlInputData } from '../../api/DataApi';
import SparkSqlModal from './SparkSqlModalProp';
import { SparkSqlInputData, FlowMapping } from '../../api/DataModels';
import SideDrawer from './SideDrawer';
import { Navigate, useNavigate } from 'react-router-dom';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button, CircularProgress } from '@mui/material';
import CenteredLoader from '../CenteredLoader/CenteredLoader';

const getNodeId = () => `${String(+new Date()).slice(6)}`;

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};



const initialNodes: {
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

const initialEdges: {
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
  //const [openSideDrawer, setOpenSideDrawer] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const handleOpenAddDataset = () => setOpenAddDataset(true);
  const handleCloseAddDataset = () => setOpenAddDataset(false);
  const [inputNames, setInputNames] = useState<FlowMapping[]>([]);
  const [distinctOutputNames, setdistinctOutputNames] = useState<FlowMapping[]>([]);

  const handleOpenSparkSql = () => {
    fetchInputNames()
    setOpenSparkSql(true);
  }
  const handleCloseSparkSql = () => setOpenSparkSql(false);



  // const handleDrawerClose = () => {
  //   console.log("Close is called")
  //   setOpenSideDrawer(false);
  // };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //const [nodeBg, setNodeBg] = useState('#eee');


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
      console.log("Fetch input names from UpdateNode", response)

      const distinctInuputDataNode = Array.from(new Set(response.map(item => item.inputDataId)))
        .map(id => response.find(item => item.inputDataId === id)).filter((item): item is FlowMapping => item !== undefined);

      const distinctOutputDataNode = Array.from(new Set(response.map(item => item.outputDatasetId)))
        .map(id => response.find(item => item.outputDatasetId === id)).filter((item): item is FlowMapping => item !== undefined);
      console.log("Fetch input names from UpdateNode with distinctData", distinctInuputDataNode)
      console.log("Fetch input names from UpdateNode with distinctOutputDataNode", distinctOutputDataNode)
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
    datasetType: String
  ) => {
    try {
      await saveInputData(datasetName, sourceType, schemaName, tableName, fileLocation, datasetType, "", "");
      console.log("Adding dataset ", datasetName + "==" + sourceType + "==" + schemaName + "==" + tableName + "==" + fileLocation + "==" + datasetType)
      const newDataset = await fetchInputData()


      newDataset.forEach((dataset) => {
        const id = getNodeId();
        const backgroundColor = dataset.datasetType === 'input' ? '#eee' : '#eee';
        console.log(backgroundColor)
        addNode({
          id: id,
          data: { label: dataset.inputDatasetName },
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
      setLoading(true);
      console.log("in fetch dataset")
      const newDataset = await fetchInputData()
      console.log('Fetched Nodes:', newDataset);


      const newNodes = newDataset.map((node1) =>
      ({
        id: node1.inputDataId.toString(),
        type: 'default',
        data: { label: node1.inputDatasetName, nodeType: node1.datasetType },
        position: { x: Math.random() * 400, y: Math.random() * 400 },

      }));
      setNodes((nds) => [...nds, ...newNodes]);



      console.log('Set Nodes1:', newNodes);


      const edges = newDataset.map((node) => ({

        id: `e${node.inputDataId}->${node.outputDatasetId}`,
        source: node.inputDataId.toString(),
        target: node.outputDatasetId.toString()
      }))
      console.log('Set Edges :', edges);

      edges.map((node) => {
        if (node.target != "0") {
          addEdge(node)
        }
      })
      setLoading(false);
      //setEdges((eds) => [...eds,...edges])

    } catch (error) {
      setLoading(true);
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
    console.log("InputOutMapping Data", data)
    try {
      const response = await saveSparkSqlInputData(data);
      const id = getNodeId()
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
      if (data.outputDataset.match("compute")) {
        navigate("/coderecipe", { state: { nodeId: data.id, nodeName: data.outputDataset } })
      }

    } catch (error) {
      setError('Error saving data');
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    console.log("Node Click Called ", node)
    console.log("node.data.nodeType ", node.data.nodeType)
    console.log("node.data.id ", node.id)
    const parentNode = nodes.find(n => n.id === node.parentId);
    if (parentNode) {
      console.log("Parent node info:", parentNode);
    }

    if (node.data.nodeType === 'input' || node.data.nodeType === 'output') {
      navigate("/datarecipe")
    }
    if (node.data.nodeType === 'compute') {
      navigate("/coderecipe", { state: { nodeId: node.id, nodeName: node.data.label } })
    }

  }

  const handleRun = () => {
    console.log('Run button clicked');
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  // Code to remove the node and its edges
  const removeSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
      setSelectedNode(null);
    }
  };

  return (
    <>
    
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDoubleClick={onNodeDoubleClick}
      onNodeClick={onNodeClick}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}

      attributionPosition="bottom-left"
      fitView
      fitViewOptions={{ padding: 0.5 }}
    >
      {loading? (
          <CenteredLoader />
        ) : (
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
            {/* <IconButton
              onClick={handleOpenAddDataset}
              sx={{ minWidth: '100px' }}
              color="primary"
            >
              <AddTwoToneIcon />
            </IconButton> */}
  
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
              <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={removeSelectedNode}
                  sx={{ minWidth: '150px' }}
              >
                  Delete
              </Button>
              
  
            <AddDatasetModal open={openAddDataset} handleClose={handleCloseAddDataset} handleAddDataset={handleAddDataset} />
            <SparkSqlModal open={openSparkSql} handleClose={handleCloseSparkSql} handleSubmit={handleSparkSqlSubmit} inputNamesForSparkSql={inputNames}
              distinctOutputNamesForSparkSql={distinctOutputNames} />
  
          </Box>
        </div>
        )}
      
     
    </ReactFlow>
    </>
  );
};

export default UpdateNode;