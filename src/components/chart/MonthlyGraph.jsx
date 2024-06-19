import { Line } from "react-chartjs-2"
import { registerables } from "chart.js"
import {format} from "date-fns"
import 'chartjs-adapter-date-fns';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins } from "chart.js"

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins, ...registerables)

const MonthlyGraph = ({urlData}) => {

    const monthlyCounts = urlData.reduce((acc, curr) => {
        const monthKey = format(new Date([curr.year, curr.month+1, curr.day]), 'yyyy-MM'); // Format for x-axis labels
        acc[monthKey] = acc[monthKey] || 0; // Initialize to 0 if key doesn't exist
        acc[monthKey]++;
        return acc;
    }, {});
    
    

    const labels = Object.keys(monthlyCounts);
    const hitCounts = Object.values(monthlyCounts)
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Monthly Count',
                data: hitCounts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5,
                pointHitRadius: 10,
                borderWidth: 1,
            }
        ]
    }

    const chartOptions = {
        scales: {
          x:
            {
              type: 'time',
              time: {
                unit: 'month',
                unitStepSize: 1,
                displayFormats: {
                  month: 'MMM yyyy',
                },
              },
              title: {
                display: true,
                align: 'center',
                text: 'Monthly',
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
        marginTop: "15px",
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

export default MonthlyGraph