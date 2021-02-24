const path = require("path");
const express = require("express");
const {readData, writeData} = require('./utils');
const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(express.json());


app.listen(process.env.PORT || 8080, function(){
  console.log("Сервер подключен на порту 8080.");
});

let flights = [];

app.get('/getFlights', async (request, response) => {
  flights = await readData();
  response.setHeader('Content-Type', 'application/json');
  response.json(flights);
});

app.post('/addFlight', async (request, response) => {
  flights.push(request.body);
  await writeData(flights);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Flight was successfully added`
  });
});

app.post('/addPassenger', async (request, response) => {
  const {flightId, surname} = request.body;

  flights[flightId].passengers.push({surname});
  await writeData(flights);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Passenger '${surname}' was successfully added`
  });
});

app.patch('/editPassenger', async (request, response) => {
  const {flightId, passengerId, surname} = request.body;

  flights[flightId].passengers[passengerId].surname = surname;
  await writeData(flights);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Passenger '${surname}' was successfully change`
  });
});

app.delete('/deletePassenger', async (request, response) => {
  const {flightId, passengerId} = request.body;

  flights[flightId].passengers = flights[flightId].passengers.filter(
    (passenger, index) => index !== passengerId
  );
  await writeData(flights);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Passenger was successfully delete`
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
