import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { table } from "console";

import type { ChartData, ChartOptions,ScaleType } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {PolarArea} from  "react-chartjs-2"

import 'chart.js/auto';

interface LineProps {
    options:any ; // Import Chart from 'chart.js/auto' if necessary
    data:any;
  }
  
const Feedback = () => {
  let [name, setName] = useState<string | null>(localStorage.getItem("name"));
  let [feedback, setFeedback] = useState<string | null>(localStorage.getItem("feedback"));
  let [rating, setRating] = useState<string | null>(localStorage.getItem("rating"));
  let [areasOfImprovement, setAreasOfImprovement] = useState<string | null>(localStorage.getItem("areasOfImprovement"));

  let [conceptualUnderstanding, setConceptualUnderstanding] =  useState<any | null>(localStorage.getItem("ConceptualUnderstanding"))||0
  let [fundamentals,setFundamentals] = useState<any | null>(localStorage.getItem("Fundamentals"))||0
  let [criticalThinking,setCriticalThinking] =useState<any | null>(localStorage.getItem("CriticalThinking"))||0


  const chartData: ChartData<'polarArea'> ={
    labels: [
      'Conceptual Understanding',
      'Fundamentals',
      'Critical Thinking'
    ],
    datasets: [{
      label: 'Your Scorecard',
      data: [+conceptualUnderstanding, +fundamentals, +criticalThinking],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)'
      ]
    }]
  };
  
  const chartOptions: ChartOptions<'polarArea'> = {
    scales: {
      y: {
        type: 'radialLinear', // Ensure that the scale type is set to 'linear' for a line chart
        beginAtZero: true,
      },
      r: {
        angleLines: {
          display: true,
          color:"#ffffff"
        },
        // Customize font color for the labels here
        pointLabels: {
          color: '#ffffff', // Change font color to blue
        }
      }
    },
  };
  return (
    <div style={{display:"flex", flexDirection:"column",color:"white",border:"1px solid rgba(24, 134, 121)", backgroundColor: 'rgba(9, 111, 111, 0.5)'}} className="bg-base-100">
      <table className="w-8/12 mt-20 bg-white m-auto" style={{borderRadius:10, backgroundColor: 'rgba(9, 111, 111, 0.5)'}}>
        <caption className="caption-top text-3xl font-bold p-6 rounded-t-xl">
          Summary Of {name}'s Interview
        </caption>
        <tbody className="text-left">
          <tr className="" style={{border:"none"}}>
            <td className="py-5 px-4 font-bold bg-gray-100" style={{fontStyle:"italic"}}>Rating</td>
            <td className="py-5 px-4  text-2xl" style={{fontStyle:"italic"}}>{rating}</td>
          </tr>
          <tr className="">
            <td className="py-5 px-4 font-bold bg-gray-100 " style={{fontStyle:"italic"}}>Feedback</td>
            <td className="py-5 px-4 " style={{fontStyle:"italic"}}>{feedback}</td>
          </tr>
          <tr className=" rounded-b-xl ">
            <td className="py-5 px-4 font-bold bg-gray-100 rounded-bl-xl " style={{fontStyle:"italic"}}>Areas Of Improvement</td>
            <td className="py-5 px-4 rounded-br-xl" style={{fontStyle:"italic"}}>{areasOfImprovement}</td>
          </tr>
        </tbody>
      </table>
      <div style={{marginTop:20,padding:5, border:"1px solid rgba(24, 134, 121)",borderRadius:10, backgroundColor: 'rgba(9, 111, 111, 0.5)',display:"flex",justifyContent:"center"}} className="mx-auto lg:w-2/4 md:w-5/12 sm:w-10/12 mb-10">
      <PolarArea data={chartData} options={chartOptions} />
      </div>
      
    </div>
  )
}

export default Feedback;