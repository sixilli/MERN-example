import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BasicTable from '../components/Table'
import ModalEditor from '../components/ModalEditor'
import { getUsers } from '../requests'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const MainView = () => {
    const classes = useStyles()
    const [employees, setEmployees] = useState([])
    const [editorOpen, setEditorOpen] = useState(false)
    const [employee, setEmployee] = useState({})

    const handleOpen = () => {
      setEditorOpen(true)
    }

    const handleClose = () => {
      getUsers()
        .then(resp => {
          console.log(resp)
          setEmployees(resp.data)
        })
        .catch(e => {
          console.log(e)
        })

      setEditorOpen(false)
    }

    useEffect(() => {
      getUsers()
        .then(resp => {
          console.log(resp)
          setEmployees(resp.data)
        })
        .catch(e => {
          console.log(e)
        })
    }, [])

    useEffect(() => {
      if (employee['_id']) {
        handleOpen()
      }
    }, [employee])

    return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Generic HR App
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Employee Data Management Tool
          </Typography>
          <React.Fragment>
            <BasicTable 
              data={employees} 
              setEmployee={setEmployee}
            />
          </React.Fragment>
        </Paper>
        {employee['_id'] &&
          <ModalEditor 
            handleClose={handleClose} 
            handleOpen={handleOpen} 
            editorOpen={editorOpen} 
            employee={employee}
            setEmployee={setEmployee}
          />
        }
      </main>
    </React.Fragment>
  )
}

export default MainView