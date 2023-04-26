function generateTypeArray() {
    var array = [];
    for (var i = 0; i < data.count; i++) {
        array.push(data.in[i]);
    }
    return array;
}

function generateInputArray() {
    var array = [];
    for (var i = 0; i < data.count; i++) {
        array.push(data.var[i]);
    }
    return array;
}

function generateDescArray() {
    var array = [];
    for (var i = 0; i < data.count; i++) {
        array.push(data.in_desc[i]);
    }
    return array;
}

function generateHeartArray() {
    var array = [];
    if (data.heart == undefined) return array;
    for (var i = 1; i <= 3; i++) {
        array.push(data.heart.includes(i.toString()));
    }
    return array;
}

function generateLabelArray() {
    var array = [];
    for (var i = 0; i < data.count; i++) {
        array.push(data.in_label[i]);
    }
    return array;
}

function customValidation() {
    return data.customValidate == undefined ? false : true;
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