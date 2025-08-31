"use client";
import { useState } from 'react';
import { AccountBalanceWallet, Agriculture, Dashboard, ExitToApp, Menu, TrendingUp } from '@mui/icons-material';
import {
  Box, Typography, Button, AppBar, Toolbar, IconButton, Chip, Avatar, List, ListItem, ListItemText, ListItemAvatar, Drawer
} from '@mui/material';
import useWalletStore from '@/common/state/WalletStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useWalletStore();
  const router = useRouter();

  const menuItems = [
    { label: 'Home', value: 'home', icon: <Dashboard />, link: '/' },
    { label: 'Farmers', value: 'farmers', icon: <Agriculture />, link: '/farmer-listings' },
    { label: 'Investments', value: 'investments', icon: <TrendingUp />, link: '/investor-dashboard' }
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ 
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        boxShadow: 'none',
        transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <Toolbar
         sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
         }}
        >
          <Link href={"/"} style={{ display: 'flex', gap: 3 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ 
                mr: 2,
                display: {
                  md: 'none',
                  xs: 'block'
                } 
              }}
            >
              <Menu />
            </IconButton>
            
            <Agriculture sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" 
             sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              display: {
                xs: 'none',
                md: 'block'
              } 
             }}>
              AgriConnect
            </Typography>
          </Link>

          <Box sx={{ display: 'flex', gap: 2, mr: 3 }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                startIcon={index === 0 ? "" : item.icon}
                sx={{
                  borderRadius: 2,
                  display: {
                    md: 'block',
                    xs: 'none'
                  },
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
                onClick={() => router.push(item.link)}
              >
                {index === 0 ? "" : item.label}
              </Button>
            ))}
          </Box>

          {walletConnected ? (
            <Chip
              icon={<AccountBalanceWallet />}
              label={`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              onDelete={disconnectWallet}
              deleteIcon={<ExitToApp />}
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            />
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountBalanceWallet />}
              onClick={connectWallet}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2, background: 'background.default' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.value}
                component="button"
                onClick={() => {
                  setMobileOpen(false);
                  router.push(item.link);
                }}
                sx={{ textAlign: 'left' }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
