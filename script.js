function addInput() {
    var count = parseInt(document.getElementById("count").value);
    if (count < 100) {
        count++;
        document.getElementById("count").value = count;
        var newDiv = document.createElement("div");
        newDiv.innerHTML =
            `<span>Argument ${count}:</span>` +
            "<select name=\"in\"> <option value=\"unselected\">Select Type</option> <option value=\"string\">String</option> <option value=\"number\">Number</option> <option value=\"num_array\">Number Array</option> <option value=\"sorted_num_array\">Sorted Number Array</option> <option value=\"str_array\">String Array</option> </select>" +
            "<input type=\"text\" name=\"var\" placeholder=\"Argument Name\" required=\"required\"/>"
        document.getElementById("inputs").appendChild(newDiv);
    }
}

function addFunc() {
    var count = parseInt(document.getElementById("numFunc").value);
    if (count < 100) {
        count++;
        document.getElementById("numFunc").value = count;
        var newDiv = document.createElement("div");
        newDiv.innerHTML =
            `<span>Incorrect Function ${count}:</span>` +
            `<textarea id="F${count}" name="incorrect" placeholder="Enter incorrect function here" required></textarea><br>` +
            `<label for="F${count}Heart">Reward a life?</label>` +
            `<input type="checkbox" id="F${count}Heart" name="heart" value="${count}"><br></br>`
        document.getElementById("functions").appendChild(newDiv);
    }
}

/**
 * A function that generates an array of input types from form data.
 * @returns {Array} Array of input types
 */
function generateTypeArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("in")[i].value);
    }
    return array;
}

/**
 * A function that generates an array of input variable names from form data.
 * @returns {Array} Array of input variable names
 */
function generateInputArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("var")[i].value);
    }
    return array;
}

/**
 * A function that generates an array of booleans based on which functions reward hearts.
 * @returns {Array} Array of booleans based on which functions reward hearts.
 */
function generateHeartArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("numFunc").value); i++) {
        array.push(document.getElementsByName("heart")[i].checked);
    }
    return array;
}

function generateIncorrectArray(hearts, input) {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("numFunc").value); i++) {
        array.push({
            "heart": hearts[i],
            "arguments": input,
            "body": document.getElementsByName("incorrect")[i].value
        })
    }
    return array;
}

/**
 * A function that returns whether or not the user wants to use custom validation.
 * @returns {Boolean} Whether or not the user wants to use custom validation.
 */
function customValidation() {
    return document.getElementById("customValidate").checked;
}

/**
 * A function that generates a JSON object from form data.
 * @returns {JSON} The generated JSON object.
 */
function generateJSON() {
    var type_array = generateTypeArray();
    var inp_array = generateInputArray();
    var heart_array = generateHeartArray();
    var incorrect_array = generateIncorrectArray(heart_array, inp_array);
    var json = {
        "count": parseInt(document.getElementById("count").value),
        "numFunc": parseInt(document.getElementById("numFunc").value),
        "futile": parseInt(document.getElementById("futile").value),
        "in": type_array,
        "out": document.getElementById("out").value,
        "question": document.getElementById("question").value,
        "code": document.getElementById("code").value,
        "customValidate": customValidation(),
        "valFunc": {
            "arguments": inp_array,
            "body": document.getElementById("valFunc").value
        },
        "correct": {
            "arguments": inp_array,
            "body": document.getElementsByName("correct")[0].value
        },
        "incorrect": incorrect_array
    }
    return json;
}

/**
 * A function that runs the generateJSON function and displays the result.
 */
function runFunc() {
    var generated = generateJSON();
    document.getElementById("JSON").innerHTML = "The generated JSON: \n" + JSON.stringify(generated, null, 2);
}