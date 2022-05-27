import React from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import logo from './Brnyr-logos_white.png';

import useStyles from './styles.js';

function Header() {

    const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appbar}>
    <Toolbar className={classes.toolbar}>
      <Typography variant="h5" className={classes.title}>
        Places Advisor
      </Typography>
      <Box display="flex">
        <img   className={classes.logo} src={logo} alt="logo"/>
        {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
          </div>
        </Autocomplete> */}
      </Box>
    </Toolbar>
  </AppBar>
  )
}

export default Header