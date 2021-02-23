const getHrs = async () => {
  const response = await fetch('./getHr');
  const hrs = await response.json();

  return hrs;
};

const addHr = async (hr) => {
  const response = await fetch('./addHr', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify(hr),
  });

  const {info} = await response.json();

  return info;
};

const addVacancy = async (hrId, title, company) => {
  const response = await fetch('./addVacancy', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({hrId, title, company}),
  });

  const {info} = await response.json();

  return info;
};

const editVacancy = async (hrId, vacancyId, title, company) => {
  const response = await fetch('./editVacancy', {
    method: 'PATCH',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({hrId, vacancyId, title, company}),
  });

  const {info} = await response.json();

  return info;
};

const deleteVacancy = async (hrId, vacancyId) => {
  const response = await fetch('./deleteVacancy', {
    method: 'DELETE',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({hrId, vacancyId}),
  });

  const {info} = await response.json();

  return info;
};

const moveVacancy = async (hrId, vacancyId, destHrId) => {
  const response = await fetch('./moveVacancy', {
    method: 'PATCH',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    mode: 'same-origin',
    body: JSON.stringify({hrId, vacancyId, destHrId}),
  });

  const {info} = await response.json();

  return info;
};

export {
  getHrs,
  addHr,
  addVacancy,
  editVacancy,
  deleteVacancy,
  moveVacancy,
}