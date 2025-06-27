// 1. Create a single employee record from array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// 2. Create multiple employee records
function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}

// 3. Time in
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });
  return this;
}

// 4. Time out
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });
  return this;
}

// 5. Hours worked on date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(e => e.date === date);
  const timeOut = this.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Wages on date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// 7. Use this ONLY if allWagesFor is not provided — otherwise comment it out
// const allWagesFor = function () {
//   const dates = this.timeInEvents.map(e => e.date);
//   return dates.reduce((total, d) => total + wagesEarnedOnDate.call(this, d), 0);
// };

// 8. Find by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(rec => rec.firstName === firstName);
}

// 9. Calculate full payroll
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, record) => {
    return total + allWagesFor.call(record);
  }, 0);
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

