// Select2 searchable dropdown menu
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

    // Show confirmation message before proceeding with calculations
    Swal.fire({
        title: "Confirmation",
        html: `
            <div style="text-align: left; font-size: 16px;">
                <div style="display: flex; justify-content: space-between;">
                    <span>Daily Rate:</span> <span>${ratePerDay}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Overtime Rate:</span> <span>${ratePerOT}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Number of Days:</span> <span>${days}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Overtime Hours:</span> <span>${overTime}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Special Holidays:</span> <span>${specialHoliday}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Legal Holidays:</span> <span>${legalHoliday}</span>
                </div>
            </div>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
            confirmButton: "btn btn-success",  // Green button for confirm
            cancelButton: "btn btn-danger"    // Red button for cancel
        }
    }).then((result) => {
        if (result.isConfirmed) {
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
                title: "Calculation completed successfully"
            });

            // Display the result
            Swal.fire({
                icon: "success",
                html: `
                    <div style="text-align: left; font-size: 16px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Regular Pay:</span> <span>${daily}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Overtime Pay:</span> <span>${ot}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Special Holiday Pay:</span> <span>${sp}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Legal Holiday Pay:</span> <span>${lh}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 24px; font-weight: bold;">
                            <span>Total Salary:</span> <span>${currency} ${grossPay}</span>
                        </div>
                    </div>`,
                showConfirmButton: true,
                confirmButtonText: "OK",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            }).then(() => {
                // Scroll to the top after confirming results
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });

            // Clear the input fields after calculation
            dailyRateField.value = "";
            overtimeRateField.value = "";
            daysField.value = "";
            overtimeHoursField.value = "";
            specialHolidayField.value = "";
            legalHolidayField.value = "";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelled",
                icon: "error"
            });
        }
    });
}
