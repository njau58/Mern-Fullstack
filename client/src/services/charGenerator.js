import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );




const charGenerator = ({categoryCount}) => {

  
    const options = {
        responsive: true,
        plugins: {
         
          legend: { display: false },
          title: {
            display: true,
            text: 'Categories by Percentages(%)',
          },
          labels:{
            display:false
          }
        },
      };


    const labels= ['Software', 'IT', 'GeneralSupplies', 'Pharmaceutical', 'Hotel&Hospitality', 'GeneralConsultancy', 'Building&Construction']

    const data={
      labels: labels,
      datasets: [
        { 
          
          backgroundColor: ['rgba(0, 0, 255, 1)', 'rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 200, 100, 1)','rgba(25, 200, 145, 1)','rgba(255, 78, 0, 200)','rgba(145, 20, 144, 100)'],
          data: [categoryCount.software_count, categoryCount.IT_count, categoryCount.general_supplies_count,categoryCount.pharm_count, categoryCount.hotel_hospitality_count, categoryCount.general_consultancy_count, categoryCount.building_construction_count],
        },
      ],
    }
    
  return (
    <Bar options={options} data={data} />
  )
}

export default charGenerator