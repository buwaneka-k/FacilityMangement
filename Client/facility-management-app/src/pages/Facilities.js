import React, { useState, useEffect } from 'react';
import FacilitiesBasicTable from '../components/common/FacilitiesBasicTable';
import ConfirmationDialog  from '../components/common/ConfirmationDialog';
import {
  TextField,
  Button,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { getData } from '../services/getService';
import { postData } from '../services/postService';
import { putData } from '../services/putService';
import { deleteData } from '../services/deleteService';

const Facilities = () => {
  const [headers] = useState(['Facility Name', 'Location', 'Type', 'Status']);
  const[facilitesExcludedKeys] = useState(['facilityID', 'Type', 'Spaces']);
  const [spaceHeaders] = useState(['Space Name', 'Type', 'Capacity', 'Status']);
  const[spacesExcludedKeys] = useState(['spaceID', 'facilityID', 'typeID','type','assets','addSpace','edit']);
  const [rows, setRows] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    FacilityName: '',
    Location: '',
    Type: '',
    Status: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalData, setModalData] = useState([]); // Data for modal table
  const [typeOptions, setTypeOptions] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isDeleteFacilityDialogOpen, setisDeleteFacilityDialogOpen] = useState(false);
  const [isDeleteSpaceDialogOpen, setisDeleteSpaceDialogOpen] = useState(false);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [isLoading, setIsLoading] = useState(false); // Spinner state

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getData('Facilities');
        const transformedData = data.map((facility) => ({
          FacilityName: facility.facilityName,
          Location: facility.location,
          Type: facility.type, // Keep the full object for logic
          TypeName: facility.type?.typeName || "Unknown", // Use for rendering
          Status: facility.status,
          facilityID: facility.facilityID,
          Spaces:facility.spaces
        }));
        setRows(transformedData);
      } catch (error) {
        console.error('Error loading facilities:', error);
      }
    };

    const fetchTypeOptions = async () => {
      try {
        const data = await getData('Facilities/Types'); // Assuming 'FacilityTypes' is the API endpoint
        setTypeOptions(data);
      } catch (error) {
        console.error('Error loading type options:', error);
      }
    };

    fetchTypeOptions();

    fetchFacilities();
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ FacilityName: '', Location: '', Type: '', Status: '' });
  };

  const handleEditClick = (index) => {
    setIsEditing(true);
    setIsAdding(false);
    setEditIndex(index);
    const selectedRow = rows[index];
    setFormData({
      FacilityName: selectedRow.FacilityName,
      Location: selectedRow.Location,
      Type: selectedRow.Type?.typeID || "", // Set the typeID for the Select component
      Status: selectedRow.Status,
    });
  };

  const handleCancelClick = () => {
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ FacilityName: '', Location: '', Type: '', Status: '' });
  };

  const handleDeleteClick = async (index) => {
    setDeleteIndex(index);
    setisDeleteFacilityDialogOpen(true);
  };

  const handleSpaceDeleteClick = (index) => {
    setDeleteIndex(index);
    setisDeleteSpaceDialogOpen(true);
  };

  const confirmDelete = async () => {
    try{
      setIsLoading(true); 
      const updatedRows = rows.filter((_, rowIndex) => rowIndex !== deleteIndex);
      await deleteData('Facilities',rows[deleteIndex].facilityID);
      setRows(updatedRows);
      setSnackbarMessage('Facility deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
    catch(error)
    {
      setSnackbarMessage('Failed to delete facility. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    finally
    {
      setisDeleteFacilityDialogOpen(false);
      setIsLoading(false); 
    }
    
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setisDeleteFacilityDialogOpen(false);
  };

  const confirmSpaceDelete = async () => {
    try
    {
      setIsLoading(true); 
      const updatedRows = modalData.filter((_, rowIndex) => rowIndex !== deleteIndex);
    await deleteData('Spaces',modalData[deleteIndex].spaceID);
    setModalData(updatedRows);
    getAllFacilities();
    
    setSnackbarMessage('Space deleted successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
    catch(error)
    {
      setSnackbarMessage('Failed to delete space. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    finally
    {
      setisDeleteSpaceDialogOpen(false);
      setIsLoading(false); 
    }
    
  };

  const cancelSpaceDelete = () => {
    setDeleteIndex(null);
    setisDeleteSpaceDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === "Type" ? parseInt(value, 10) : value, // Ensure Type is stored as an integer
  }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isEditing) {
      const data = {
        facilityName: formData.FacilityName,
        location: formData.Location,
        typeID: formData.Type,
        status: formData.Status,
        facilityID:rows[editIndex].facilityID
      };
      try{
        await putData('Facilities/',rows[editIndex].facilityID, data);
        setSnackbarMessage('Facility updating successfull.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
      catch(error)
      {
        setSnackbarMessage('Facility updating failed.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
      finally
      {
        setIsAdding(false);
        setIsEditing(false);
        setFormData({ FacilityName: '', Location: '', Type: '', Status: '' });
        setIsLoading(false);
        getAllFacilities();
      }
    } else {
      const data = {
        facilityName: formData.FacilityName,
        location: formData.Location,
        typeID: formData.Type,
        status: formData.Status,
      };
      try{
        await postData('Facilities', data);
        setSnackbarMessage('Facility saved successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
      catch(error)
      {
        setSnackbarMessage('Facility saving failed.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
      finally
      {
        setIsAdding(false);
        setIsEditing(false);
        setFormData({ FacilityName: '', Location: '', Type: '', Status: '' });
        setIsLoading(false);
        getAllFacilities();
      }
    }
  };

  const getAllFacilities = async () => {
    try {
      setIsLoading(true);
      const data = await getData('Facilities');
      const transformedData = data.map((facility) => ({
        FacilityName: facility.facilityName,
          Location: facility.location,
          Type: facility.type, // Keep the full object for logic
          TypeName: facility.type?.typeName || "Unknown", // Use for rendering
          Status: facility.status,
          facilityID: facility.facilityID,
          Spaces:facility.spaces
      }));
      setRows(transformedData);
    } catch (error) {
      console.error('Error loading facilities:', error);
    }
    finally
    {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (index) => {
    // Load modal data here if needed
    const selectedRow = rows[index].Spaces;
    const transformedData = selectedRow.map((space) => ({
      spaceID: space.spaceID,
      facilityID: space.facilityID,
      SpaceName: space.spaceName, // Keep the full object for logic
      TypeName: space.type?.typeName || "Unknown", 
      typeID:space.type?.typeID || 0,
      Capacity:space.capacity,
      Status: space.status,
      assets:space.assets
    }));
    setModalData(transformedData); // Assuming you want to show the same rows in the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box p={2}>
      {isAdding || isEditing ? (
        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleFormSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Facility Name"
                name="FacilityName"
                value={formData.FacilityName}
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
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="Type"
                  value={formData.Type}
                  onChange={handleInputChange}
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option.typeID} value={option.typeID}>
                      {option.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <Button
                  sx={{ backgroundColor: '#565353' }}
                  variant="contained"
                  color="secondary"
                  onClick={handleCancelClick}
                >
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
            <Button
              sx={{ backgroundColor: '#565353' }}
              variant="contained"
              color="primary"
              onClick={handleAddClick}
            >
              Add Facility
            </Button>
          </Box>

          <FacilitiesBasicTable headers={headers} rows={rows} excludedKeys={facilitesExcludedKeys} onEdit={handleEditClick} onDelete={handleDeleteClick} onSelect={handleOpenModal} />
        </>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Spaces</DialogTitle>
        <DialogContent>
          <FacilitiesBasicTable headers={spaceHeaders} rows={modalData} excludedKeys={spacesExcludedKeys} onDelete={handleSpaceDeleteClick} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={isDeleteFacilityDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this facility? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <ConfirmationDialog
        open={isDeleteSpaceDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this space? This action cannot be undone."
        onConfirm={confirmSpaceDelete}
        onCancel={cancelSpaceDelete}
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

export default Facilities;
