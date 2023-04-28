function generateTypeArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("in")[i].value);
    }
    return array;
}

function generateInputArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("var")[i].value);
    }
    return array;
}

function generateDescArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("in_desc")[i].value);
    }
    return array;
}

function generateHeartArray() {
    var array = [];
    for (var i = 0; i < 3; i++) {
        array.push(document.getElementsByName("heart")[i].checked);
    }
    return array;
}

function generateLabelArray() {
    var array = [];
    for (var i = 0; i < parseInt(document.getElementById("count").value); i++) {
        array.push(document.getElementsByName("in_label")[i].value);
    }
    return array;
}

function customValidation() {
    return document.getElementById("customValidate").checked;
}

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
        "customValidate": {
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

function runFunc() {
    var generated = generateJSON();
    document.getElementById("JSON").innerHTML = "The generated JSON: \n" + JSON.stringify(generated, null, 2);
}