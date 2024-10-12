import * as React from 'react';
import '@xyflow/react/dist/style.css';
import { Alert, AlertProps} from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface msgProps {
    msg:String;
    open:boolean;
    msgType: AlertProps['severity'];
    handleClose:() => void;
    
}

export const CommonSnackbar:(React.FC<msgProps>)=({msg,open,msgType,handleClose}) =>{
    return(
        <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
            onClose={handleClose}
            severity={msgType}
            sx={{width: '100%'}}
            >{msg}</Alert>
        </Snackbar>
        </>
    )
}

export default CommonSnackbar;