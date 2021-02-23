import './style.scss';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import {connect} from "react-redux";
import {useState} from 'react';
import {deleteVacancyAction, editVacancyAction, moveVacancyBackAction, moveVacancyForwardAction} from '../../actions';
import {editVacancy, deleteVacancy, moveVacancy} from '../../models/AppModel';

function Vacancy({vacancy, hrId, vacancyId, isLast, deleteVacancyDispatch, editVacancyDispatch, moveVacancyBackDispatch, moveVacancyForwardDispatch}) {
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(vacancy.title);
  const [company, setCompany] = useState(vacancy.company);
  return (
    <Card className="vacancy">
      <div className="vacancy-description">
        {
          isEdited ?
            <div>
              <TextField className="vacancy__input" value={title} onChange={e=>setTitle(e.target.value)}/>
              <TextField className="vacancy__input" value={company} onChange={e=>setCompany(e.target.value)}/>
              <Button
                size="small"
                onClick={()=> {
                  editVacancyDispatch(hrId, vacancyId, title, company);
                  editVacancy(hrId, vacancyId, title, company).then(info => console.log(info));
                  setIsEdited(false);
                }}
              >Сохранить</Button>
            </div> :
            <div>
              <Typography variant="body1" color="textPrimary" component="p">
                {vacancy.title}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                {vacancy.company}
              </Typography>
            </div>
        }
      </div>
      <div className="vacancy-actions">
        <div className="vacancy-actions__top">
          <IconButton
            size="small"
            disabled={hrId === 0}
            onClick={()=> {
              if (hrId === 0) return;
              moveVacancyBackDispatch(hrId, vacancyId);
              moveVacancy(hrId, vacancyId, hrId-1).then(info => console.log(info));
            }}
          >
            <ArrowLeftIcon/>
          </IconButton>
          <IconButton
            size="small"
            disabled={isLast}
            onClick={()=> {
              if (isLast) return;
              moveVacancyForwardDispatch(hrId, vacancyId)
              moveVacancy(hrId, vacancyId,hrId+1).then(info => console.log(info));
            }}
          >
            <ArrowRightIcon/>
          </IconButton>
        </div>
        <div className="vacancy-actions__bottom">
          <IconButton
            size="small"
            onClick={()=> {
              deleteVacancyDispatch(hrId, vacancyId);
              deleteVacancy(hrId, vacancyId).then(info => console.log(info));
            }}
          >
            <DeleteIcon/>
          </IconButton>
          <IconButton
            size="small"
            onClick={()=>setIsEdited(!isEdited)}
          >
            <EditIcon/>
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLast: ownProps.hrId === (state.hrs.length-1),
  }
}

const mapDispatchToProps = dispatch => ({
  deleteVacancyDispatch: (hrId, vacancyId) => dispatch(deleteVacancyAction(hrId, vacancyId)),
  editVacancyDispatch: (hrId, vacancyId, title, company) => dispatch(editVacancyAction(hrId, vacancyId, title, company)),
  moveVacancyBackDispatch: (hrId, vacancyId) => dispatch(moveVacancyBackAction(hrId, vacancyId)),
  moveVacancyForwardDispatch: (hrId, vacancyId) => dispatch(moveVacancyForwardAction(hrId, vacancyId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Vacancy);
