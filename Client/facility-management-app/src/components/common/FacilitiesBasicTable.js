import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddHomeIcon from '@mui/icons-material/AddHome';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#565353', // Darker background
    color: theme.palette.common.white, // White text
    fontWeight: 'bold',
  }));

const FacilitiesBasicTable = ({ headers, rows, onEdit, onDelete,onSelect, excludedKeys }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
            {!excludedKeys.includes('actions') && (
            <StyledTableCell>Actions</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
  {rows.map((row, rowIndex) => (
    <TableRow key={rowIndex}>
      {Object.entries(row)
    .filter(([key]) => !excludedKeys.includes(key)) // Exclude keys dynamically
    .map(([_, cellValue], cellIndex) => (
      <TableCell key={cellIndex}>{cellValue}</TableCell>
    ))}
      {/* Action Buttons */}
      <TableCell>
      {!excludedKeys.includes('edit') && (
        <Button
          sx={{ border: 'none' }}
          variant="outlined"
          color="primary"
          onClick={() => onEdit(rowIndex)}
        >
          <ModeEditIcon sx={{ color: 'black' }} />
        </Button>
      )}
        {!excludedKeys.includes('addSpace') && (
        <Button
          sx={{ border: 'none' }}
          variant="outlined"
          color="primary"
          onClick={() => onSelect(rowIndex)}
        >
          <AddHomeIcon sx={{ color: 'black' }} />
        </Button>
        )}

        {!excludedKeys.includes('delete') && (
        <Button
          sx={{ border: 'none' }}
          variant="outlined"
          color="primary"
          onClick={() => onDelete(rowIndex)}
        >
          <DeleteIcon sx={{ color: 'black' }} />
        </Button>
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
  );
};

export default FacilitiesBasicTable;
