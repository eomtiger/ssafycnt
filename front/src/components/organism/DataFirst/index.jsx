import MoneyRatio from './../../molecules/dataFirst/MoneyRatio/index'
import WeightRatio from './../../molecules/dataFirst/WeightRatio/index'
import TradeInfo from './../../molecules/dataFirst/tradeInfo/index'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function DataFirst() {
    const useParam = useParams()
    let dataAll
    
    useEffect(() => {})
    axios.get('https://98320413-724a-44ba-a0b5-9b226001b6d6.mock.pstmn.io/api/nation/' + useParam.nationName + '/' + useParam.duration)
        .then(function (response) {
            dataAll = response.data
            console.log(dataAll)
            })
        .catch(function (error) {
            console.log(error)
        })
    
    return (
        <div className="flex justify-around items-center mt-5">
            <div className="w-auto flex justify-around">
                <MoneyRatio data={dataAll} />
                <WeightRatio data={dataAll} />
            </div>
            <TradeInfo data={dataAll} />
        </div>
    );
  }
  
  export default DataFirst;