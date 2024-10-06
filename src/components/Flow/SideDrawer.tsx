import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

type Anchor = 'right';

interface SideDrawerProps {
    open: boolean;
    onClose: () => void;
}


const SideDrawer : React.FC<SideDrawerProps> = ({ open, onClose }) => {

    const [state, setState] = useState(false);

   

    const list = (anchor: Anchor) => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={onClose}
          onKeyDown={onClose}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
         
        </Box>
      );

      return (
        <div style={{ position: 'relative', height: '100vh' }}>
        
        <Drawer
           anchor="right"
           open={open}
           onClose={onClose}
           
        >
          {list('right')}
        </Drawer>
      </div>
      );

}

export default SideDrawer