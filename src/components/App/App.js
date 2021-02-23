import './style.scss';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PassengersList from '../PassengersList/PassengersList';
import {connect} from "react-redux";
import {addFlightAction, addPassengerAction, setFlightsAction} from '../../actions';
import {addFlight, getFlights, addPassenger} from '../../models/AppModel';

class App extends React.Component {
  async componentDidMount() {
    // const flights = await getFlights();
    // this.props.setFlightsDispatch(flights);
  }

  onClickAddFlight() {
    const destination = prompt("Пункт назначения");
    let time;
    if (destination) {
      time = prompt("Время");
    }
    let seatsCount;
    if (time) {
      seatsCount = prompt("Количество мест");
    }
    if (seatsCount) {
      this.props.addFlightDispatch(destination, time, seatsCount)
      // addFlight(
      //  {destination, time, seatsCount},
      // ).then(info => console.log(info));
    }
  }

  onClickAddPassenger(flightId) {
    const surname = prompt("Введите фамилию");
    if (surname) {
      this.props.addPassengerDispatch(flightId, surname)
      // addPassenger(
      //   flightId, surname,
      // ).then(info => console.log(info));
    }
  }
  render() {
    return (
      <div className="App">
        <AppBar position="static" className="app-bar">
          <Typography variant="h6" noWrap>
            Авиарейсы
          </Typography>
        </AppBar>
        <div className="app-body">
          <Card className="card">
            <Button
              color="primary"
              className="card__add-flight"
              onClick={() => this.onClickAddFlight()}
            >
              Добавить Рейс
            </Button>
          </Card>
          {
            this.props.flights.map((flight, index) =>
              <Card
                key={index}
                className="card"
              >
                <div className="card-title">
                  <Typography gutterBottom variant="h6" component="h2">
                    {flight.destination}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    {flight.time}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    {flight.seatsCount}
                  </Typography>
                </div>
                <PassengersList
                  passengers={flight.passengers}
                  flightId={index}
                />
                <CardActions
                  className="card-actions"
                >
                  <Button
                    size="small"
                    color="primary"
                    onClick={()=>this.onClickAddPassenger(index)}
                    disabled={!(flight.passengers.length < flight.seatsCount)}
                  >
                    Забронировать билет
                  </Button>
                </CardActions>
              </Card>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps= (store) => {
  return {
    flights: store.flights,
  }
}

const mapDispatchToProps = dispatch => ({
  setFlightsDispatch: (flights) => dispatch(setFlightsAction(flights)),
  addFlightDispatch: (destination, time, seatsCount) => dispatch(addFlightAction(destination, time, seatsCount)),
  addPassengerDispatch: (flightId, surname) => dispatch(addPassengerAction(flightId, surname))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
