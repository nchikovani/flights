const getFlights = async () => {
  const response = await fetch('./getFlights');
  const flights = await response.json();

  return flights;
};

const addFlight = async (flight) => {
  const response = await fetch('./addFlight', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify(flight),
  });

  const {info} = await response.json();

  return info;
};

const addPassenger = async (flightId, surname) => {
  const response = await fetch('./addPassenger', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({flightId, surname}),
  });

  const {info} = await response.json();

  return info;
};

const editPassenger = async (flightId, passengerId, surname) => {
  const response = await fetch('./editPassenger', {
    method: 'PATCH',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({flightId, passengerId, surname}),
  });

  const {info} = await response.json();

  return info;
};

const deletePassenger = async (flightId, passengerId) => {
  const response = await fetch('./deletePassenger', {
    method: 'DELETE',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({flightId, passengerId}),
  });

  const {info} = await response.json();

  return info;
};

export {
  getFlights,
  addFlight,
  addPassenger,
  editPassenger,
  deletePassenger,
}