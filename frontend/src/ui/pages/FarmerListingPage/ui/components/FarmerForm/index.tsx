"use client";
import React, { useState } from 'react';
import {
  Box, Typography, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, InputAdornment, Stack
} from '@mui/material';
import {
  Close, Add, LocationOn
} from '@mui/icons-material';

type FarmerFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    location: string;
    product: string;
    description: string;
    investmentNeeded: string;
    returnPercentage: string;
    duration: string;
    minimumInvestment: string;
  }) => void;
};

export const FarmerForm = ({ open, onClose, onSubmit }: FarmerFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    product: '',
    description: '',
    investmentNeeded: '',
    returnPercentage: '',
    duration: '',
    minimumInvestment: ''
  });

  const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const isFormValid = Object.values(formData).every(value => value !== '');

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formData);
      onClose();
      setFormData({
        name: '',
        location: '',
        product: '',
        description: '',
        investmentNeeded: '',
        returnPercentage: '',
        duration: '',
        minimumInvestment: ''
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Add Farm Listing</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Farmer Name"
            fullWidth
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
          <TextField
            label="Location"
            fullWidth
            value={formData.location}
            onChange={handleChange('location')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              )
            }}
            required
          />
          <TextField
            label="Product/Crop"
            fullWidth
            value={formData.product}
            onChange={handleChange('product')}
            required
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange('description')}
            required
          />
          <TextField
            label="Total Investment Needed"
            fullWidth
            type="number"
            value={formData.investmentNeeded}
            onChange={handleChange('investmentNeeded')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            required
          />
          <TextField
            label="Minimum Investment"
            fullWidth
            type="number"
            value={formData.minimumInvestment}
            onChange={handleChange('minimumInvestment')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            required
          />
          <TextField
            label="Return Percentage"
            fullWidth
            type="number"
            value={formData.returnPercentage}
            onChange={handleChange('returnPercentage')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
              )
            }}
            required
          />
          <TextField
            label="Duration (months)"
            fullWidth
            type="number"
            value={formData.duration}
            onChange={handleChange('duration')}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid}
          startIcon={<Add />}
        >
          Add Listing
        </Button>
      </DialogActions>
    </Dialog>
  );
};
