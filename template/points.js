var x = [],
    y = [],
    features = [],
    sizes = [];

function drawPlot() {
    let pointsTrace = {
        x: x,
        y: y,
        mode: "markers",
        type: "scatter",
        marker: {
            size: sizes,
            color: "#ffffff",
            line: {
                width: 0,
            },
        },
    };

    var layout = {
        showlegend: false,
        xaxis: {
            visible: false,
        },
        yaxis: {
            visible: false,
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0,
        },
    };

    Plotly.newPlot("points", [pointsTrace], layout, { staticPlot: true });
}

function animatePlot() {
    Plotly.animate(
        "points",
        {
            data: [{ marker: { size: sizes } }],
        },
        {
            transition: {
                duration: 3000,
                easing: "linear-in-out",
            },
            frame: {
                duration: 3000,
            },
        }
    );
}

function processPoints(data) {
    for (var i in data) {
        row = data[i];
        x.push(row[0]);
        y.push(row[1]);
        features.push(row.slice(2));
        sizes.push(3);
    }

    drawPlot();
}

function enterCode() {
    code = document.getElementById("code").value;

    weights = [];
    for (var c in code) {
        w = code.charCodeAt(c) - 48;
        w = (2 * w - 10) / 10;
        weights.push(w);
    }

    for (var i in features) {
        feature = features[i];

        value = 0;
        for (var j in weights) value += weights[j] * feature[j];

        sizes[i] = value * 5;
    }

    animatePlot();
}

document.getElementById("codeForm").addEventListener("submit", (event) => {
    enterCode();

    event.preventDefault();
});

document.getElementById("enterCodeButton").addEventListener("click", (event) => {
    enterCode();

    event.preventDefault();
});

processPoints(points);
