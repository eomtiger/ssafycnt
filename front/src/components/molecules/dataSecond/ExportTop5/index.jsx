import Chart from 'chart.js/auto';  // Uncaught Error: "category" is not a registered scale
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
  );

Chart.defaults.font.family = "munchebu.ttf"             // Chart 이내 글자체 통일

function ExportTop5() {
    let pickNation = '전세계'

    // 정렬된 순서로 들어와야함 (Top1 -> Top5)
    const labels = ['자동차', '가전제품', '반도체', '김치', '합성수지']    // Top5 품목
    let values = [807000000000, 700000000000, 600000000000, 432000000000, 234000000000]    // Top5 품목 수출량
    values = values.map(function(x) {
        return x / 1000000
      });

    const options = {
        indexAxis: 'y',
        plugins: {
            tooltip: {
                enabled: false        // 그래프 호버시, 모달창 안나오게 하기
            },
            legend: {               // 범례 스타일링
                display: false,
            },
            datalabels: {
                display: true,
            },
        },
        scales: {                   // x축 y축에 대한 설정
            x: {
                axis: 'x',
                border: {
                    dash: [4, 4],
                    display: false
                },
                grid: {
                    drawTicks: false,
                    color: function (context) {                 // 시작 y열 안보이게 하기
                        if (context.tick.value === 0) {
                            return 'rgba(0, 0, 0, 0)';
                        }
                        return 'rgba(0, 0, 0, 0.1)';
                    },
                },
            },
            y: {
                axis: 'y',
                border: {
                    display: false
                },
                grid: {
                    display: false,
                },
            },
        },

        onClick: function (evt, element) {
            if (element.length > 0) {
                console.log(labels[element[0]['index']])
            }
        }
    }
    
    const data = {
      labels,
      datasets: [
          {
            axis: 'y',
            type: 'bar',
            backgroundColor: 'rgba(240, 240, 240)',
            data: values,
            datalabels: {
                anchor:'end',
                align: 'right',
                color: 'black',
                formatter: function(value) { return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") },
            },
            },
      ],
    };

    return (
        <div>
            <div className='flex justify-between items-center ml-2 text-left'>
                <div>
                    <div className='mt-1 font-bold text-base text-gray-12'>{ pickNation }</div>                {/* 동적값으로 할당 해야함 */}               
                    <div className='mt-1 font-bold text-xl font-mun'>수출 Top 5</div>
                </div>
                <div className='flex w-40 h-8 justify-center items-center bg-[#f3f4f6] font-bold text-xs'>
                    <p className='text-[#4b5563] font-mun'>수출금액</p>
                    <p className='ml-4 font-mun'>단위: 백만달러</p>
                </div>
            </div>
            <Bar options={options} data={data} width={400} height={300} />
        </div>
    )
  }

export default ExportTop5;