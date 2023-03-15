import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
  
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
)

function ImportTop5() {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: '369',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                borderWidth: 1,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            }
        ]
    }

    // const horizontalBackgroundPlugin = {
    //     id: 'horizontalBackgroundPlugin',
    //     beforeDatasetsDraw(chart, args, plugins) {
    //         const { ctx, data, chartArea: { top, bottom, left, right, width, height },
    //             scales: { x, y } } = chart;
            
    //         const barPercentage = data.datasets[0].barPercentage || 0.9
    //         const categoryPercentage = data.datasets[0].categoryPercentage || 0.8
    //         const barThickness = height / data.labels.length * categoryPercentage
            
    //         ctx.save();
    //         ctx.fillStyle = 'lightgray';
    //         data.labels.forEach((bar, index) => {
    //             ctx.fillRect(left, y.getPixelForValue(index) - barThickness / 2, width, 10)
    //         })
    //         ctx.restore()
    //     }
    // }

    const horizontalBackgroundPlugin = {
        id: 'horizontalBackgroundPlugin',
        beforeDatasetsDraw(chart, args, plugins) {
          const {
            ctx,
            data,
            chartArea: { top, bottom, left, right, width, height },
            scales: { x, y },
          } = chart;
      
          const barPercentage = data.datasets[0].barPercentage || 0.9;
          const categoryPercentage = data.datasets[0].categoryPercentage || 0.8;
          const barThickness = height / data.labels.length * categoryPercentage;
      
          ctx.save();
          data.datasets[0].data.forEach((value, index) => {
            ctx.fillStyle = 'rgba(240, 240, 240, 0.2)'
            ctx.fillRect(
              left,
              y.getPixelForValue(index) - barThickness / 2,
              width * value / 100,
              barThickness,
            );
          });
          ctx.restore();
        },
      };
    ChartJS.register(horizontalBackgroundPlugin)
    const options = {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: [horizontalBackgroundPlugin]
    }

    return (
        <div>
            <p>dd</p>
        </div>
    )
}

export default ImportTop5;