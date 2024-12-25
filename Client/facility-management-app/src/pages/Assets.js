import React, { useState } from 'react';
import BasicTable from '../components/common/BasicTable';
import { TextField, Button, Box, Paper } from '@mui/material';

const Assets = () => {
  const [headers] = useState(['Asset Name', 'Category', 'Warranty Expiry Date', 'Condition']);
  const [rows, setRows] = useState([
    { 'Asset Name': 'Projector', 'Category': 'Electronics', 'Warranty Expiry Date': '2030/01/01', 'Condition': 'New' },
    { 'Asset Name': 'Monitor', 'Category': 'Electronics', 'Warranty Expiry Date': '2030/01/01', 'Condition': 'New' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    'Asset Name': '',
    'Category': '',
    'Warranty Expiry Date': '',
    'Condition': '',
  });

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ 'Asset Name': '', 'Category': '', 'Warranty Expiry Date': '', 'Condition': '' });
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setIsAdding(false);
    setEditIndex(index);
    setFormData(rows[index]);
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ 'Asset Name': '', 'Category': '', 'Warranty Expiry Date': '', 'Condition': '' });
  };
  const handleDeleteClick = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[editIndex] = formData;
        return updatedRows;
      });
    } else {
      setRows((prevRows) => [...prevRows, formData]);
    }
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ 'Asset Name': '', 'Category': '', 'Warranty Expiry Date': '', 'Condition': '' });
  };

  return (
    <Box p={2}>
      {(isAdding || isEditing) ? (
        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleFormSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Asset Name"
                name="Asset Name"
                value={formData['Asset Name']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Category"
                name="Category"
                value={formData['Category']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Warranty Expiry Date"
                name="Warranty Expiry Date"
                value={formData['Warranty Expiry Date']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Condition"
                name="Condition"
                value={formData['Condition']}
                onChange={handleInputChange}
                required
              />
              <Box display="flex" justifyContent="space-between">
                <Button sx={{ backgroundColor: '#565353' }} variant="contained" color="primary" type="submit">
                  {isEditing ? 'Save' : 'Save'}
                </Button>
                <Button sx={{ backgroundColor: '#565353' }} variant="contained" color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <h2>Assets</h2>
            <Button sx={{ backgroundColor: '#565353' }} variant="contained" color="primary" onClick={handleAddClick}>
              Add Space
            </Button>
          </Box>

          <BasicTable
            headers={headers}
            rows={rows}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </>
      )}
    </Box>
  );
};

export default Assets;
