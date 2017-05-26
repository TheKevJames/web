var parseTime = d3.timeParse("%Y-%m-%d");

movingAvg = function(data, neighbors) {
    return data.map((val, idx, arr) => {
        let start = Math.max(0, idx - neighbors), end = idx/* + neighbors*/;
        let subset = arr.slice(start, end + 1);
        let sum = subset.reduce((a, b) => a + b);
        return sum / subset.length;
    })
}

drawChart = function(xValues, yValues, div, config) {
    var dates = xValues.slice(-config.days).map(parseTime);

    var daily = yValues.slice(-config.days);
    var daily = dates.map((e, i) => ({date: e, data: +daily[i]}));

    var weekly = movingAvg(yValues, 7).slice(-config.days);
    var weekly = dates.map((e, i) => ({date: e, data: +weekly[i]}));

    var monthly = movingAvg(yValues, 28).slice(-config.days);
    var monthly = dates.map((e, i) => ({date: e, data: +monthly[i]}));

    var x = d3.scaleTime().range([0, config.width]);
    var y = d3.scaleLinear().rangeRound([config.height, 0]);

    var straightLine = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.data));
    var curvedLine = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.data))
        .curve(d3.curveBasis);

    var [xMin, xMax] = d3.extent(dates);
    x.domain([xMin, xMax]);

    var yMax = Math.ceil(d3.max(daily.map(d => d.data)) / config.yIncr) * config.yIncr;
    y.domain([0, yMax]);

    var chart = div
        .append("svg")
            .attr("class", "chart")
            .attr("width", config.width + config.margin.left + config.margin.right)
            .attr("height", config.height + config.margin.top + config.margin.bottom)
        .append("g")
            .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");

    // lines
    chart.append('path')
        .datum(daily)
        .attr('d', straightLine);

    chart.append('path')
        .attr('class', 'weekly')
        .datum(weekly)
        .attr('d', curvedLine);

    // chart.append('path')
    //     .attr('class', 'monthly')
    //     .datum(monthly)
    //     .attr('d', curvedLine);

    // axes
    chart.append("g")
        .attr("transform", "translate(0, " + config.height + ")")
        .call(d3.axisBottom(x));
    chart.append("g").call(d3.axisLeft(y));
    chart.append("g")
        .attr("transform", "translate(" + config.width + ", 0)")
        .call(d3.axisRight(y));

    // axes labels
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(config.height / 2))
        .attr("y", -config.margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(config.yLabel);

    // target value
    if (config.yTarget != null) {
        chart.append("line")
            .attr("y1", y(config.yTarget))
            .attr("y2", y(config.yTarget))
            .attr("x1", x(xMin))
            .attr("x2", x(xMax));
    }
}

drawCalorieChart = function(dates, calories, div) {
    let config = {
        days: 14,

        yIncr: 100,
        yLabel: "Calories",
        yTarget: 1980,

        margin: {top: 20, right: 50, bottom: 50, left: 60},
        height: 160,
        width: 800,
    };

    drawChart(dates, calories, div, config);
}

drawCoffeeChart = function(dates, coffees, div) {
    let config = {
        days: 14,

        yIncr: 1,
        yLabel: "Coffees",

        margin: {top: 20, right: 50, bottom: 50, left: 60},
        height: 160,
        width: 800,
    };

    drawChart(dates, coffees, div, config);
}

drawDrinksChart = function(dates, drinks, div) {
    let config = {
        days: 14,

        yIncr: 1,
        yLabel: "Drinks",

        margin: {top: 20, right: 50, bottom: 50, left: 60},
        height: 160,
        width: 800,
    };

    drawChart(dates, drinks, div, config);
}
