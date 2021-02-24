import './style.scss';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {useState} from 'react';
import {deletePassengerAction, editPassengerAction} from '../../actions';
import {editPassenger, deletePassenger} from '../../models/AppModel';

function Passenger({passenger, passengerId, flightId, deletePassengerDispatch, editPassengerDispatch}) {
  const [isEdited, setIsEdited] = useState(false);
  const [surname, setSurname] = useState(passenger.surname);
  return (
    <Card className="passenger">
      <div>
        {
          isEdited ?
            <div>
              <TextField className="passenger_input" value={surname} onChange={e=>setSurname(e.target.value)}/>
              <Button
                size="small"
                onClick={()=> {
                  editPassengerDispatch(flightId, passengerId, surname);
                  editPassenger(flightId, passengerId, surname).then(info => console.log(info));
                  setIsEdited(false);
                }}
              >Сохранить</Button>
            </div> :
            <div>
              <Typography variant="body1" color="textPrimary" component="p">
                {passenger.surname}
              </Typography>
            </div>
        }
      </div>
      <div>
        <div>
          <IconButton
            size="small"
            onClick={()=> {
              deletePassengerDispatch(flightId, passengerId);
              deletePassenger(flightId, passengerId).then(info => console.log(info));
            }}
          >
            <DeleteIcon/>
          </IconButton>
          <IconButton
            size="small"
            onClick={()=>setIsEdited(!isEdited)}
          >
            <EditIcon/>
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  deletePassengerDispatch: (flightId, passengerId) => dispatch(deletePassengerAction(flightId, passengerId)),
  editPassengerDispatch: (flightId, passengerId, surname) => dispatch(editPassengerAction(flightId, passengerId, surname)),

})

export default connect(null, mapDispatchToProps)(Passenger);
