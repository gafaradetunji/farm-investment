"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#219653', // green
      contrastText: '#fff',
    },
    secondary: {
      main: '#111111', // black
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#111',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'PlusJakartaSans, Geist, serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontFamily: 'PlusJakartaSans', fontWeight: 800 },
    h2: { fontFamily: 'PlusJakartaSans', fontWeight: 800 },
    h3: { fontFamily: 'PlusJakartaSans', fontWeight: 700 },
    h4: { fontFamily: 'PlusJakartaSans', fontWeight: 700 },
    h5: { fontFamily: 'PlusJakartaSans', fontWeight: 600 },
    h6: { fontFamily: 'PlusJakartaSans', fontWeight: 600 },
    button: { fontFamily: 'NunitoSans', fontWeight: 700, fontSize: '1rem' },
    body1: { fontFamily: 'NunitoSans', fontWeight: 400, fontSize: '1rem' },
    body2: { fontFamily: 'NunitoSans', fontWeight: 400, fontSize: '0.95rem' },
  },
  font: {
    nunito: 'NunitoSans, sans-serif',
    PlusJakarta: 'PlusJakartaSans, sans-serif',
  },
  color: {
    error: '#D00416',
    info: '#2F80ED',
    warning: '#DFB400',
    success: '#1FC16B',
    black: '#1D1D1D',
    grey: '#8E8E8E',
    lightGrey: '#C6C6C6',
    lightOrange: '#E777281A',
    background: '#F5F5F5',
  },
  status: {
    danger: "red",
  },
  transitions: {
    duration: {
      shortest: 200,
      shorter: 250,
      short: 300,
      standard: 400,
      complex: 500,
      enteringScreen: 350,
      leavingScreen: 300,
    },
  },
});
