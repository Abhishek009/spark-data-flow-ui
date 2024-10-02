import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataSet , AllDataInput } from '../../api/DataModels';
import { TableFooter, TablePagination } from '@mui/material';

import { useMediaQuery, useTheme } from '@mui/material';
import TableCell from '@mui/material/TableCell';

interface Props {
    rows:AllDataInput[]
}




export default function InputTable({rows}:Props) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Paper sx={{ width: isSmallScreen ? '100%' : '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: isSmallScreen ? 300 : 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#495057', color: '#ffffff', border: '1px solid #495057' }}>DataSetName</TableCell>
              <TableCell sx={{ backgroundColor: '#495057', color: '#ffffff', border: '1px solid #495057' }}>SchemaName</TableCell>
              <TableCell sx={{ backgroundColor: '#495057', color: '#ffffff', border: '1px solid #495057' }}>TableName</TableCell>
              <TableCell sx={{ backgroundColor: '#495057', color: '#ffffff', border: '1px solid #495057' }}>FileLocation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.inputDataSetName} sx={{ backgroundColor: index % 2 === 0 ? '#EDEDE9' : '#ffffff'}}>
                <TableCell >{row.inputDataSetName}</TableCell>
                <TableCell >{row.inputSchemaName}</TableCell>
                <TableCell >{row.inputTableName}</TableCell>
                <TableCell >{row.inputFileLocation}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  
  );
}
