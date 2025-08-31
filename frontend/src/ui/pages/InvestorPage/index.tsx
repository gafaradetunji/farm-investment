"use client";
import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Chip, LinearProgress, Avatar, Tab, Tabs, Paper
} from '@mui/material';
import { AccountBalanceWallet, Agriculture, TrendingUp, AttachMoney, CheckCircle, AccessTime
} from '@mui/icons-material';
import useWalletStore from "@/common/state/WalletStore";
import { Layout } from '@/ui/modules/partials';

export const InvestorDashboardPage = () => {
  const { walletConnected, walletAddress } = useWalletStore();
  const [tabValue, setTabValue] = useState(0);

  const investments = [
    {
      id: 1,
      farmerName: 'John Smith',
      product: 'Corn',
      investmentAmount: 5000,
      expectedReturn: 6250,
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      progress: 65
    },
    {
      id: 2,
      farmerName: 'Maria Garcia',
      product: 'Avocados',
      investmentAmount: 10000,
      expectedReturn: 13000,
      status: 'Active',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      progress: 40
    },
    {
      id: 3,
      farmerName: 'Ahmed Hassan',
      product: 'Wheat',
      investmentAmount: 2500,
      expectedReturn: 3000,
      status: 'Completed',
      startDate: '2023-06-01',
      endDate: '2024-02-01',
      progress: 100
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
  const totalExpectedReturn = investments.reduce((sum, inv) => sum + inv.expectedReturn, 0);
  const activeInvestments = investments.filter(inv => inv.status === 'Active').length;
  const completedInvestments = investments.filter(inv => inv.status === 'Completed').length;

  if (!walletConnected) {
    return (
      <Layout>
        <Container maxWidth="xl" sx={{ py: 8, minHeight: '100vh' }}>
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <AccountBalanceWallet sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Connect Your Wallet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Please connect your wallet to view your investment dashboard
            </Typography>
          </Paper>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{
        bgcolor: 'background.default'
      }}>
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'background.default', fontFamily: 'Nunito, sans-serif' }}>
          {/* Header */}
          <Box mb={4}>
            <Typography
              variant="h4"
              fontWeight={800}
              gutterBottom
              sx={{ fontFamily: 'PlusJakarta, Manrope, sans-serif', fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary' }}
            >
              Investment Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem' }}>
              Wallet: {walletAddress}
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3 }}>
                <Box>
                  <AttachMoney sx={{ fontSize: 40, mb: 1, color: 'primary.contrastText' }} />
                  <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'PlusJakarta', fontSize: '2rem' }}>
                    ${totalInvested.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Total Invested</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3 }}>
                <Box>
                  <TrendingUp sx={{ fontSize: 40, mb: 1, color: 'primary.contrastText' }} />
                  <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'PlusJakarta', fontSize: '2rem' }}>
                    ${totalExpectedReturn.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Expected Return</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3 }}>
                <Box>
                  <AccessTime sx={{ fontSize: 40, mb: 1, color: 'primary.contrastText' }} />
                  <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'PlusJakarta', fontSize: '2rem' }}>
                    {activeInvestments}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Active Investments</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3 }}>
                <Box>
                  <CheckCircle sx={{ fontSize: 40, mb: 1, color: 'primary.contrastText' }} />
                  <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'PlusJakarta', fontSize: '2rem' }}>
                    {completedInvestments}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Nunito', color: 'primary.contrastText' }}>Completed</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Investment Tabs */}
          <Paper elevation={0} sx={{ mb: 4, bgcolor: 'background.default', borderRadius: 3 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="All Investments" sx={{ fontFamily: 'PlusJakarta', fontWeight: 600, fontSize: '1.1rem' }} />
              <Tab label="Active" sx={{ fontFamily: 'PlusJakarta', fontWeight: 600, fontSize: '1.1rem' }} />
              <Tab label="Completed" sx={{ fontFamily: 'PlusJakarta', fontWeight: 600, fontSize: '1.1rem' }} />
            </Tabs>
          </Paper>

          {/* Investment List */}
          <Grid container spacing={3}>
            {investments
              .filter(inv => {
                if (tabValue === 0) return true;
                if (tabValue === 1) return inv.status === 'Active';
                if (tabValue === 2) return inv.status === 'Completed';
                return true;
              })
              .map((investment) => (
                <Grid size={12} key={investment.id}>
                  <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <Agriculture />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontFamily: 'PlusJakarta', fontWeight: 700, fontSize: '1.2rem' }}>{investment.farmerName}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>
                              {investment.product}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>
                          Invested
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'PlusJakarta', fontWeight: 700, fontSize: '1.2rem' }}>
                          ${investment.investmentAmount.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>
                          Expected Return
                        </Typography>
                        <Typography variant="h6" color="success.main" sx={{ fontFamily: 'PlusJakarta', fontWeight: 700, fontSize: '1.2rem' }}>
                          ${investment.expectedReturn.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>
                          Progress
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <LinearProgress
                            variant="determinate"
                            value={investment.progress}
                            sx={{ flexGrow: 1, mr: 2, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2" sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>{investment.progress}%</Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Chip
                          label={investment.status}
                          color={investment.status === 'Active' ? 'primary' : 'success'}
                          sx={{ fontWeight: 'bold', fontFamily: 'PlusJakarta', fontSize: '1rem' }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          {/* Performance Chart Placeholder */}
          <Paper elevation={0} sx={{ p: 3, mt: 4, bgcolor: 'background.default', borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'PlusJakarta', fontWeight: 700, fontSize: '1.2rem' }}>
              Portfolio Performance
            </Typography>
            <Box
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
                borderRadius: 2
              }}
            >
              <Typography color="text.secondary" sx={{ fontFamily: 'Nunito', fontSize: '1rem' }}>
                Performance chart will be displayed here
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};
