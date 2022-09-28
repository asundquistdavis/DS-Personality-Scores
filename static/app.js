let jsonPath1 = '../Resources/test.json';
let jsonPath2 = '../Resources/test2.json';

function continuousDataBoxPlots(jsonPath) {
    d3.json(jsonPath).then(function(data) {
        atts = Object.values(data['attribute_value']);
        fn1s = Object.values(data['function_1_value']);
        fn2s = Object.values(data['function_2_value']);
        lsts = Object.values(data['lifestyle_value']);
        attsPlot = {
            name: 'Extrovert (negative) vs Introvert (positive)',
            hoverinfo: 'none',
            legendrank: 0,
            y: atts,
            type: 'box'};
        fn1sPlot = {
            name: 'Sensing (negative) vs Intuitive (positive)',
            hoverinfo: 'none',
            legendrank: 1,
            y: fn1s,
            type: 'box'};
        fn2sPlot = {
            name: 'Thinking (negative) vs Feeling (positive)',
            hoverinfo: 'none',
            legendrank: 2,
            y: fn2s,
            type: 'box'};
        lstsPlot = {
            name: 'Perceiving (negative) vs Judging (positive)',
            hoverinfo: 'none',
            legendrank: 3,
            y: lsts,
            type: 'box'};
        layout= {
            title: 'Needs a Title',
            height:250,
            margin: {
                t: 30,
                l: 25,
                r: 20,
                b: 25}};       
        Plotly.newPlot('attsPlot', [attsPlot], layout);
        Plotly.newPlot('fn1sPlot', [fn1sPlot], layout);
        Plotly.newPlot('fn2sPlot', [fn2sPlot], layout);
        Plotly.newPlot('lstsPlot', [lstsPlot], layout);})};
        
        fn1sPlot, fn2sPlot, lstsPlot

function categoricalDataBarPlot(jsonPath) {
    d3.json(jsonPath).then(function(data) {
        let pcs = [];
        let classData = [];
        let usaData = [];
        for (let [pc, values] of Object.entries(data)) {
            pcs.push(pc);
            classData.push(values[1]);
            usaData.push(values[2]);};
        let classPlot = {
            name: 'Class',
            x: pcs,
            y: classData,
            type: 'bar'};
        let usaPlot = {
            name: 'United States',
            x: pcs,
            y: usaData,
            type: 'bar'};
        let layout = {
            title: 'Needs a Title',
            barmode: 'group'};
        Plotly.newPlot('barPlot', [classPlot, usaPlot], layout);})};

continuousDataBoxPlots(jsonPath1)

categoricalDataBarPlot(jsonPath2)