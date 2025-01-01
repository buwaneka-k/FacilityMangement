import React, { useState,useEffect  } from 'react';
import BasicTable from '../components/common/BasicTable';
import { TextField, Button, Box, Paper } from '@mui/material';
import { getData } from '../services/getService';
import { postData } from '../services/postService';
import { putData } from '../services/putService';

const Facilities = () => {
    const [headers] = useState(['Facility Name', 'Location', 'Type', 'Status']);
    const [rows, setRows] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
      'FacilityName': '',
      Location: '',
      Type: '',
      Status: '',
    });
  
    useEffect(() => {
      const fetchFacilities = async () => {
        try {
          const data = await getData('Facilities');
          const transformedData = data.map((facility) => ({
            'FacilityName': facility.facilityName,
            Location: facility.location,
            Type: facility.type?.typeName || 'Unknown', // Handling nested type object
            Status: facility.status,
            facilityID:facility.facilityID
        }));
          setRows(transformedData);
        } catch (error) {
          console.error('Error loading facilities:', error);
        }
      };
  
      fetchFacilities();
    }, []);

    const handleAddClick = () => {
      setIsAdding(true);
      setIsEditing(false);
      setFormData({ 'FacilityName': '', Location: '', Type: '', Status: '' });
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
      setFormData({ 'FacilityName': '', Location: '', Type: '', Status: '' });
    };
    const handleDeleteClick=(index)=>{
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(updatedRows);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFormSubmit =  async (e) => {
      e.preventDefault();
      if (isEditing) {
        const editFacility = await putData('',data);
      } else {
        const data = {
          facilityName: formData.FacilityName,
          location: formData.Location,
          typeID: formData.Type,
          status: formData.Status,
      };
        const newFacility = await postData('Facilities',data);
      }
      setIsAdding(false);
      setIsEditing(false);
      setFormData({ 'FacilityName': '', Location: '', Type: '', Status: '' });
      getAllFacilities();
    };

    const getAllFacilities = async () => {
      try {
        const data = await getData('Facilities');
        const transformedData = data.map((facility) => ({
          'FacilityName': facility.facilityName,
          Location: facility.location,
          Type: facility.type?.typeName || 'Unknown', // Handling nested type object
          Status: facility.status,
      }));
        setRows(transformedData);
      } catch (error) {
        console.error('Error loading facilities:', error);
      }
    };
  
    return (
      <Box p={2}>
        {(isAdding || isEditing) ? (
          <Paper sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleFormSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="FacilityName"
                  name="FacilityName"
                  value={formData['FacilityName']}
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
  