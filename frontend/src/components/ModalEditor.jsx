import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { patchUser } from '../requests'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    width: '70%'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}))

const ModalEditor = (props) => {
  const classes = useStyles()
  const emp = props.employee
  const [state, setState] = React.useState(emp.isActive)

  const handleActiveChange = (event) => {
    emp.isActive = !emp.isActive
    setState({ ...state, [event.target.name]: event.target.checked });
  }

  const handleEmployeeChange = (event) => {
    let { name, value } = event.target
    let temp = {...emp}
    temp[name] = value
    props.setEmployee(temp)
  }

  const handleContactInfoChange = (event) => {
    let { name, value } = event.target
    let temp = {...emp}
    temp.contactInfo[name] = value
    props.setEmployee(temp)
  }

  const handleEmergencyContactChange = (event, i) => {
    let { name, value } = event.target
    let temp = {...emp}
    temp.emergencyContact[i][name] = value
    props.setEmployee(temp)
  }

  const handleAddressChange = (event) => {
    let { name, value } = event.target
    let temp = {...emp}
    temp.address[name] = value
    props.setEmployee(temp)
  }

  const submitForm = () => {
    patchUser(emp)
      .then(res => {
        console.log(res.data)
        props.handleClose()
      })
      .catch(e => {
        console.log(e)
      })
  }

  const emergencyContacts = emp.emergencyContact.map((contact, i) =>
    <div key={contact._id}>
      <TextField 
        id="standard" 
        name="name" 
        label="Name" 
        defaultValue={contact.name} 
        onChange={event => handleEmergencyContactChange(event, i)} 
      />
      <TextField 
        id="standard" 
        name="relationship" 
        label="Relationship" 
        defaultValue={contact.relationship} 
        onChange={event => handleEmergencyContactChange(event, i)} 
      />
      <TextField 
        id="standard" 
        name="contactMethod" 
        label="Contact Method" 
        defaultValue={contact.contactMethod} 
        onChange={event => handleEmergencyContactChange(event, i)} 
      />
      <TextField 
        id="standard" 
        name="contactInfo" 
        label="Contact Info" 
        defaultValue={contact.contactInfo} 
        onChange={event => handleEmergencyContactChange(event, i)} 
      />
    </div>
  )

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.editorOpen}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.editorOpen}>
        <div className={classes.modalPaper}>
          <h2 id="transition-modal-title">Edit Employee</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <FormGroup aria-label="position" row>
              <div>
                <TextField 
                  id="standard" 
                  label="Name" 
                  name="name"
                  defaultValue={emp.name} 
                  onChange={handleEmployeeChange}
                />
                <TextField 
                  id="standard" 
                  label="Birthday" 
                  name="birthday"
                  defaultValue={emp.birthday} 
                  onChange={handleEmployeeChange}
                />
              </div>
              <div>
                <TextField 
                  id="standard" 
                  label="Department" 
                  name="department"
                  defaultValue={emp.department} 
                  onChange={handleEmployeeChange}
                />
                <TextField 
                  id="standard" 
                  label="Title" 
                  name="title"
                  defaultValue={emp.title} 
                  onChange={handleEmployeeChange}
                />
                <FormControlLabel
                  value="top"
                  control={<Switch color="primary"checked={emp.isActive} onChange={handleActiveChange} />}
                  label="Actively Employed"
                  labelPlacement="top"
                  onChange={handleEmployeeChange}
                />
              </div>
              <div>
                <h2>Contact Info</h2>
                <TextField 
                  id="standard" 
                  name="phoneNumber"
                  label="Phone Number" 
                  defaultValue={emp.contactInfo.phoneNumber} 
                  onChange={handleContactInfoChange}
                />
                <TextField 
                  id="standard" 
                  name="email"
                  label="Email" 
                  defaultValue={emp.contactInfo.email} 
                  onChange={handleContactInfoChange}
                />
              </div>
              <div>
                <h2>Address Info</h2>
                <TextField 
                  id="standard" 
                  name="lineOne"
                  label="Address Line One" 
                  defaultValue={emp.address.lineOne} 
                  onChange={handleAddressChange}
                />
                <TextField 
                  id="standard" 
                  name="lineTwo"
                  label="Address Line Two" 
                  defaultValue={emp.address.lineTwo} 
                  onChange={handleAddressChange}
                />
                <TextField 
                  id="standard" 
                  name="city"
                  label="City" 
                  defaultValue={emp.address.city} 
                  onChange={handleAddressChange}
                />
                <TextField 
                  id="standard" 
                  name="state"
                  label="State" 
                  defaultValue={emp.address.state} 
                  onChange={handleAddressChange}
                />
                <TextField 
                  id="standard" 
                  name="country"
                  label="Country" 
                  defaultValue={emp.address.country} 
                  onChange={handleAddressChange}
                />
                <TextField 
                  id="standard" 
                  name="zip"
                  label="Zip Code" 
                  defaultValue={emp.address.zip} 
                  onChange={handleAddressChange}
                />
              </div>

              {emp.emergencyContact.length > 0 &&
                <div>
                  <h2>Emergency Contacts</h2>
                  {emergencyContacts}
                </div>
              }
            </FormGroup>
          </form>
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary" onClick={() => submitForm()}>Submit</Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}

export default ModalEditor