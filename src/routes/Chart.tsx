import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
interface ChartProps {
	coinId: string;
}
interface IHistorical{
	"time_open":number;
	"time_close":number;
	"open":string;
	"high":string;
	"low":string;
	"close":string;
	"volume":string;
	"market_cap":number;
}
function Chart({coinId}: ChartProps){
	const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId], ()=>fetchCoinHistory(coinId),{
		refetchInterval:10000,
	});
	return (
		<div>
			{isLoading ? "Loading chart..." :
				(<ApexChart
					type="line"
					series={[
						{
							name:"Price",
							data: data?.map(item=>parseFloat(item.close)) || [],
						},
					]}
				    options={{
						chart:{
							background: 'transparent',
							height: 500,
							width: 500,
							offsetX: 0,
							offsetY: 0,
							toolbar: {
        					show: false,
        					},
						},
						theme:{
							mode:"dark",
						},
						stroke: {
							show: true,
							curve: 'smooth',
							lineCap: 'butt',
							colors: undefined,
							width: 4,
							dashArray: 0,      
						},
						grid: {
							show: false,
						},
						xaxis: {
							axisBorder: {show: false},
							axisTicks:{show:false},
							labels:{
								show: false,
							},
							type:"datetime",
							categories: data?.map(item=>new Date(item.time_close*1000).toUTCString()),
						},
						yaxis: {
							labels:{
								show: false,
							}
						},
						fill: {
						  type: 'gradient' ,
						  gradient: {gradientToColors:["#0be881"], stops:[0,100]},
						},
						colors:["0fbcf9"],
						tooltip: {
							y: {
								formatter: (value)=>`${value.toFixed(2)}`
							}
						},
						
					}}
				/>)
			}
		</div>
	);
}
export default Chart;