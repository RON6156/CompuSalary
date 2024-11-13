$(document).ready(function () {
    $("#mySelect").select2({
        placeholder: "Select an option",
        allowClear: true
    });
});
// Function to calculate salary
function calculate() {
    // Get the selected currency value
    let currency = document.getElementById("mySelect").value;

    // Get the input values
    const ratePerDay = parseFloat(document.getElementById("dailyRate").value);
    const ratePerOT = parseFloat(document.getElementById("overtime").value);

    // Ensure the rates are valid numbers
    if (isNaN(ratePerDay) || isNaN(ratePerOT)) {
        alert("Please enter valid rate values.");
        return;
    }

    // Calculate special and legal holiday rates
    const specialHolidayRate = ratePerDay * 0.3;
    const legalHolidayRate = ratePerDay;

    // Get the days and overtime inputs
    let days = parseInt(document.getElementById("days").value);
    let overTime = parseInt(document.getElementById("ot").value);
    let specialHoliday = parseInt(document.getElementById("special").value);
    let legalHoliday = parseInt(document.getElementById("legal").value);

    // Ensure all inputs are valid numbers
    if (isNaN(days) || isNaN(overTime) || isNaN(specialHoliday) || isNaN(legalHoliday)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate each pay component
    let daily = ratePerDay * days;
    let ot = ratePerOT * overTime;
    let sp = specialHolidayRate * specialHoliday;
    let lh = legalHolidayRate * legalHoliday;

    // Round the results to two decimal places
    daily = daily.toFixed(2);
    ot = ot.toFixed(2);
    sp = sp.toFixed(2);
    lh = lh.toFixed(2);

    // Calculate gross pay and round to two decimal places
    let grossPay = (parseFloat(daily) + parseFloat(ot) + parseFloat(sp) + parseFloat(lh)).toFixed(2);

    // Create result HTML with rounded values and currency
    let resultHTML = `
        <div class="result-item">Regular Pay: ${currency} ${daily}</div>
        <div class="result-item">Overtime Pay: ${currency} ${ot}</div>
        <div class="result-item">Special Holiday Pay: ${currency} ${sp}</div>
        <div class="result-item">Legal Holiday Pay: ${currency} ${lh}</div>
        <div class="total">Total Salary: <br />
        ${currency} ${grossPay}</div>
    `;

    // Display the result and change the index of the result container to 1
    document.getElementById("result").style.display = "block"; // Show the result
    document.getElementById("result").innerHTML = resultHTML; // Insert the result HTML
}


