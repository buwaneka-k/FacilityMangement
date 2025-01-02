import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getData } from '../services/getService';

const Spaces = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    'Space Name': '',
    'Facility Name': '',
    Type: '',
    Area: '',
  });

  const columns = [
    {
      field: 'spaceID',
      headerName: 'Space ID',
      width: 90
    },
    {
      field: 'spaceName',
      headerName: 'Space Name',
      width: 150
    },
    {
      field: 'typeName',
      headerName: 'Type',
      width: 150,
      valueGetter: (params) => params?.row?.type?.typeName || 'N/A'
    },
    {
      field: 'capacity',
      headerName: 'Capacity',
      width: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110
    }
  ];

  useEffect(() => {
    // Calling the service method when the component mounts
    const listData = async () => {
      try {
        const result = await getData("Spaces");
        setRows(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    listData();
  }, []);

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

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row.spaceID}
            pageSizeOptions={[5]}
          />
        </>
      )}
    </Box>
  );
};

export default Spaces;
