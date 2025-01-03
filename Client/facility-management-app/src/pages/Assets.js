import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasicTable from '../components/common/BasicTable';
import { TextField, Button, Box, Paper, Snackbar, Alert, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getData } from '../services/getService';

const Assets = () => {
  const [headers] = useState(['Space ID', 'Asset Name', 'Category', 'Purchase Date', 'Warranty Expiry Date', 'Condition', 'Status']);
  const [rows, setRows] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    'Space ID': '',
    'Asset Name': '',
    'Category': '',
    'Purchase Date': '',
    'Warranty Expiry Date': '',
    'Condition': '',
    'Status': ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set a default number of rows per page

  // Dialog state for confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch assets from the API when the component mounts
  useEffect(() => {
    const listData = async () => {
      try {
        const result = await getData("Assets");
        setRows(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    listData();
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({});
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setIsAdding(false);
    setEditIndex(index);

    console.log('Editing row at index: ' + index);

    // Check if the row at the given index exists
    if (rows[index]) {
      console.log('Row data:', rows[index]);
      // Set form data based on the selected row
      setFormData(rows[index]
      );
    } else {
      console.error('No data found for the index:', index);
    }
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setIsEditing(false);
    setFormData({
      'Space ID': '',
      'Asset Name': '',
      'Category': '',
      'Purchase Date': '',
      'Warranty Expiry Date': '',
      'Condition': '',
      'Status': ''
    });
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    const assetId = rows[deleteIndex].assetID;  // Assuming each asset has an 'id' property
    try {
      await axios.delete(`https://localhost:44313/api/Assets/${assetId}`);  // Replace with your API endpoint
      const updatedRows = rows.filter((_, rowIndex) => rowIndex !== deleteIndex);
      setRows(updatedRows);

      setSnackbarMessage('Asset deleted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting asset:', error);
      setSnackbarMessage('Error deleting asset!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
    setOpenDeleteDialog(false); // Close the confirmation dialog
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); // Close the confirmation dialog
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    try {
      if (isEditing) {
        // Update an existing asset
        // Replace with your API endpoint
        await axios.put(`https://localhost:44313/api/Assets/${rows[editIndex].assetID}`, formData);
        const updatedRows = [...rows];
        updatedRows[editIndex] = formData;
        setRows(updatedRows);

        setSnackbarMessage('Asset updated successfully!');
      } else {
        // Add a new asset
        const response = await axios.post('https://localhost:44313/api/Assets', formData);  // Replace with your API endpoint
        setRows((prevRows) => [...prevRows, response.data]);

        setSnackbarMessage('Asset added successfully!');
      }
      setSnackbarSeverity('success');
      setOpenSnackbar(true); // Show the success message
    } catch (error) {
      console.error('Error saving asset:', error);
    }
    setIsAdding(false);
    setIsEditing(false);
    setFormData({
      'Space ID': '',
      'Asset Name': '',
      'Category': '',
      'Purchase Date': '',
      'Warranty Expiry Date': '',
      'Condition': '',
      'Status': ''
    });
  };


  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page is changed
  };

  // Slice the rows array to show only the current page's rows
  const currentRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <Box p={2}>
      {(isAdding || isEditing) ? (
        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleFormSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Space ID"
                name="spaceID"
                value={formData['spaceID']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Asset Name"
                name="assetName"
                value={formData['assetName']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Category"
                name="category"
                value={formData['category']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Purchase Date"
                name="purchaseDate"
                value={formData['purchaseDate']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Warranty Expiry Date"
                name="warrantyExpiry"
                value={formData['warrantyExpiry']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Condition"
                name="condition"
                value={formData['condition']}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Status"
                name="status"
                value={formData['status']}
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
              Add Asset
            </Button>
          </Box>

          <BasicTable
            headers={headers}
            rows={currentRows}  // Only display rows for the current page
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Pagination Component */}
          <TablePagination
            component="div"
            count={rows.length}  // Total number of rows
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} // Allow user to select rows per page
          />

        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Automatically hide after 3 seconds
        onClose={() => setOpenSnackbar(false)} // Close Snackbar
        anchorOrigin={{
          vertical: 'top',    // Position at the top of the screen
          horizontal: 'center' // Position at the center of the screen
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this asset?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );

};

export default Assets;
