let continuousPath = '../Resources/continuous-data.json';
let categoricalPath = '../Resources/categorical-data.json';

function continuousDataBoxPlots(data) {
        let atts = Object.values(data['attribute_value']);
        let fn1s = Object.values(data['function_1_value']);
        let fn2s = Object.values(data['function_2_value']);
        let lsts = Object.values(data['lifestyle_value']);
        let attsPlot = {
            name: 'Introvert (-) vs Extrovert (+)',
            hoverinfo: 'none',
            y: atts,
            type: 'box'};
        let fn1sPlot = {
            name: 'Sensing (-) vs Intuitive (+)',
            hoverinfo: 'none',
            y: fn1s,
            type: 'box'};
        let fn2sPlot = {
            name: 'Thinking (-) vs Feeling (+)',
            hoverinfo: 'none',
            y: fn2s,
            type: 'box'};
        let lstsPlot = {
            name: 'Perceiving (-) vs Judging (+)',
            hoverinfo: 'none',
            y: lsts,
            type: 'box'};
        let layout = {
            yaxis: {range: [-100, 100]},
            height:250,
            margin: {
                t: 0,
                l: 25,
                r: 30,
                b: 25}};
        let config = {staticPlot: true};   
        Plotly.newPlot('attsPlot', [attsPlot], layout, config);
        Plotly.newPlot('fn1sPlot', [fn1sPlot], layout, config);
        Plotly.newPlot('fn2sPlot', [fn2sPlot], layout, config);
        Plotly.newPlot('lstsPlot', [lstsPlot], layout, config);     };

function compStats(data, key) {
    let length = Object.values(data[key]).length;
    let mean = Math.round(100*Object.values(data[key]).reduce((parSum, value) => parSum + value)/length)/100;
    let variance = Object.values(data[key]).reduce((parSum, value) => parSum + (value - mean)*(value - mean))/(length - 1);
    let SE = Math.round(100*Math.sqrt(variance/length))/100;
    return `Mean = ${mean} \xB1 ${SE}`;     }

function categoricalDataBarPlot(data) {
        let pcs = Object.values(data.personality_type);
        let classData = Object.values(data.class);
        let usaData = Object.values(data.usa);
        let classPlot = {
            name: 'DS Class',
            x: pcs,
            y: classData,
            type: 'bar'};
        let usaPlot = {
            name: 'United States',
            x: pcs,
            y: usaData,
            type: 'bar'};
        let layout = {
            margin: {
                t: 0,
                b: 50,
                l: 50,
                r: 0},
            barmode: 'group'};
        Plotly.newPlot('barPlot', [classPlot, usaPlot], layout);    };

function continuousDataInfo(data) {
    d3.select('#attMean').text(compStats(data, 'attribute_value'))
    d3.select('#fn1Mean').text(compStats(data, 'function_1_value'))
    d3.select('#fn2Mean').text(compStats(data, 'function_2_value'))
    d3.select('#lstMean').text(compStats(data, 'lifestyle_value'))    };

function init() {
    d3.json(continuousPath).then(function(continuousData) {
        d3.json(categoricalPath).then(function(categoricalData) {
            continuousDataInfo(continuousData);
            continuousDataBoxPlots(continuousData);
            categoricalDataBarPlot(categoricalData);    }     );     });     }

init()
