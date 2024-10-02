import { Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Accord from "../../components/Accordion/Accord";
import { Link } from "react-router-dom";
import JupyterNotebook from "../../components/Notebook/JupyterNotebook";

const jobs =() => {

    return(
        <>
        <NavBar></NavBar>
       <JupyterNotebook></JupyterNotebook>
        </>
    )

}

export default jobs;