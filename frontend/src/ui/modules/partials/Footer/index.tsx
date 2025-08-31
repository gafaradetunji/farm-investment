import {
  Box, Container, Typography, Grid, Divider, Stack
} from '@mui/material';
import { Agriculture } from '@mui/icons-material';
import Link from 'next/link';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 4,
        // mt: 8,
        width: '100vw',
        transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Agriculture sx={{ mr: 2 }} />
              <Typography variant="h6">AgriConnect</Typography>
            </Box>
            <Typography variant="body2" color="grey.400">
              Connecting farmers with investors for sustainable agriculture
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Stack spacing={1}>
              <Link
                color="grey.400"
                style={{ cursor: 'pointer' }}
                href={"/farmer-listings"}
              >
                Browse Farmers
              </Link>
              <Link
                color="grey.400"
                style={{ cursor: 'pointer' }}
                href={"/investor-dashboard"}
              >
                Investor Dashboard
              </Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>Contact</Typography>
            <Typography variant="body2" color="grey.400">
              Email: info@agriconnect.com
            </Typography>
            <Typography variant="body2" color="grey.400">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: 'grey.800' }} />
        <Typography variant="body2" align="center" color="grey.400">
          © {new Date().getFullYear()} AgriConnect. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}