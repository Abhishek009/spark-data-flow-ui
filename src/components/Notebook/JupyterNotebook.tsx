import { Container } from "@mui/material"


const JupyterNotebook = () => {

    return(
<Container>
    <iframe src="http://localhost:8090/notebooks/Untitled.ipynb?token=07d439bf3f803c7d089fa0360c59d4c797e48a89b138c90c" width="100%" height="800px"></iframe>
</Container>
    )
}

export default JupyterNotebook