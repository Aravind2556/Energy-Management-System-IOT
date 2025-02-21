import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomApexChart = ({ data, title, lineStyle, lineWidth, chartType, controls }) => {
    // console.log(data, title, lineStyle, lineWidth, chartType, controls)
    // Flatten all x-axis values from each series and compute the overall min and max.
    const allXValues = data.flatMap(serie => serie["x-axis"]);
    const xMin = Math.min(...allXValues);
    const xMax = Math.max(...allXValues);
    const sortedXValues = [...allXValues].sort((a, b) => a - b);
    const initialMin = sortedXValues.length > 50 ? sortedXValues[sortedXValues.length - 50] : sortedXValues[0];

    // Convert each data object into a series object expected by ApexCharts.
    const series = data.map((serie, index) => {
        // Combine the "x-axis" and "y-axis" arrays into an array of { x, y } objects.
        const seriesData = serie["x-axis"].map((x, i) => ({
            x,
            y: serie["y-axis"][i]
        }));

        return {
            name: serie.seriesName,
            data: seriesData,
            ...(serie.color && { color: serie.color }) // Include color if provided.
        };
    });

// Chart configuration options with dynamic x-axis range.
const options = {
    chart: {
        height: 350,
        type: chartType,
        zoom: {
            enabled: controls?.zoomEnabled !== undefined ? controls.zoomEnabled : true,
            type: controls?.zoomType || 'x', // 'x', 'y', or 'xy'
            autoScaleYaxis: controls?.autoScaleYaxis !== undefined ? controls.autoScaleYaxis : true
        },
        toolbar: {
            show: controls?.show !== undefined ? controls.show : true,
            tools: {
                download: controls?.download !== undefined ? controls.download : true,
                selection: controls?.selection !== undefined ? controls.selection : true,
                zoom: controls?.zoom !== undefined ? controls.zoom : true,
                zoomin: controls?.zoomin !== undefined ? controls.zoomin : true,
                zoomout: controls?.zoomout !== undefined ? controls.zoomout : true,
                pan: controls?.pan !== undefined ? controls.pan : true,
                reset: controls?.reset !== undefined ? controls.reset : true
            },
            autoSelected: controls?.autoSelected || 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: lineStyle,
        width: lineWidth
    },
    title: {
        text: title,
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        }
    },  
    xaxis: {
        type: 'datetime',
        tickAmount: 50, // Increase this number to show more ticks
        labels: {
            formatter: (value) => new Date(value).toLocaleString(),
            rotate: -45  // Rotate labels if they overlap
        },
        min: initialMin,
        max: xMax
    }
};

return (
    <div>
        <div id="chart">
            <ReactApexChart key={chartType} options={options} series={series} height={350} type={chartType} width={"100%"}/>
        </div>
        <div id="html-dist"></div>
    </div>
);
};

export default CustomApexChart;