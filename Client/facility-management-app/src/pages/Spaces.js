import React, { useState } from 'react';
import BasicTable from '../components/common/BasicTable';
import { TextField, Button, Box, Paper } from '@mui/material';

const Spaces = () => {
  const [headers] = useState(['Space Name', 'Facility Name', 'Type', 'Area']);
  const [rows, setRows] = useState([
    { 'Space Name': 'Rest Area', 'Facility Name': 'Gym', Type: 'Fitness', Area: '200 ft' },
    { 'Space Name': 'Librarian Office', 'Facility Name': 'Library', Type: 'Study', Area: '100 ft' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    'Space Name': '',
    'Facility Name': '',
    Type: '',
    Area: '',
  });

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ 'Space Name': '', 'Facility Name': '', Type: '', Area: '' });
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
    setFormData({ 'Space Name': '', 'Facility Name': '', Type: '', Area: '' });
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
    setFormData({ 'Space Name': '', 'Facility Name': '', Type: '', Area: '' });
  };

  return (
    <Box p={2}>
      {(isAdding || isEditing) ? (
        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleFormSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Space Name"
                name="Space Name"
                value={formData['Space Name']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Facility Name"
                name="Facility Name"
                value={formData['Facility Name']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Type"
                name="Type"
                value={formData.Type}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Area"
                name="Area"
                value={formData.Area}
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
            <h2>Spaces</h2>
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

export default Spaces;
