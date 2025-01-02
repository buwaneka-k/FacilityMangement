import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#565353', // Darker background
    color: theme.palette.common.white, // White text
    fontWeight: 'bold',
  }));

const BasicTable = ({ headers, rows, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
              <TableCell>
                <Button sx={{ border: 'none' }}
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(rowIndex)}
                >
                  <ModeEditIcon sx={{ color: 'black' }}/>
                </Button>
                <Button sx={{ border: 'none' }}
                  variant="outlined"
                  color="primary"
                  onClick={() => onDelete(rowIndex)}
                >
                  <DeleteIcon sx={{ color: 'black' }}/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
