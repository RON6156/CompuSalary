// Select2 searchable dropdwon menu
$(document).ready(function () {
    $("#mySelect").select2({
        placeholder: "Select an option",
        allowClear: true
    });
});
function calculate() {
    // Get all the required input fields
    const dailyRateField = document.getElementById("dailyRate");
    const overtimeRateField = document.getElementById("overtime");
    const daysField = document.getElementById("days");
    const overtimeHoursField = document.getElementById("ot");
    const specialHolidayField = document.getElementById("special");
    const legalHolidayField = document.getElementById("legal");

    // Get the selected currency value
    let currency = document.getElementById("mySelect").value;

    // Check if currency is valid
    if (currency === "" || currency === "Select currency") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select a currency."
        });
        return; // Stop the function execution if currency is not selected
    }

    // Check if any field is empty
    if (
        !dailyRateField.value ||
        !overtimeRateField.value ||
        !daysField.value ||
        !overtimeHoursField.value ||
        !specialHolidayField.value ||
        !legalHolidayField.value
    ) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all fields."
        });
        return; // Stop the function execution if any field is empty
    }

    // Parse input values
    const ratePerDay = parseFloat(dailyRateField.value);
    const ratePerOT = parseFloat(overtimeRateField.value);
    const days = parseInt(daysField.value);
    const overTime = parseInt(overtimeHoursField.value);
    const specialHoliday = parseInt(specialHolidayField.value);
    const legalHoliday = parseInt(legalHolidayField.value);

    // Check if any parsed values are NaN (if parsing failed)
    if (
        isNaN(ratePerDay) ||
        isNaN(ratePerOT) ||
        isNaN(days) ||
        isNaN(overTime) ||
        isNaN(specialHoliday) ||
        isNaN(legalHoliday)
    ) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid numbers in all fields."
        });
        return; // Stop the function execution if any field contains invalid numbers
    }

    // Calculate holiday pay rates
    const specialHolidayRate = ratePerDay * 0.3;
    const legalHolidayRate = ratePerDay;

    // Calculate each pay component and round to two decimal places
    const daily = (ratePerDay * days).toFixed(2);
    const ot = (ratePerOT * overTime).toFixed(2);
    const sp = (specialHolidayRate * specialHoliday).toFixed(2);
    const lh = (legalHolidayRate * legalHoliday).toFixed(2);

    // Calculate gross pay and round to two decimal places
    const grossPay = (
        parseFloat(daily) +
        parseFloat(ot) +
        parseFloat(sp) +
        parseFloat(lh)
    ).toFixed(2);

    // Create result HTML with rounded values and currency
    const resultHTML = `
        <div class="result-item">Regular Pay: ${currency} ${daily}</div>
        <div class="result-item">Overtime Pay: ${currency} ${ot}</div>
        <div class="result-item">Special Holiday Pay: ${currency} ${sp}</div>
        <div class="result-item">Legal Holiday Pay: ${currency} ${lh}</div>
        <div class="total">Total Salary: ${currency} ${grossPay}</div>
    `;

    // Display success notification
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Signed in successfully"
    });

    // Display the result
    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = resultHTML;

    // Clear the input fields after calculation
    dailyRateField.value = "";
    overtimeRateField.value = "";
    daysField.value = "";
    overtimeHoursField.value = "";
    specialHolidayField.value = "";
    legalHolidayField.value = "";
}
