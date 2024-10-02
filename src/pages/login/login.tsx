import { Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Accord from "../../components/Accordion/Accord";
import { Link } from "react-router-dom";
import Login from "../../components/Login/Login";

const login =() => {

    return(
        <>
        {/* <NavBar></NavBar> */}
        {/* <Box sx={{ mt: 4 }}>
        <Link to="/dashboard">Login</Link>
        </Box> */}
        <Login></Login>
        </>
    )

}

export default login;