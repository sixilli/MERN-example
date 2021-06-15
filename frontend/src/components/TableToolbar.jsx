import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const TableToolbar = (props) => {

  const toggleShow = () => {
    props.setShowActive(!props.showActive)
  }

  const newEmployee = () => {
    props.setNewEmployee(true)
  }

  let showActiveButton = props.showActive ?
    <Button variant="contained" color="primary" onClick={() => toggleShow()}>Hide Inactive</Button> :
    <Button variant="contained" color="primary" onClick={() => toggleShow()}>Show Inactive</Button>


  return (
    <Box py={2}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={6} sm={3}>
          {showActiveButton}
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="contained" color="primary" onClick={() => newEmployee()}>New Employee</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableToolbar