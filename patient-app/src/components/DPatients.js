import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/dPatient'
import { Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, withStyles, ButtonGroup, Button } from '@material-ui/core'
import DPatientForm from './DPatientForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useToasts } from 'react-toast-notifications'

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DPatients = ({ classes, ...props }) => {

    const { addToast } = useToasts()

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDPatients()
    }, []) //componentDidMount

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteDPatient(id, () => addToast('Deleted successfully', { appearance: 'success' }))
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DPatientForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dPatientList.map((patient, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{patient.fullName}</TableCell>
                                                <TableCell>{patient.mobile}</TableCell>
                                                <TableCell>{patient.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon color="primary" onClick={() => { setCurrentId(patient.id) }} /></Button>
                                                        <Button><DeleteIcon color="secondary" onClick={() => { onDelete(patient.id) }} /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
    dPatientList: state.dPatient.list
})


const mapDispatchToProps = {
    fetchAllDPatients: actions.fetchAll,
    deleteDPatient: actions.Delete
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DPatients))


