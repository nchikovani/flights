const initial = {
  hrs: []
};

function reducer(state=initial, action) {
  const {hrId, vacancyId} =  action;
  switch (action.type) {
    case 'SET_HRS':
      return {
        ...state,
        hrs: action.hrs,
      };
    case 'ADD_HR':
      return {
        ...state,
        hrs: [
          ...state.hrs,
          {
            hrName: action.hrName,
            vacancies: []
          }
        ]
      };
    case 'ADD_VACANCY':
      return {
        ...state,
        hrs: state.hrs.map(
          (hr, index) => index !== action.hrId ?
            {...hr} :
            {...hr, vacancies: [...hr.vacancies, {title: action.title, company: action.company}]}
        )
      };
    case 'DELETE_VACANCY':
      const removedVacancy = state.hrs[hrId].vacancies[vacancyId];
      const newVacancy = state.hrs[hrId].vacancies.filter(vacancy => vacancy !== removedVacancy);
      return {
        ...state,
        hrs: state.hrs.map(
          (hr, index) => index === hrId ?
            {
              ...hr,
              vacancies: newVacancy,
            } :
            {...hr}
        )
      };
    case 'EDIT_VACANCY':
      return {
        ...state,
        hrs: state.hrs.map(
          (hr, index) => index !== action.hrId ?
            {...hr} :
            {
              ...hr,
              vacancies: hr.vacancies.map(
                (vacancy, vacancyIndex) => vacancyIndex === action.vacancyId ?
                  {title: action.title, company: action.company} :
                  vacancy
              )
            }
        )
      };
    case 'MOVE_VACANCY_BACK':
      const movedBackVacancy = state.hrs[hrId].vacancies[vacancyId];
      const backVacancy = state.hrs[hrId].vacancies.filter(vacancy => vacancy !== movedBackVacancy);
      return {
        ...state,
        hrs: state.hrs.map((hr, index) => {
          if (index === hrId - 1) {
            return {
              ...hr,
              vacancies: [...hr.vacancies, movedBackVacancy]
            }
          }

          if (index === hrId) {
            return {
              ...hr,
              vacancies: backVacancy,
            }
          }

          return { ...hr}
        })
      };
    case 'MOVE_VACANCY_FORWARD':
      const movedForwardVacancy = state.hrs[hrId].vacancies[vacancyId];
      const forwardVacancy = state.hrs[hrId].vacancies.filter(vacancy => vacancy !== movedForwardVacancy);
      return {
        ...state,
        hrs: state.hrs.map((hr, index) => {
          if (index === hrId + 1) {
            return {
              ...hr,
              vacancies: [...hr.vacancies, movedForwardVacancy]
            }
          }

          if (index === hrId) {
            return {
              ...hr,
              vacancies: forwardVacancy,
            }
          }

          return { ...hr}
        })
      };
    default:
      return state;
  }
}

export default reducer;