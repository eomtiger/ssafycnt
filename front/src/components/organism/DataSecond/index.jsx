import BarChart from './../../molecules/dataSecond/ExportTop5/index'
import BarChartImport from './../../molecules/dataSecond/ImportTop5/index'

function DataSecond() {
  return (
      <div className="flex justify-between space-x-5 top-0 border-8 border--400">
      <BarChart />
      <BarChartImport />
      </div>
  );
}

export default DataSecond;
