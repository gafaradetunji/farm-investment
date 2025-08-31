"use client";
import React from 'react';
import {
  Box, Container, Typography, Button, Card, Avatar, useTheme, useMediaQuery, Stack, Fade,
  Grid
} from '@mui/material';
import { AccountBalanceWallet, Agriculture, TrendingUp } from '@mui/icons-material';
import { Layout } from '@/ui/modules/partials';
import { useRouter } from 'next/navigation';

export const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const features = [
    {
      icon: <Agriculture sx={{ fontSize: 40 }} />,
      title: 'Connect with Farmers',
      description: 'Direct access to verified farmers and their agricultural projects'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Smart Investments',
      description: 'Transparent investment opportunities with guaranteed returns'
    },
    {
      icon: <AccountBalanceWallet sx={{ fontSize: 40 }} />,
      title: 'Secure Transactions',
      description: 'Blockchain-powered smart contracts ensure safe investments'
    }
  ];

  return (
    <Layout>
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 8}}>
                <Fade in timeout={300}>
                  <Box>
                    <Typography
                      variant={isMobile ? 'h3' : 'h2'}
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        fontSize: '48px',
                        fontFamily: (theme) => theme.font.PlusJakarta
                      }}
                    >
                      Empowering <Box component="span" sx={{ color: 'primary.main', display: 'inline' }}>Agriculture</Box> Through Investment
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                      Connect farmers with investors. Build sustainable agricultural futures together.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Agriculture sx={{ color: 'primary.main' }} />}
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          py: 1.5,
                          px: 3,
                          boxShadow: 'none',
                          transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1)',
                          '&:hover': { bgcolor: 'primary.dark' }
                        }}
                        onClick={() => router.push("/farmer-listings")}
                      >
                        View Farmers
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<TrendingUp sx={{ color: 'primary.main' }} />}
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          py: 1.5,
                          px: 3,
                          transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1)',
                          '&:hover': { borderColor: 'primary.dark', color: 'primary.dark', bgcolor: 'primary.contrastText' }
                        }}
                        onClick={() => router.push("/investor-dashboard")}
                      >
                        Start Investing
                      </Button>
                    </Stack>
                  </Box>
                </Fade>
              </Grid>
              {/* <Grid size={{ xs: 12, md: 6}}>
                <Zoom in timeout={1500}>
                  <Box
                    component="img"
                    src="/api/placeholder/600/400"
                    alt="Farming"
                    sx={{
                      width: '100%',
                      borderRadius: 3,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}
                  />
                </Zoom>
              </Grid> */}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="xl">
            <Typography
              variant="h3"
              align="center"
              fontWeight={800}
              gutterBottom
              sx={{ fontFamily: (theme) => theme.font.nunito, fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary' }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mb: 6, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.25rem' } }}
            >
              Simple, transparent, and secure agricultural investment
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Fade in timeout={1000 + index * 500}>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        p: 3,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: 4,
                        boxShadow: 'none',
                        fontFamily: 'Manrope',
                        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                        '&:hover': {
                          transform: 'translateY(-10px) scale(1.03)',
                          boxShadow: '0 10px 30px rgba(33,150,83,0.15)'
                        }
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: 'background.default',
                          color: 'primary.main',
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 2,
                          fontSize: 40
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                        sx={{ fontFamily: 'Manrope', fontSize: { xs: '1.3rem', md: '1.5rem' }, color: 'primary.contrastText' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        sx={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'primary.contrastText', opacity: 0.95 }}
                      >
                        {feature.description}
                      </Typography>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {[
                { value: '500+', label: 'Active Farmers' },
                { value: '$2M+', label: 'Total Invested' },
                { value: '95%', label: 'Success Rate' },
                { value: '1000+', label: 'Happy Investors' }
              ].map((stat, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Box textAlign="center">
                    <Typography variant="h3" color="primary" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};
