var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['12:00', '', '', '', '', '','','','6:00','','','','','','','','12:00','','','','','','','','','','6:00'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [0, 0,0,0,0, 800, 400,0,100,0,100,450,250,150,0,100,0,100,0,250,50,289,480,270,200,0,50], // Add four zeros for the extra bars
                backgroundColor: '#8099FF',
                borderColor: '#8099FF',
                borderWidth: 1,
                barPercentage: 0.3,
                categoryPercentage: 1.9,
            },
            {
                label: 'Dataset 2',
                data: [0, 0, 0, 0, 0, 100, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,230,710,310,210,0,0], // Add four zeros for the extra bars
                backgroundColor: function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return index < 3 ? 'rgba(52,176,9,0.5)' : (index > 5 ? 'rgba(255,0,0,0.5)' : 'rgba(52,176,9,0.5)');
                },
                borderColor:  function(context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return index < 3 ? 'rgba(52,176,9,1)' : (index > 5 ? 'rgba(255,0,0,1)' : 'rgba(52,176,9,1)');
                },
                borderWidth: 1,
                barPercentage: 0.3,
                categoryPercentage: 1.9,
            },
        ]
    },
    options: {
        scales: {
            x: {
                stacked: true,
                barThickness: 40, // Adjust the distance between bars
                
            },
            y: {
                stacked: true,
                display: false, // Hide the y-axis
                max: 900 // Set the maximum value of the y-axis
            }
        },
        plugins: {
            legend: {
                display: false // Hide the legend
            },
            title: {
                display:false,
                text: 'Stacked Bar Chart with Rounded Top Corners'
            }
         
        },
        layout: {
            padding: {
                top: 20
            }
        },
        animation: {
            onComplete: function () {
                console.log(this.chart); // Add this line for debugging
                var chartInstance = this.chart;
                if (!chartInstance) {
                    console.error("Chart instance is undefined");
                    return;
                }
                
                var ctx = chartInstance.ctx;
                if (!ctx) {
                    console.error("Context (ctx) is undefined");
                    return;
                }
        
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
        
                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    if (!meta) {
                        console.error("Meta data is undefined for dataset " + i);
                        return;
                    }
        
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];
                        if (data > 0) {
                            var x = bar.x;
                            var y = bar.y;
                            ctx.fillText(data, x, y - 5);
                        }
                    });
                });
            }
        },
        
         elements: {
            bar: {
                borderSkipped: 'bottom',
                borderRadius: {
                    topLeft: 10,
                    topRight: 10,
                    bottomLeft: 0,
                    bottomRight: 0
                },
                borderWidth: 2,
                barThickness: 2 // Adjust the thickness of the bars
            }
        }
    }
});

// Ensure that the onComplete function is called only after the chart is fully initialized
myChart.canvas.parentNode.style.height = '300px'; // Example adjustment to ensure the canvas has a height

// Call onComplete function after a delay to ensure chart is fully initialized
setTimeout(function() {
    myChart.options.animation.onComplete.call(myChart);
}, 500); // Adjust the delay as needed