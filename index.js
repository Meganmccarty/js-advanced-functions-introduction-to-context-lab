function createEmployeeRecord(employee) {
    let newEmployeeObject = {};
    newEmployeeObject.firstName = employee[0];
    newEmployeeObject.familyName = employee[1];
    newEmployeeObject.title = employee[2];
    newEmployeeObject.payPerHour = employee[3];
    newEmployeeObject.timeInEvents = [];
    newEmployeeObject.timeOutEvents = [];

    return newEmployeeObject;
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, timeStamp) {
    const splitTimeStamp = timeStamp.split(' ');
    const date = splitTimeStamp[0];
    const hour = parseInt(splitTimeStamp[1], 10);

    const newTimeInEvent = {};
    newTimeInEvent.type = 'TimeIn';
    newTimeInEvent.date = date;
    newTimeInEvent.hour = hour;
    employee.timeInEvents.push(newTimeInEvent);

    return employee;
}

function createTimeOutEvent(employee, timeStamp) {
    const splitTimeStamp = timeStamp.split(' ');
    const date = splitTimeStamp[0];
    const hour = parseInt(splitTimeStamp[1], 10);

    const newTimeOutEvent = {};
    newTimeOutEvent.type = 'TimeOut';
    newTimeOutEvent.date = date;
    newTimeOutEvent.hour = hour;
    employee.timeOutEvents.push(newTimeOutEvent);

    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date );
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    const allDates = employee.timeInEvents.map(event => event.date);
    const allWages = allDates.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employee, date);
    }, 0);

    return allWages;
}

function calculatePayroll(employees) {
    const payroll = employees.reduce((accumulator, employee) => {
        return accumulator + allWagesFor(employee);
    }, 0);
    return payroll;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// let meganRecord = createEmployeeRecord(['Megan', 'McCarty', 'Software Engineer', '35']);
// let rayRecord = createEmployeeRecord(['Ray', 'Azucena', 'Photographer', '50']);

// let updatedMeganRecordIn = createTimeInEvent(meganRecord, '2021-05-27 0800')
// // console.log(updatedMeganRecordIn);
// // let newInEvent = updatedMeganRecordIn.timeInEvents[0]
// // console.log(newInEvent.type);
// // console.log(newInEvent.date);
// // console.log(newInEvent.hour);
// let updatedMeganRecordOut = createTimeOutEvent(meganRecord, '2021-05-27 1500')
// // console.log(updatedMeganRecordOut);
// // let newOutEvent = updatedMeganRecordOut.timeOutEvents[0]
// // console.log(newOutEvent.type);
// // console.log(newOutEvent.date);
// // console.log(newOutEvent.hour);
// let updatedRayRecordIn = createTimeInEvent(rayRecord, '2021-05-26 1000')
// let updatedRayRecordOut = createTimeOutEvent(rayRecord, '2021-05-26 1500')

// console.log(hoursWorkedOnDate(meganRecord, '2021-05-27'));
// console.log(wagesEarnedOnDate(meganRecord, '2021-05-27'));
// console.log(hoursWorkedOnDate(rayRecord, '2021-05-26'));
// console.log(wagesEarnedOnDate(rayRecord, '2021-05-26'));
// console.log(allWagesFor(meganRecord));
// console.log(allWagesFor(rayRecord));

// console.log(calculatePayroll([meganRecord, rayRecord]));
// console.log(findEmployeeByFirstName([meganRecord, rayRecord], 'Ray'));