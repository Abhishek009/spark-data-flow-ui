import { Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Accord from "../../components/Accordion/Accord";
import { Link } from "react-router-dom";

const login =() => {

    return(
        <>
        <NavBar></NavBar>
        <Box sx={{ mt: 4 }}>
        <Link to="/dashboard">Login</Link>
        </Box>
        </>
    )

}

export default login;