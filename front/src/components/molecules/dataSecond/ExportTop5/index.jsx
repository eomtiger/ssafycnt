import Chart from 'chart.js/auto';  // Uncaught Error: "category" is not a registered scale
import { Line } from 'react-chartjs-2'

function ExportTop5() {
    
    const labels = ['자동차', '가전제품', '반도체', '김치', '합성수지']    // Top5 품목
    const value = [807, 700, 600, 432, 234]                             // Top5 품목 수출량

    const options = {
        indexAxis: 'y',
        responsice: false,
        plugins: {
            tooltip: {
              enabled: false        // 그래프 호버시, 모달창 안나오게 하기
            },
            title: {
                display: true,
                text: '수출 Top 5 품목'
            },
            legend: {               // 범례 스타일링
                display: false
            },
        },
        scales: {                   // x축 y축에 대한 설정
            x: {
                axis: 'x',
                
                border:{dash: [4, 4]},
                grid: {
                    drawTicks: false,
                },
            },
            y: {
                axis: 'y',
                grid: {
                    display: false,
                },
            },
        }
      };

    const data = {
      labels,
      datasets: [
          {
            axis: 'y',
            type: 'bar',
              label: '수출 Top 5 품목',
            // borderColor: 'rgb(53, 162, 235, 0.5)',
            // borderWidth: 3,
            // backgroundColor: 'rgba(53, 162, 235, 0.5)',
            backgroundColor: 'rgba(240, 240, 240)',
            data: value,
            },
      ],
    };

    return (
        <div className='chart3Container'>
            <Line options={options} data={data} width={400} height={300} />
        </div>
    )
  }

export default ExportTop5;