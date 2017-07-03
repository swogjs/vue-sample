<template>
    <div id="chart">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Chart1 - bar</h3>
            </div>
            <div class="panel-body">
                <canvas id="myChart1" ></canvas>
            </div>
        </div>        
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Chart2 - radar</h3>
            </div>
            <div class="panel-body">
                <canvas id="myChart2" ></canvas>
            </div>
        </div>        
    </div>    
</template>
<script>
import Chart from 'chart.js'

export default {
    name: 'chart',
    data: function(){
        return {
            chart_data1: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]    
            },
            chart_data2:{
                labels:["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],
                datasets:[
                    {
                        label:"My First Dataset",
                        data:[65,59,90,81,56,55,40],
                        fill:true,
                        backgroundColor:"rgba(255, 99, 132, 0.2)",
                        borderColor:"rgb(255, 99, 132)",
                        pointBackgroundColor:"rgb(255, 99, 132)",
                        pointBorderColor:"#fff",
                        pointHoverBackgroundColor:"#fff",
                        pointHoverBorderColor:"rgb(255, 99, 132)"
                    },
                    {
                        label:"My Second Dataset",
                        data:[28,48,40,19,96,27,100],
                        fill:true,
                        backgroundColor:"rgba(54, 162, 235, 0.2)",
                        borderColor:"rgb(54, 162, 235)",
                        pointBackgroundColor:"rgb(54, 162, 235)",
                        pointBorderColor:"#fff",
                        pointHoverBackgroundColor:"#fff",
                        pointHoverBorderColor:"rgb(54, 162, 235)"
                    }
                ]
            }   
        }
    },
    mounted: function(){
        $('#bs-example-navbar-collapse-1').collapse('hide')
        
        var ctx1 = $('#myChart1')
        var myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: this.chart_data1,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            brginAtZero: true
                        }
                    }]
                }
            }
        })

        var ctx2 = $('#myChart2')
        var myChart2 = new Chart(ctx2, {
            type: 'radar',
            data: this.chart_data2,
            options: {
                maintainAspectRatio: false,
                elements:{
                    line:{
                        tension:0,
                        borderWidth:3
                    }
                }
            }
        })
    }
}
</script>
<style>
#chart{
    max-width: 100%;
   	background: #fff;
	position: relative;
	top: 0px;
	left: 0;
	width: 100%;
	z-index: 10;
}
</style>

