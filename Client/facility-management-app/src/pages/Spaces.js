import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'

import { getData } from '../services/getService';
import { deleteData } from '../services/deleteService';

const Spaces = () => {
  const [rows, setRows] = useState([]);
  const [types, setTypes] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    SpaceName: '',
    Facility: '',
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

  useEffect(() => {
    // Calling the service method when the component mounts
    const listData = async () => {
      try {
        const result = await getData("Spaces");
        setRows(result);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    const listFacilities = async () => {
      try {
        const result = await getData("Facilities");
        setFacilities(result);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    const listTypes = async () => {
      try {
        const data = await getData('Facilities/Types');
        const spaceTypes = data.filter((t) => t.tableName === "Spaces");
        setTypes(spaceTypes);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    listData();
    listTypes();
    listFacilities();
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ SpaceName: '', Facility: '', Type: '', Area: '' });
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
    setFormData({ SpaceName: '', Facility: '', Type: '', Area: '' });
  };

  const handleDeleteClick = async (e, spaceId) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to proceed?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Save",
      denyButtonText: "Cancel"
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          await deleteData('Spaces', spaceId);
          Swal.fire("Space deleted successfully", "", "success");
        }
        catch (error) {
          Swal.fire("Failed to delete space. Please try again", "", "error");
        }
        finally {
          //loading
        }
      }
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Type" || name === "Facility" ? parseInt(value, 10) : value, // Ensure Type is stored as an integer
    }));
  };

  const handleFormSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if (isEditing) {
      const data = {
        spaceName: formData.SpaceName,
        facilityID: formData.Facility,
        typeID: formData.Type,
        capacity: formData.Area
      };

      try{
        await putData('Spaces/',rows[editIndex].facilityID, data);
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
      setRows((prevRows) => [...prevRows, formData]);
    }
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ SpaceName: '', Facility: '', Type: '', Area: '' });
  };

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, Facility: event.target.value }));
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
              <FormControl fullWidth required>
                <InputLabel>Facility Name</InputLabel>
                <Select
                  name="Facility Name"
                  value={formData['Facility Name']}
                  onChange={handleInputChange}
                >
                  {facilities.map((option) => (
                    <MenuItem key={option.facilityID} value={option.facilityID}>
                      {option.facilityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="Type"
                  value={formData.Type}
                  onChange={handleInputChange}
                >
                  {types.map((option) => (
                    <MenuItem key={option.typeID} value={option.typeID}>
                      {option.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
