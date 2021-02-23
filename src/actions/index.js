export function setFlightsAction(flights) {
    return {
        type: "SET_FLIGHT",
        flights,
    }
}

export function addFlightAction(destination, time, seatsCount) {
    return {
        type: "ADD_FLIGHT",
        destination,
        time,
        seatsCount,
    }
}

export function addPassengerAction(flightId, surname) {
    return {
        type: "ADD_PASSENGER",
        flightId,
        surname
    }
}

export function deletePassengerAction(flightId, passengerId) {
    return {
        type: "DELETE_PASSENGER",
        flightId,
        passengerId,
    }
}

export function editPassengerAction(flightId, passengerId, surname) {
    return {
        type: "EDIT_PASSENGER",
        flightId,
        passengerId,
        surname,
    }
}