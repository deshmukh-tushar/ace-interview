import type { ChartData, ChartOptions,ScaleType } from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { isElement } from 'react-dom/test-utils';

export default function ProgressChart(){
    const storedOverall = localStorage.getItem("overall") || "[]";

    const [overall, setOverall] = useState<{rating:string}[]>(JSON.parse(storedOverall));

    const  setNames = ()=>{
        const scores:any[] = []

       const namesArray= overall.map((ele,ind)=>{
        scores.push(+ele.rating)
        return `Interview ${ind+1}`
   
        })
        return {"namesArray":namesArray,"scores":scores,"count":overall.length}
    }
    const sum = overall.reduce((accumulator, item) => accumulator + parseInt(item.rating), 0);

// Calculate the average
const average = sum / overall.length;

    const chartData: ChartData<'line'> ={
        labels: [
         ...setNames().namesArray
        ],
        datasets: [{
          label: `Your Overall Score: ${average}`,
          data: [...setNames().scores]
        }]
      };
      
      const chartOptions: ChartOptions<'line'> = {
        scales: {
          y: {
            type: 'linear', // Ensure that the scale type is set to 'linear' for a line chart
            beginAtZero: true,
          },
        },
      };
    return (
        <div className='h-screen flex center items-center' style={{display:"flex", flexDirection:"column",color:"white",border:"1px solid rgba(24, 134, 121)", backgroundColor: 'rgba(9, 111, 111, 0.5)'}}>
          <div style={{marginTop:20,padding:5,borderRadius:10,display:"flex",justifyContent:"center"}} className="mx-auto lg:w-2/4 md:w-5/12 sm:w-10/12 mb-10">
             <Line data={chartData} options={chartOptions} />
             </div>
        </div>
    )
}