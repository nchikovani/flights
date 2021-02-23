import './style.scss';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VacanciesList from '../VacanciesList/VacanciesList';
import {connect} from "react-redux";
import {addHrAction, addVacancyAction, setHrsAction} from '../../actions';
import {addHr, getHrs, addVacancy} from '../../models/AppModel';

class App extends React.Component {
  async componentDidMount() {
    const hrs = await getHrs();
    this.props.setHrsDispatch(hrs);
  }

  onClickAddHr() {
    const hrName = prompt("Укажите имя HR сотрудника");
    if (hrName) {
      this.props.addHrDispatch(hrName);
      addHr({
        hrName: hrName,
        vacancies: [],
      }).then(info => console.log(info));
    }
  }

  onClickAddVacancy(hrId) {
    const title = prompt("Укажите название вакансии");
    let company;
    if (title) {
      company = prompt("Укажите название компании");
    }
    if (company) {
      this.props.addVacancyDispatch(hrId, title, company)
      addVacancy(
        hrId, title, company,
      ).then(info => console.log(info));
    }
  }
  render() {
    return (
      <div className="App">
        <AppBar position="static" className="app-bar">
          <Typography variant="h6" noWrap>
            Рекрутинг
          </Typography>
        </AppBar>
        <div className="app-body">
          <Card className="card">
            <Button
              color="primary"
              className="card__add-hr"
              onClick={() => this.onClickAddHr()}
            >
              Добавить HR
            </Button>
          </Card>
          {
            this.props.hrs.map((hr, index) =>
              <Card
                key={index}
                className="card"
              >
                <div className="card-title">
                  <Typography gutterBottom variant="h6" component="h2">
                    {hr.hrName}
                  </Typography>
                </div>
                <VacanciesList
                  vacancies={hr.vacancies}
                  hrId={index}
                />
                <CardActions
                  className="card-actions"
                >
                  <Button
                    size="small"
                    color="primary"
                    onClick={()=>this.onClickAddVacancy(index)}
                  >
                    Добавить вакансию
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
    hrs: store.hrs,
  }
}

const mapDispatchToProps = dispatch => ({
  setHrsDispatch: (hrs) => dispatch(setHrsAction(hrs)),
  addHrDispatch: (hrName) => dispatch(addHrAction(hrName)),
  addVacancyDispatch: (hrName, title, company) => dispatch(addVacancyAction(hrName, title, company))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
