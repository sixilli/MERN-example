import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { createUser, deleteUser, patchUser } from '../requests';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  }
}))

let d = new Date()
let today = `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`
let empDefault = {
  name: '', 
  birthday: today, 
  department: '', 
  isActive: true,
  contactInfo: {
    phoneNumber: '',
    email: ''
  }, 
  address: {
    lineOne: '',
    lineTwo: '', 
    city: '',
    state: '',
    country: '',
    zip: ''
  }, 
  emergencyContact: [{
    name: '',
    relationship: '',
    contactMethod: '',
    contactInfo:''
  }]
}

const UserForm = (props) => {
  const classes = useStyles()
  const emp = props.employee ? props.employee : empDefault
  const [state, setState] = React.useState(emp.isActive)

  const handleEmployeeChange = (event) => {
    let { name, value } = event.target
    let temp = {...emp}
    temp[name] = value
    props.setEmployee(temp)
  }

  const submitForm = () => {
    if (emp._id) {
      patchUser(emp)
        .then(() => {
          props.handleClose(true)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      createUser(emp)
        .then(() => {
          props.handleClose(true)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const doDelete = () => {
    deleteUser(emp)
      .then(() => {
        props.handleClose(true)
      })
      .catch(e => console.log(e))
  }

  const handleActiveChange = (event) => {
    emp.isActive = !emp.isActive
    setState({ ...state, [event.target.name]: event.target.checked });
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

  const emergencyContacts = emp.emergencyContact.map((contact, i) =>
    <div key={i}>
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
        {emp._id ?
          <Grid container justify="space-between">
            <Button variant="contained" color="secondary" onClick={() => doDelete()}>Delete</Button>
            <Button variant="contained" color="primary" onClick={() => submitForm()}>Submit</Button>
          </Grid> 
          :
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary" onClick={() => submitForm()}>Submit</Button>
          </Grid>
        }
      </FormGroup>
    </form>
  )
}

export default UserForm