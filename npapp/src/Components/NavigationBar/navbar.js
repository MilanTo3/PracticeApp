import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import classes from './navbar.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {

  const logo = require("../../Assets/qatarlogo (1).png");

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar style={{ background: 'lightblue' }} position="static">
        <Toolbar className={classes.wrapper}>
          <Link to="/"><img width="200" src={logo} /></Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className={classes.logotext}></p>
          </Typography>

          <Search style={{ background: '#11362a' }} className={classes.searchBar}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Link to="/logregpage"><Button style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }} className={classes.buttonStyle}
            id="fade-button"
            variant="contained">
            Login/Register</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}