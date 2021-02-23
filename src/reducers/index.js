const initial = {
  flights: []
};

function reducer(state=initial, action) {
  const {flightId, passengerId} =  action;
  switch (action.type) {
    case 'SET_FLIGHT':
      return {
        ...state,
        flights: action.flights,
      };
    case 'ADD_FLIGHT':
      return {
        ...state,
        flights: [
          ...state.flights,
          {
            destination: action.destination,
            time: action.time,
            seatsCount: action.seatsCount,
            passengers: []
          }
        ]
      };
    case 'ADD_PASSENGER':
      return {
        ...state,
        flights: state.flights.map(
          (flight, index) => index !== action.flightId ?
            {...flight} :
            {...flight, passengers: [...flight.passengers, {surname: action.surname}]}
        )
      };
    case 'DELETE_PASSENGER':
      const removedPassenger = state.flights[flightId].passengers[passengerId];
      const newPassengers = state.flights[flightId].passengers.filter(passenger => passenger !== removedPassenger);
      return {
        ...state,
        flights: state.flights.map(
          (flight, index) => index === flightId ?
            {
              ...flight,
              passengers: newPassengers,
            } :
            {...flight}
        )
      };
    case 'EDIT_PASSENGER':
      return {
        ...state,
        flights: state.flights.map(
          (flight, index) => index !== action.flightId ?
            {...flight} :
            {
              ...flight,
              passengers: flight.passengers.map(
                (passenger, passengerIndex) => passengerIndex === action.passengerId ?
                  {surname: action.surname} :
                  passenger
              )
            }
        )
      };
    default:
      return state;
  }
}

export default reducer;