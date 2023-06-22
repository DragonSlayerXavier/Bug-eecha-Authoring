function showGuidelines() {
    alert("Here are some guidelines to follow:\n\n" +
        "1. The function name should be a single word.\n" +
        "2. Please ensure that the function body for all executable functions only includes the function body. (i.e. no function signature)\n" +
        "Please note that this includes the validation function, correct function, and all incorrect functions.\n" +
        "3. Please make sure that the functions return values instead of printing them or using console.log.\n" +
        "4. Please make sure that the function body is valid JavaScript code.\n" +
        "5. For the display code (the Solution field), you may use whatever language you are using in your course.\n" +
        "(You may use pseudocode. This code does not need to be executable)\n" +
        "6. Please use line breaks to break lines in the display code. This will be translated to \\n in the JSON.\n" +
        "(There is no need to do this manually)\n" +
        "7. Please use \\t to denote a tab in the display code.\n" +
        "One \\t denotes one level of indentation. Please use as many of them as needed before each line.\n" +
        "CONTINUED IN THE NEXT ALERT BOX")
    alert("8. The question text supports markdown. You can use bold, italic, strikethrough, inline code and links.\n" +
        "Surround text in asterisks to make it *italic*, double asterisks to make it **bold**, double tildes to make it ~~strikethrough~~, backticks to make it `inline code`,  and square brackets to make it a [link text](link address).\n" +
        "9. If you would like asterisks to show up, please put a backslash before them (\\*).\n" +
        "10. The markdown supports ordered and unordered lists.\n" +
        "To make an ordered list, start each line with a number followed by a period. Please make sure that the first line of the list starts with a double space and that the line preceding the list ends in a double space.\n" +
        "To make an unordered list, start each line with a dash. Please make sure that the first line of the list starts with a double space and that the line preceding the list ends in a double space.\n" +
        "Please note that ordered lists may only start from 1. in every instance.\n" +
        ""
    );
}

function addInput() {
    var count = parseInt(document.getElementById("count").value);
    if (count < 100) {
        count++;
        document.getElementById("count").value = count;
        var newDiv = document.createElement("div");
        newDiv.innerHTML =
            `<span>Argument ${count}:</span>` +
            "<select name=\"in\"> <option value=\"unselected\">Select Type</option> <option value=\"string\">String</option> <option value=\"number\">Number</option> <option value=\"num_array\">Number Array</option> <option value=\"sorted_num_array\">Sorted Number Array</option> <option value=\"str_array\">String Array</option> <option value=\"boolean\">Boolean</option> </select>" +
            "<input type=\"text\" name=\"var\" placeholder=\"Argument Name\" required=\"required\"/>"
        document.getElementById("inputs").appendChild(newDiv);
    }
}

function removeInput() {
    var count = parseInt(document.getElementById("count").value);
    if (count > 0) {
        count--;
        document.getElementById("count").value = count;
        var inputs = document.getElementById("inputs");
        inputs.removeChild(inputs.lastChild);
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

function removeFunc() {
    var count = parseInt(document.getElementById("numFunc").value);
    if (count > 0) {
        count--;
        document.getElementById("numFunc").value = count;
        var functions = document.getElementById("functions");
        functions.removeChild(functions.lastChild);
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
        "name": document.getElementById("funName").value,
        "count": parseInt(document.getElementById("count").value),
        "numFunc": parseInt(document.getElementById("numFunc").value),
        "futile": parseInt(document.getElementById("futile").value),
        "in": type_array,
        "out": document.getElementById("out").value,
        "question": document.getElementById("question").value.split('\*').join('*'),
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
    document.getElementById("JSON").innerHTML = "The generated JSON: \n" + JSON.stringify(generated, null, 2).split('<').join('&lt;').split('>').join('&gt;');
}