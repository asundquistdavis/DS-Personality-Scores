let continuousPath = '../Resources/continuous-data.json';
let categoricalPath = '../Resources/categorical-data.json';
let keyPath = '../Resources/key.json';

function histogram(data, demension, axis) {
    let dist = Object.values(data[`${demension}_value`]);
    let histData = {
        x: dist,
        xbins: {size: 10},
        type: 'histogram'};
    let histLayout = {
        xaxis: {
            title: {text: axis},
            range: [-100, 100]},
        margin: {
            t: 0,
            b: 50,
            l: 20,
            r: 0}   }
    Plotly.newPlot('hist', [histData], histLayout);    };

function barchart(data, demension, otherDemension) {
    d3.json(keyPath).then(key=>{
    let i = key;
    let allCategories = Object.keys(data.personality_type).map(function(c, i) {return [c, Object.keys(data.class)[i]]});
    let categories = allCategories.filter(function(c) {return c[0].split('')[0]})
    let barData = {
        y: [1,2],
        x: ['yes', 'no'],
        type: 'bar'
    };
    let barLayout = {};
    Plotly.newPlot('bar', [barData], barLayout);   });  };

function pieChart(data, demension) {
    let personality_types = Object.values(data.personality_type).map(function(d, i) {return [d, Object.values(data.class)[i]]});
    let pieData = {
        labels: personality_types.map(pt => pt[0]),
        values: personality_types.map(pt => pt[1]),
        type: 'pie'};
    let pieLayout = {};
    Plotly.newPlot('pie', [pieData], pieLayout);    };

let demension = d3.select('#demension').text();
let axis = d3.select('#axis').text();

function init(demension) {
    d3.json(keyPath).then(key => {
        let otherDemensions = Object.keys(key).filter(d => !(d==`${demension}_value`)).map(d => [d, key[d]]);
        let otherDemension = d3.select('#otherDemension');
        for (let i = 0; i < otherDemensions.length; i++) {
            let aDemensionText = otherDemensions[i][1]
            let aDemensionProp = otherDemensions[i][0]
            otherDemension.append('option').text(aDemensionText).property('value', aDemensionProp)
        let anotherDemension = otherDemension.property('value')
        d3.json(categoricalPath).then(data => {barchart(data, demension, anotherDemension); pieChart(data, demension);});
    };   });   };


d3.json(continuousPath).then(data => histogram(data, demension, axis));


init(demension);