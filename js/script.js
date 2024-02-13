// Function to generate the multiplication table
function generateTable() {
    var minYInput = document.getElementById('minYInput');
    var maxYInput = document.getElementById('maxYInput');
    var minXInput = document.getElementById('minXInput');
    var maxXInput = document.getElementById('maxXInput');

    // Get input values
    var minY = parseInt(minYInput.value);
    var maxY = parseInt(maxYInput.value);
    var minX = parseInt(minXInput.value);
    var maxX = parseInt(maxXInput.value);

    // Loop through the table and generate the multiplication table
    var table = document.createElement('table');
    table.className = 'table table-bordered';
    for (var r = minY - 1; r <= maxY; r++) {
        var row = document.createElement('tr');
        for (var c = minX - 1; c <= maxX; c++) {
            var cell = document.createElement('td');
            // Fill in the cells with multiplication values or labels
            if (r === minY - 1 && c === minX - 1) {
                cell.textContent = 'x';
            } else if (r === minY - 1) {
                cell.textContent = c;
            } else if (c === minX - 1) {
                cell.textContent = r;
            } else {
                cell.textContent = r * c;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    // Replace existing table with the new one
    var container = document.querySelector('.table-container');
    var oldTable = document.querySelector('table');
    if (oldTable) {
        container.removeChild(oldTable);
    }
    container.appendChild(table);
}

// function to reset input values and clear the table
function resetTable() {
    var minYInput = document.getElementById('minYInput');
    var maxYInput = document.getElementById('maxYInput');
    var minXInput = document.getElementById('minXInput');
    var maxXInput = document.getElementById('maxXInput');

    // Reset input values
    minYInput.value = '';
    maxYInput.value = '';
    minXInput.value = '';
    maxXInput.value = '';

    // Reset input borders and messages
    resetInput(minYInput);
    resetInput(maxYInput);
    resetInput(minXInput);
    resetInput(maxXInput);

    $("#multiplicationTable").validate().resetForm();       // clears the errors
    $("#minYSlider").slider("value", 0);                // resets the slider for minY
    $("#maxYSlider").slider("value", 0);                // resets the slider for maxY
    $("#minXSlider").slider("value", 0);                // resets the slider for minX
    $("#maxXSlider").slider("value", 0);                // resets the slider for maxX

    // Generates an empty table to clear existing table
    var table = document.createElement('table');
    table.className = 'table table-bordered';
    var container = document.querySelector('.table-container');
    var oldTable = document.querySelector('table');
    if (oldTable) {
        container.removeChild(oldTable);
    }
    container.appendChild(table);

    // This is to reset the sliders and input values to 0 and generate a 0x0 table
    // Set initial values to 0
    $("#minYInput, #maxYInput, #minXInput, #maxXInput").val(0);
    // Set slider initial values to 0
    $("#minYSlider, #maxYSlider, #minXSlider, #maxXSlider").slider("value", 0);
    generateTable();
}

// function to reset input border and messages
function resetInput(inputElement) {
    // Reset input message
    //look for the span id that matches the input id + 'Message' (e.g. minYInputMessage)
    var messageElement = document.getElementById(inputElement.id + 'Message');
    if (messageElement) {
        messageElement.textContent = '';
        messageElement.style.display = 'none'; // Hide the message
    }
}

$(document).ready(function () {
    // validation method to check if maxY is greater than minY
    jQuery.validator.addMethod("maxYgreaterThanMinY", function (value, element) {
        var minYInput = document.getElementById('minYInput');
        var maxYInput = document.getElementById('maxYInput');
        var minY = parseInt(minYInput.value);
        var maxY = parseInt(maxYInput.value);
        if (minY > maxY) {
            return false;
        } else {
            return true;
        }
    });

    // validation method to check if maxX is greater than minX
    jQuery.validator.addMethod("maxXgreaterThanMinX", function (value, element) {
        var minXInput = document.getElementById('minXInput');
        var maxXInput = document.getElementById('maxXInput');
        var minX = parseInt(minXInput.value);
        var maxX = parseInt(maxXInput.value);
        if (minX > maxX) {
            return false;
        } else {
            return true;
        }
    });

    // Initialize form validation
    $("#multiplicationTable").validate({
        // custom rules for each input
        rules: {
            minYInput: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxYInput: {
                required: true,
                number: true,
                maxYgreaterThanMinY: true
            },
            minXInput: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxXInput: {
                required: true,
                number: true,
                maxXgreaterThanMinX: true
            }
        },
        // custom messages for each possible errors
        messages: {
            minYInput: {
                required: "Please enter a value for minY.",
                number: "Please enter a valid number.",
                range: "Please enter a value between -50 and 50."
            },
            maxYInput: {
                required: "Please enter a value for maxY.",
                number: "Please enter a valid number.",
                maxYgreaterThanMinY: "Please enter a value greater than minY."
            },
            minXInput: {
                required: "Please enter a value for minX.",
                number: "Please enter a valid number.",
                range: "Please enter a value between -50 and 50."
            },
            maxXInput: {
                required: "Please enter a value for maxX.",
                number: "Please enter a valid number.",
                maxXgreaterThanMinX: "Please enter a value greater than minX."
            }
        }
    });


    // Slider for minimum value of Y
    $("#minYSlider").slider({
        // range: "min",
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            $("#minYInput").val(ui.value);
            resetInput(document.getElementById("minYInput"));
        }
    });

    // Slider for maximum value of Y
    $("#maxYSlider").slider({
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            $("#maxYInput").val(ui.value);
            resetInput(document.getElementById("maxYInput"));
        }
    });

    // Slider for minimum value of X
    $("#minXSlider").slider({
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            $("#minXInput").val(ui.value);
            resetInput(document.getElementById("minXInput"));
        }
    });

    // Slider for maximum value of X
    $("#maxXSlider").slider({
        min: -50,
        max: 50,
        value: 0,
        slide: function(event, ui) {
            $("#maxXInput").val(ui.value);
            resetInput(document.getElementById("maxXInput"));
        }
    });

    // Set initial values to 0
    $("#minYInput, #maxYInput, #minXInput, #maxXInput").val(0);

    // Set slider initial values to 0
    $("#minYSlider, #maxYSlider, #minXSlider, #maxXSlider").slider("value", 0);

    // lets the webpage auto-update the table
    // Add event listeners for input elements
    $("#minYInput, #maxYInput, #minXInput, #maxXInput").on("input", function () {
        generateTable();
    });

    // Add event listeners for sliders
    $("#minYSlider, #maxYSlider, #minXSlider, #maxXSlider").on("slidechange", function (event, ui) {
        generateTable();
    });

    // Trigger generatTable function when form is submitted
    generateTable();
    $("#submitBtn").click(function () {
        if ($("#multiplicationTable").valid()) {
            generateTable();
        }
    });

    // Trigger resetTable function when form is reset
    $("#resetBtn").click(function () {
        resetTable();
    });
});
