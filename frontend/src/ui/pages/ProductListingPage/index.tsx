"use client";
import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Chip, LinearProgress, Paper,Slider,
  Alert, Snackbar, Divider,
  Grid
} from '@mui/material';
import {
  AccountBalanceWallet, AttachMoney, LocationOn, ArrowBack, AccountCircle
} from '@mui/icons-material';
import useWalletStore from '@/common/state/WalletStore';
import { Layout } from '@/ui/modules/partials';
import useFarmerStore from '@/common/state/FarmerStore';
import { useRouter } from 'next/navigation';


export const ProductDetail = () => {
  const { walletConnected, connectWallet } = useWalletStore();
  const { selectedFarmer: farmer } = useFarmerStore();
  const [investmentAmount, setInvestmentAmount] = useState(farmer?.minimumInvestment || 0);
  const [showInvestDialog, setShowInvestDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const router = useRouter();

  if (!farmer) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">
          Please select a farmer from the listings page first.
        </Alert>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
          Go to Farmers Listing
        </Button>
      </Container>
    );
  }

  const handleInvest = () => {
    if (!walletConnected) {
      connectWallet();
      return;
    }
    setShowInvestDialog(true);
  };

  const confirmInvestment = () => {
    // Simulate investment transaction
    setShowInvestDialog(false);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  const maxInvestment = farmer.investmentNeeded - farmer.currentInvestment;

  return (
    <Layout>
      <Box sx={{ background: 'white' }}>
        <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'background.default', fontFamily: 'Nunito, sans-serif' }}>
          <Button
            startIcon={<ArrowBack />}
            sx={{ mb: 3, fontFamily: 'PlusJakarta', fontWeight: 700, fontSize: '1rem', color: 'primary.main' }}
            onClick={() => router.back()}
          >
            Back to Listings
          </Button>

    <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src={farmer.image}
                alt={farmer.product}
                sx={{
                  width: '100%',
                  height: {
                    xs: '400px',
                    md: '700px'
                  },
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              />
              <Paper sx={{ p: 3, mt: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'PlusJakarta', fontWeight: 700, fontSize: '1.2rem', color: 'primary.contrastText' }}>
                  Investment Calculator
                </Typography>
                <Box sx={{ my: 3 }}>
                  <Typography gutterBottom sx={{ fontFamily: 'Nunito', fontSize: '1rem', color: 'primary.contrastText' }}>
                    Investment Amount: ${investmentAmount.toLocaleString()}
                  </Typography>
                  <Slider
                    value={investmentAmount}
                    onChange={(e, newValue) => setInvestmentAmount(newValue)}
                    min={farmer.minimumInvestment}
                    max={maxInvestment}
                    step={100}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ color: 'primary.contrastText' }}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="caption" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>
                      Min: ${farmer.minimumInvestment}
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>
                      Max: ${maxInvestment.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2, bgcolor: 'primary.contrastText', opacity: 0.2 }} />
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Expected Return:</Typography>
                    <Typography fontWeight={700} color="success.main" sx={{ fontFamily: 'PlusJakarta', fontSize: '1.1rem' }}>
                      ${(investmentAmount * (1 + farmer.returnPercentage / 100)).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Profit:</Typography>
                    <Typography fontWeight={700} color="success.main" sx={{ fontFamily: 'PlusJakarta', fontSize: '1.1rem' }}>
                      +${(investmentAmount * farmer.returnPercentage / 100).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Duration:</Typography>
                    <Typography fontWeight={700} sx={{ fontFamily: 'PlusJakarta', color: 'primary.contrastText' }}>
                      {farmer.duration} months
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box mb={3}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {farmer.product}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Chip
                    icon={<AccountCircle />}
                    label={farmer.name}
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocationOn />}
                    label={farmer.location}
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  About This Farm
                </Typography>
                <Typography paragraph>
                  {farmer.description}
                </Typography>
                <Typography paragraph>
                  This farm specializes in {farmer.product.toLowerCase()} production with a focus on sustainable and efficient farming practices. The investment will be used for equipment upgrades, seed procurement, and operational expenses.
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Investment Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Needed
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        ${farmer.investmentNeeded.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Already Invested
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        ${farmer.currentInvestment.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Return Rate
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        {farmer.returnPercentage}%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Timeline
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {farmer.duration} months
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box mt={3}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Investment Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(farmer.currentInvestment / farmer.investmentNeeded) * 100}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="caption">
                      {((farmer.currentInvestment / farmer.investmentNeeded) * 100).toFixed(1)}% Funded
                    </Typography>
                    <Typography variant="caption">
                      ${(farmer.investmentNeeded - farmer.currentInvestment).toLocaleString()} Remaining
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleInvest}
                startIcon={walletConnected ? <AttachMoney /> : <AccountBalanceWallet />}
                sx={{ py: 2 }}
              >
                {walletConnected ? 'Invest Now' : 'Connect Wallet to Invest'}
              </Button>
            </Grid>
          </Grid>

          {/* Investment Dialog */}
          <Dialog open={showInvestDialog} onClose={() => setShowInvestDialog(false)}>
            <DialogTitle>Confirm Investment</DialogTitle>
            <DialogContent>
              <Typography paragraph>
                You are about to invest <strong>${investmentAmount.toLocaleString()}</strong> in {farmer.name}&apos;s {farmer.product} farm.
              </Typography>
              <Alert severity="info">
                Expected return: ${(investmentAmount * (1 + farmer.returnPercentage / 100)).toLocaleString()} after {farmer.duration} months
              </Alert>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowInvestDialog(false)}>Cancel</Button>
              <Button variant="contained" onClick={confirmInvestment}>
                Confirm Investment
              </Button>
            </DialogActions>
          </Dialog>

          {/* Success Alert */}
          <Snackbar
            open={showSuccessAlert}
            autoHideDuration={5000}
            onClose={() => setShowSuccessAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
              Investment successful! Transaction has been submitted to the blockchain.
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Layout>
  );
};
