import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { getData } from '../services/getService';

const Spaces = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
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
      width: 100
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
      renderCell: (params) => params?.row?.type?.typeName || 'N/A'
    },
    {
      field: 'capacity',
      headerName: 'Capacity',
      width: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={(e) => handleEditClick(e, params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(e) => handleDeleteClick(e, params.row.spaceID)}
        />]
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

  const handleEditClick = (e, row) => {
    e.preventDefault();
    console.log(row);
    // setIsEditing(true);
    // setIsAdding(false);
    // setEditIndex(index);
    // setFormData(rows[index]);
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ 'Space Name': '', 'Facility Name': '', Type: '', Area: '' });
  };

  const handleDeleteClick = (e, spaceId) => {
    e.preventDefault();
    console.log(spaceId);
    //do whatever you want with the row
    // const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    // setRows(updatedRows);
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
            disableMultipleSelection={true}
          />
        </>
      )}
    </Box>
  );
};

export default Spaces;
