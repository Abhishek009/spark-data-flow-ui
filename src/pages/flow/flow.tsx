import { Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Accord from "../../components/Accordion/Accord";
import { Link } from "react-router-dom";
import UpdateNode from "../../components/Flow/UpdateNode";
import { Height } from "@mui/icons-material";

const flow =() => {

    return(
        <>
        <NavBar></NavBar>
        <div style={{ height: 800 }}><UpdateNode></UpdateNode></div>
        
        </>
    )

}

export default flow;