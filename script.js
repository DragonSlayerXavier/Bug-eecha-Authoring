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
 * A function that generates an array of input descriptions from form data.
 * @returns {Array} Array of input descriptions
 */
function generateDescArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("in_desc")[i].value);
    }
    return array;
}

/**
 * A function that generates an array of booleans based on which functions reward hearts.
 * @returns {Array} Array of booleans based on which functions reward hearts.
 */
function generateHeartArray() {
    var array = [];
    for (var i = 0; i < 3; i++) {
        array.push(document.getElementsByName("heart")[i].checked);
    }
    return array;
}

/**
 * A function that generates an array of input labels from form data.
 * @returns {Array} Array of input labels
 */
function generateLabelArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("in_label")[i].value);
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
    var desc_array = generateDescArray();
    var heart_array = generateHeartArray();
    var label_array = generateLabelArray();
    var json = {
        "count": parseInt(document.getElementById("count").value),
        "futile": parseInt(document.getElementById("futile").value),
        "in": type_array,
        "in_desc": desc_array,
        "in_label": label_array,
        "out": document.getElementById("out").value,
        "out_desc": document.getElementById("out_desc").value,
        "question": document.getElementById("question").value,
        "code": document.getElementById("code").value,
        "customValidate": customValidation(),
        "valFunc": {
            "arguments": inp_array,
            "body": document.getElementById("valFunc").value
        },
        "correct": {
            "arguments": inp_array,
            "body": document.getElementById("F4").value
        },
        "incorrect": [
            {
                "heart": heart_array[0],
                "arguments": inp_array,
                "body": document.getElementById("F1").value
            },
            {
                "heart": heart_array[1],
                "arguments": inp_array,
                "body": document.getElementById("F2").value
            },
            {
                "heart": heart_array[2],
                "arguments": inp_array,
                "body": document.getElementById("F3").value
            }
        ]
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