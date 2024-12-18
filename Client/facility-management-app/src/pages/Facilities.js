import React, { useState } from 'react';
import BasicTable from '../components/common/BasicTable';
import { TextField, Button, Box, Paper } from '@mui/material';

const Facilities = () => {
    const [headers] = useState(['Facility Name', 'Location', 'Type', 'Status']);
    const [rows, setRows] = useState([
      { 'Facility Name': 'Gym', Location: 'New York', Type: 'Fitness', Status: 'Open' },
      { 'Facility Name': 'Library', Location: 'London', Type: 'Study', Status: 'Closed' },
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
      'Facility Name': '',
      Location: '',
      Type: '',
      Status: '',
    });
  
    const handleAddClick = () => {
      setIsAdding(true);
      setIsEditing(false);
      setFormData({ 'Facility Name': '', Location: '', Type: '', Status: '' });
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
      setFormData({ 'Facility Name': '', Location: '', Type: '', Status: '' });
    };
    const handleDeleteClick=(index)=>{
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
      setFormData({ 'Facility Name': '', Location: '', Type: '', Status: '' });
    };
  
    return (
      <Box p={2}>
        {(isAdding || isEditing) ? (
          <Paper sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleFormSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Facility Name"
                  name="Facility Name"
                  value={formData['Facility Name']}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  label="Location"
                  name="Location"
                  value={formData.Location}
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
                  label="Status"
                  name="Status"
                  value={formData.Status}
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
              <h2>Facilities</h2>
              <Button sx={{ backgroundColor: '#565353' }} variant="contained" color="primary" onClick={handleAddClick}>
                Add Facility
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
  
  export default Facilities;
  