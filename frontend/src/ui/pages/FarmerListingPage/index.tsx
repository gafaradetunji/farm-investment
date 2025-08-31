"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useFarmerStore, { Farmer } from '@/common/state/FarmerStore';
import {
  Box, Container, Typography, Button, Card, CardContent, CardMedia, Grid,
  Chip, LinearProgress, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Paper,
  useTheme
} from '@mui/material';
import {Add, LocationOn,
  ArrowForward, Visibility
} from '@mui/icons-material';
import { FarmerForm } from './ui/components';
import { Layout } from '@/ui/modules/partials';
import coffeeimage from '../../assets/images/coffe.jpg'
import avocadoimage from '../../assets/images/avocado.jpg'
import cornimage from '../../assets/images/corn.jpg'
import soybeansimage from '../../assets/images/soybeans.jpg'
import quinoaimage from '../../assets/images/quinoa.jpg'
import farmimage from '../../assets/images/farm.jpg'


export const FarmersListing = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      location: 'Medellín, Colombia',
      product: 'Coffee',
      description: 'Shade-grown coffee from the mountains of Antioquia.',
      investmentNeeded: 50000,
      currentInvestment: 35000,
      returnPercentage: 25,
      duration: 6,
      minimumInvestment: 500,
      image: coffeeimage.src
    },
    {
      id: 2,
      name: 'Maria Gomez',
      location: 'Guadalajara, Mexico',
      product: 'Avocados',
      description: 'Premium Hass avocados from Jalisco for export market.',
      investmentNeeded: 75000,
      currentInvestment: 40000,
      returnPercentage: 30,
      duration: 12,
      minimumInvestment: 1000,
      image: avocadoimage.src
    },
    {
      id: 3,
      name: 'Carlos Silva',
      location: 'Lima, Peru',
      product: 'Quinoa',
      description: 'Organic quinoa grown in the Andean highlands.',
      investmentNeeded: 40000,
      currentInvestment: 10000,
      returnPercentage: 20,
      duration: 8,
      minimumInvestment: 250,
      image: quinoaimage.src
    },
    {
      id: 4,
      name: 'Ana Rodríguez',
      location: 'Rosario, Argentina',
      product: 'Soybeans',
      description: 'Sustainable soybean farming in the Pampas region.',
      investmentNeeded: 60000,
      currentInvestment: 25000,
      returnPercentage: 22,
      duration: 10,
      minimumInvestment: 700,
      image: soybeansimage.src
    },
    {
      id: 5,
      name: 'Pedro Fernández',
      location: 'Curitiba, Brazil',
      product: 'Corn',
      description: 'Non-GMO corn cultivated with modern techniques.',
      investmentNeeded: 55000,
      currentInvestment: 30000,
      returnPercentage: 24,
      duration: 7,
      minimumInvestment: 600,
      image: cornimage.src
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterProduct, setFilterProduct] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme()

  const handleAddFarmer = (data: {
    name: string;
    location: string;
    product: string;
    description: string;
    investmentNeeded: string;
    returnPercentage: string;
    duration: string;
    minimumInvestment: string;
  }) => {
    setFarmers([
      ...farmers,
      {
        id: farmers.length + 1,
        name: data.name,
        location: data.location,
        product: data.product,
        description: data.description,
        investmentNeeded: Number(data.investmentNeeded),
        currentInvestment: 0,
        returnPercentage: Number(data.returnPercentage),
        duration: Number(data.duration),
        minimumInvestment: Number(data.minimumInvestment),
        image: farmimage.src,
      },
    ]);
  };

  const filteredFarmers = farmers.filter(farmer => {
    const matchesProduct = filterProduct === 'all' || farmer.product.toLowerCase().includes(filterProduct.toLowerCase());
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProduct && matchesSearch;
  });


  const router = useRouter();
  const { setSelectedFarmer } = useFarmerStore();

  const handleViewDetails = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    router.push(`/farmer-listings/${farmer.id}`);
  };

  return (
    <Layout>
      <Box sx={{ bgcolor: 'background.default'}}>
        <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'background.default', fontFamily: (theme) => theme.font.nunito }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ fontFamily: (theme) => theme.font.PlusJakarta, fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary' }}
            >
              Farmer Listings
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowAddForm(true)}
              sx={{ borderRadius: 2, fontFamily: (theme) => theme.font.PlusJakarta, fontWeight: 700, fontSize: '1rem' }}
            >
              Add Farm Listing
            </Button>
          </Box>

          {/* Filters */}
    <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.default', borderRadius: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search farmers, products, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Visibility />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    borderRadius: '12px'
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Filter by Product</InputLabel>
                  <Select
                    value={filterProduct}
                    onChange={(e) => setFilterProduct(e.target.value)}
                    label="Filter by Product"
                  >
                    <MenuItem value="all">All Products</MenuItem>
                    <MenuItem value="corn">Corn</MenuItem>
                    <MenuItem value="wheat">Wheat</MenuItem>
                    <MenuItem value="avocados">Avocados</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Chip
                  label={`${filteredFarmers.length} Listings Found`}
                  color="primary"
                  sx={{ py: 2, width: '100%' }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Farmer Cards */}
          <Grid container spacing={3}>
            {filteredFarmers.map((farmer) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={farmer.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${theme.palette.primary.main}`,
                    boxShadow: 0,
                     bgcolor: 'background.default',
                     color: 'text.primary',
                    borderRadius: 3,
                    transition: 'transform 0.3s',
                    fontFamily: (theme) => theme.font.nunito,
                    '&:hover': {
                      transform: 'translateY(-5px) scale(1.03)',
                      border: `1px solid ${theme.palette.primary.main}`,
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={farmer.image}
                    alt={farmer.product}
                  />
                  <CardContent sx={{ flexGrow: 1, fontFamily: 'Nunito' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ fontFamily: (theme) => theme.font.PlusJakarta, fontSize: '1.2rem', color: 'primary.contrastText' }}
                      >
                        {farmer.name}
                      </Typography>
                       <Chip
                        label={`${farmer.returnPercentage}% Return`}
                        color="success"
                        size="small"
                        sx={{ fontFamily: (theme) => theme.font.PlusJakarta, fontWeight: 700, fontSize: '1rem' }}
                      />
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                       <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>
                        {farmer.location}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" mb={2} sx={{ fontFamily: 'Nunito', fontSize: '1rem', color: 'primary.contrastText' }}>
                      <strong>Product:</strong> {farmer.product}
                    </Typography>
                    
                     <Typography variant="body2" color="text.secondary" mb={2} sx={{ fontFamily: 'Nunito', fontSize: '1rem', opacity: 0.95 }}>
                      {farmer.description}
                    </Typography>
                    
                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Investment Progress</Typography>
                         <Typography variant="body2" fontWeight={700} sx={{ fontFamily: (theme) => theme.font.PlusJakarta, color: 'primary.main' }}>
                          ${farmer.currentInvestment.toLocaleString()} / ${farmer.investmentNeeded.toLocaleString()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(farmer.currentInvestment / farmer.investmentNeeded) * 100}
                         sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: 'success.main' } }}
                      />
                    </Box>
                    
                    <Grid container spacing={1} mb={2}>
                      <Grid size={{ xs: 6}}>
                         <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Nunito' }}>
                          Min. Investment
                        </Typography>
                         <Typography variant="body1" fontWeight={700} sx={{ fontFamily: (theme) => theme.font.PlusJakarta, color: 'primary.main' }}>
                          ${farmer.minimumInvestment}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                         <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Nunito' }}>
                          Duration
                        </Typography>
                         <Typography variant="body1" fontWeight={700} sx={{ fontFamily: (theme) => theme.font.PlusJakarta, color: 'primary.main' }}>
                          {farmer.duration} months
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => handleViewDetails(farmer)}
                      sx={{ fontFamily: (theme) => theme.font.PlusJakarta, fontWeight: 700, fontSize: '1rem', bgcolor: 'primary.main', color: 'primary.contrastText' }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <FarmerForm
            open={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddFarmer}
          />
        </Container>
      </Box>
    </Layout>
  );
};
