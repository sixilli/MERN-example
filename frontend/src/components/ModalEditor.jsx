import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import UserForm from './UserForm';

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
}))

const ModalEditor = (props) => {
  const classes = useStyles()

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
          <UserForm 
            handleClose={props.handleClose} 
            employee={props.employee}
            setEmployee={props.setEmployee}
          />
        </div>
      </Fade>
    </Modal>
  )
}

export default ModalEditor