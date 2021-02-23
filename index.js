const path = require("path");
const express = require("express");
const {readData, writeData} = require('./utils');
const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(express.json());


app.listen(process.env.PORT || 8080, function(){
  console.log("Сервер ожидает подключения...");
});

let hrs = [];

app.get('/getHr', async (request, response) => {
  hrs = await readData();
  response.setHeader('Content-Type', 'application/json');
  response.json(hrs);
});

app.post('/addHr', async (request, response) => {
  hrs.push(request.body);
  await writeData(hrs);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Hr '${request.body.hrName}' was successfully added`
  });
});

app.post('/addVacancy', async (request, response) => {
  const {hrId, title, company} = request.body;

  hrs[hrId].vacancies.push({title, company});
  await writeData(hrs);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Vacancy '${title}' was successfully added`
  });
});

app.patch('/editVacancy', async (request, response) => {
  const {hrId, vacancyId,  title, company} = request.body;

  hrs[hrId].vacancies[vacancyId].title = title;
  hrs[hrId].vacancies[vacancyId].company = company;
  await writeData(hrs);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Vacancy '${title}' was successfully change`
  });
});

app.delete('/deleteVacancy', async (request, response) => {
  const {hrId, vacancyId} = request.body;

  hrs[hrId].vacancies = hrs[hrId].vacancies.filter(
    (vacancy, index) => index !== vacancyId
  );
  await writeData(hrs);

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Vacancy was successfully delete`
  });
});

app.patch('/moveVacancy', async (request, response) => {
  const {hrId, vacancyId, destHrId} = request.body;
  const movedVacancy = hrs[hrId].vacancies[vacancyId];
  hrs[hrId].vacancies = hrs[hrId].vacancies.filter(
    (vacancy, index) => index !== vacancyId
  );
  hrs[destHrId].vacancies.push(movedVacancy);
  await writeData(hrs);
  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    info: `Vacancy was successfully moved`
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});
