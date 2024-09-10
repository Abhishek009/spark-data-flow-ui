
import { Box } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Accord from "../../components/Accordion/Accord";

const dashboard =() => {

    return(
        <>
        <NavBar></NavBar>
        <Box sx={{ mt: 4 }}>
        <Accord />
        </Box>
        </>
    )

}

export default dashboard;