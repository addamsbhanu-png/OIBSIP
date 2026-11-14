
// ==============================
// GET HTML ELEMENTS
// ==============================

const form = document.getElementById("converterForm");

const temperatureInput = document.getElementById("temperature");

const celsiusResult = document.getElementById("celsius");

const fahrenheitResult = document.getElementById("fahrenheit");

const kelvinResult = document.getElementById("kelvin");

const errorMessage = document.getElementById("errorMessage");


// ==============================
// TEMPERATURE CONVERSION
// ==============================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get entered temperature
    const inputValue = temperatureInput.value.trim();

    // Check empty input
    if (inputValue === "") {

        showError("Please enter a temperature value.");

        return;
    }

    // Validate numeric input
    const numberPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;

    if (!numberPattern.test(inputValue)) {

        showError("Please enter a valid numeric value.");

        return;
    }

    const temperature = Number(inputValue);

    if (!Number.isFinite(temperature)) {

        showError("Please enter a valid temperature.");

        return;
    }

    // Get selected unit
    const selectedUnit = document.querySelector(
        'input[name="unit"]:checked'
    ).value;

    let celsius;
    let fahrenheit;
    let kelvin;


    // ==============================
    // CELSIUS CONVERSION
    // ==============================

    if (selectedUnit === "celsius") {

        if (temperature < -273.15) {

            showError(
                "Temperature cannot be below absolute zero (-273.15 °C)."
            );

            return;
        }

        celsius = temperature;

        fahrenheit = (temperature * 9 / 5) + 32;

        kelvin = temperature + 273.15;

    }


    // ==============================
    // FAHRENHEIT CONVERSION
    // ==============================

    else if (selectedUnit === "fahrenheit") {

        if (temperature < -459.67) {

            showError(
                "Temperature cannot be below absolute zero (-459.67 °F)."
            );

            return;
        }

        fahrenheit = temperature;

        celsius = (temperature - 32) * 5 / 9;

        kelvin = celsius + 273.15;

    }


    // ==============================
    // KELVIN CONVERSION
    // ==============================

    else if (selectedUnit === "kelvin") {

        if (temperature < 0) {

            showError(
                "Kelvin temperature cannot be negative."
            );

            return;
        }

        kelvin = temperature;

        celsius = temperature - 273.15;

        fahrenheit = (celsius * 9 / 5) + 32;

    }


    // ==============================
    // DISPLAY RESULTS
    // ==============================

    errorMessage.textContent = "";

    celsiusResult.textContent =
        celsius.toFixed(2) + " °C";

    fahrenheitResult.textContent =
        fahrenheit.toFixed(2) + " °F";

    kelvinResult.textContent =
        kelvin.toFixed(2) + " K";

});


// ==============================
// ERROR HANDLING FUNCTION
// ==============================

function showError(message) {

    errorMessage.textContent = message;

    celsiusResult.textContent = "—";

    fahrenheitResult.textContent = "—";

    kelvinResult.textContent = "—";

}


// ==============================
// CLEAR ERROR ON INPUT CHANGE
// ==============================

temperatureInput.addEventListener("input", function() {

    errorMessage.textContent = "";

});


// Clear error when changing unit

document.querySelectorAll('input[name="unit"]').forEach(function(radio) {

    radio.addEventListener("change", function() {

        errorMessage.textContent = "";

    });

});
