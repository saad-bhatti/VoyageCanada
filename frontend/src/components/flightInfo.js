export function createData(flightId, Departure, Arrival, Interprovince, NumSeats, Price, DepartureTime, ArrivalTime, dateLeft) {
    let a = "Yes"
    if (Interprovince)
        a = "Yes";
    else a = "No";

    let curr = new Date();
    let departDate = curr.getFullYear() + '/' + (curr.getMonth() + 1) + '/' + (curr.getDate() + dateLeft) + " " + DepartureTime;
    let arrivalDate = curr.getFullYear() + '/' + (curr.getMonth() + 1) + '/' + (curr.getDate() + dateLeft) + " " + ArrivalTime;

    return {
        flightId,
        Departure,
        Arrival,
        a,
        NumSeats,
        Price,
        detail: [
            {
                DepartureTime: departDate,
                ArrivalTime: arrivalDate,
            }
        ],
    };
}