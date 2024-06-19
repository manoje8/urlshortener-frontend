import { Line } from "react-chartjs-2"
import { registerables } from "chart.js"
import {format} from "date-fns"
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins } from "chart.js"

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins, ...registerables)


const DailyGraph = ({urlData}) => {

    const dailyCounts =  urlData.reduce((acc, curr) => {
        const dateKey = format(new Date(curr.year, curr.month, curr.day), "dd/MM/yyyy"); // Adjust for zero-based months
        acc[dateKey] = acc[dateKey] || 0; // Initialize to 0 if key doesn't exist
        acc[dateKey]++;
        return acc
    },{})

    const labels = Object.keys(dailyCounts);
    const hitCounts = Object.values(dailyCounts)

    console.log(labels);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Daily count",
                data: hitCounts,
                backgroundColor: 'rgb(150, 204, 255)',
                borderColor: 'rgb(0, 0, 139)',
                pointRadius: 5,
                pointHitRadius: 10,
                borderWidth: 1,
            }
        ]
    }

    const chartOptions = {
        layout: {
            padding: 20
        },
        scales: {
            x:
            {
                type: 'category',
                title: {
                    display: true,
                    align: 'center',
                    text: 'Daily',
                    color: 'black',
                    font: {
                        family: 'Helvetica Neue',
                        size: 14,
                        weight: 'bold',
                    },
                    padding: {
                        top: 10,
                        bottom: 5,
                        left: 0,
                        right: 0,
                    },
                },
            },
            y:
            {
                ticks: {
                    beginAtZero: true,
                    stepSize: 0.5,
                },
                title: 
                {
                    display: true,
                    align: 'center',
                    text: 'URL count',
                    color: 'black',
                    font: {
                        family: 'Helvetica Neue',
                        size: 14,
                        weight: 'bold',
                    },
                    padding: {
                        top: 10,
                        bottom: 5,
                        left: 0,
                        right: 0,
                    },
                },
            },
        },
    };


    const graphStyle = {
        height: "400px",
        width: "700px",
        fontFamily: "sans-serif",
    }
    return (
        <div style={graphStyle}>
            <Line options={chartOptions} data={chartData}/>
        </div>
    )
}

export default DailyGraph