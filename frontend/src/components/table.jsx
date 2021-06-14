import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props) {
  const classes = useStyles();

  const setEmployee = (employee) => {
    props.setEmployee(employee)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Title</strong></TableCell>
            <TableCell align="right"><strong>Department</strong></TableCell>
            <TableCell align="right"><strong>Actively Employed</strong></TableCell>
            <TableCell align="right"><strong>Edit Employee</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.department}</TableCell>
              <TableCell align="right">{row.isActive ? "Yes" : "No"}</TableCell>
              <TableCell align="right">
                <Button color="primary" onClick={() => setEmployee(row)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}