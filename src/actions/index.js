export function setHrsAction(hrs) {
    return {
        type: "SET_HRS",
        hrs,
    }
}

export function addHrAction(hrName) {
    return {
        type: "ADD_HR",
        hrName,
    }
}

export function addVacancyAction(hrId, title, company) {
    return {
        type: "ADD_VACANCY",
        hrId,
        title,
        company,
    }
}

export function deleteVacancyAction(hrId, vacancyId) {
    return {
        type: "DELETE_VACANCY",
        hrId,
        vacancyId,
    }
}

export function editVacancyAction(hrId, vacancyId, title, company) {
    return {
        type: "EDIT_VACANCY",
        hrId,
        vacancyId,
        title,
        company,
    }
}

export function moveVacancyBackAction(hrId, vacancyId) {
    return {
        type: "MOVE_VACANCY_BACK",
        hrId,
        vacancyId,
    }
}

export function moveVacancyForwardAction(hrId, vacancyId) {
    return {
        type: "MOVE_VACANCY_FORWARD",
        hrId,
        vacancyId,
    }
}