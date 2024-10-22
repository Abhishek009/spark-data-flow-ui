import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CenteredLoader: React.FC = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',  // Full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  };
  
  export default CenteredLoader;