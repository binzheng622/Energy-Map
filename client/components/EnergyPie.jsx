import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

//chartjs pie chart used for comparison
const EnergyPie = ({ side }) => {
  const chartId = Math.random();

  let chartData;
  if (side === 'left') {
    chartData = useSelector((state) => state.states.compareState1);
  } else if (side === 'right') {
    chartData = useSelector((state) => state.states.compareState2);
  }

  useEffect(() => {
    const chartElement = document.getElementById(chartId);

    const myChart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: [
          `Renewable Energy Generation ${chartData.renew_mw}%`,
          `Non-Renewable Energy Generation ${chartData.nonrenew_mw}%`,
        ],
        datasets: [
          {
            data: [chartData.renew_mw, chartData.nonrenew_mw],
            borderColor: ['#ACEE52', '#F77028'],
            backgroundColor: ['#ACEE52', '#F77028'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
          title: {
            display: true,
            text: 'Percent Non-Renewable vs Renewable Energy Generation by State',
            color: 'white',
            font: {
              size: 15,
            },
            padding: {
              bottom: 20,
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <div className='energyPie'>
      <canvas id={chartId}></canvas>
    </div>
  );
};

export default EnergyPie;
