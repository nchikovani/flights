import Passenger from '../Passenger/Passenger'
import React from 'react';

function PassengersList({passengers, flightId}) {

  return (
    <div className="passengersList">
      {
        passengers.map((passenger, index) =>
          <Passenger
            key={index}
            passenger={passenger}
            passengerId={index}
            flightId={flightId}
          />
        )
      }
    </div>
  );
}

export default PassengersList;
