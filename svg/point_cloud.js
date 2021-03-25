function readCode(code) {
    weights = [];
    for (var c in code) {
        w = code.charCodeAt(c) - 48;
        w = (2 * w - 10) / 10;
        weights.push(w);
    }

    return weights;
}

function applyCode(code) {
    weights = readCode(code);

    for (var i in features) {
        feature = features[i];

        value = 0;
        for (var j in weights) value += weights[j] * feature[j];

        document.getElementById(i).setAttribute("r", value * 2);
    }
}
