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
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';

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
  var name = "";
  var isLogged = false;
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
 
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    setAnchorEl(null);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  var adminOpt = "";
  var navigate = useNavigate();

  if(loggedUser !== null){
    name = loggedUser.name;
    isLogged = true;
    var role = loggedUser.role;
    if(role === "admin"){
      adminOpt = <MenuItem className={classes["dropDown"]} onClick={handleClose}><Link to="/toiletAdmin">Bind device</Link></MenuItem>

    }

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar style={{ background: 'lightblue' }} position="static">
        <Toolbar className={classes.wrapper}>
          <Link to="/"><img width="200" src={logo} /></Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className={classes.logotext}></p>
          </Typography>
          <Link to={loggedUser ? "" : "/logregPage"}><Button id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }} className={classes.buttonStyle}
            variant="contained">
            {loggedUser ? loggedUser.name : "Staff"}</Button></Link>
            <div>
      <Menu style={{ display: loggedUser ? "flex":"none" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem style={{ display: (loggedUser && (loggedUser.role === "admin")) ? "flex":"none" }} onClick={handleClose}><Link to="/reportsPage">Bind Device</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/reportsPage">Reports</Link></MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}