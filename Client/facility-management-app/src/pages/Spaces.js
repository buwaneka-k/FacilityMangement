import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmationDialog from '../components/common/ConfirmationDialog';
import { getData } from '../services/getService';
import { deleteData } from '../services/deleteService';

const Spaces = () => {
  const [rows, setRows] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
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
      width: 200
    },
    {
      field: 'spaceName',
      headerName: 'Space Name',
      width: 200
    },
    {
      field: 'typeName',
      headerName: 'Type',
      width: 200,
      renderCell: (params) => params?.row?.type?.typeName || 'N/A'
    },
    {
      field: 'capacity',
      headerName: 'Capacity',
      width: 200
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
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

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false); // Spinner state

  useEffect(() => {
    setIsLoading(true);
    // Calling the service method when the component mounts
    const listData = async () => {
      try {
        const result = await getData("Spaces");
        setRows(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
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
    //setDeleteIndex(index);
    setIsDeleteDialogOpen(true);

    //do whatever you want with the row
    // const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    // setRows(updatedRows);
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setIsDeleteDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      //const updatedRows = rows.filter((_, rowIndex) => rowIndex !== deleteIndex);
      await deleteData('Spaces', rows[deleteIndex].spaceID);
      setRows(updatedRows);
      setSnackbarMessage('Space deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
    catch (error) {
      setSnackbarMessage('Failed to delete space. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    finally {
      setIsDeleteDialogOpen(false);
      setIsLoading(false);
    }

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

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this facility? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default Spaces;
