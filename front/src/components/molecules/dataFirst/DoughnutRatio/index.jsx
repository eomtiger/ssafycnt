import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


ChartJS.defaults.font.family = "munchebu.ttf"             // Chart 이내 글자체 통일
function NationRatio() {
    const labels = ['수출', '수입']
    const values = [50, 25]
    const sumValues = values[0] + values[1]

    const data = {
        labels,
        datasets: [
            {
                data: values,
                datalabels: {
                    formatter: function(value) { return ((value/ sumValues)*100).toFixed(1).toString() + '%'}
                },
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
            }
        ],
    }

    const options = {
        responsive: false, //크기 변경을 위함
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                },
            },
            datalabels: {
                color: '#ffffff', 
                font: {
                    weight: 'bold',
                    size: 24,
                }
            }
        }
    }
    
    return (
        <div>
            <div className='flex justify-between items-center ml-2 text-left'>
                <div>
                    <div className='mt-1 font-bold text-xl font-mun'>수출입 비중</div>
                </div>
                <div className='flex w-40 h-8 justify-center items-center bg-[#f3f4f6] font-bold text-xs'>
                    <p className='text-[#4b5563] font-mun'>수출금액</p>
                    <p className='ml-4 font-mun'>단위: 백만달러</p>
                </div>
            </div>
            <Doughnut options={options} data={data} width={400} height={300} />
        </div>
    )
  }

export default NationRatio;