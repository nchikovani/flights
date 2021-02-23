import './style.scss';
import Vacancy from '../Vacancy/Vacancy'
import React from 'react';

function VacanciesList({vacancies, hrId}) {

  return (
    <div className="vacanciesList">
      {
        vacancies.map((vacancy, index) =>
          <Vacancy
            key={index}
            vacancy={vacancy}
            vacancyId={index}
            hrId={hrId}
          />
        )
      }
    </div>
  );
}

export default VacanciesList;
