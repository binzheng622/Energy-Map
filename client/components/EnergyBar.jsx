import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const EnergyBar = () => {
  const chartId = Math.random();
  const chartData = useSelector((state) => state.states.hoverState);

  useEffect(() => {
    const chartElement = document.getElementById(chartId);

    const myChart = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: [
          'Renewable Energy Generation',
          'Non-Renewable Energy Generation',
        ],
        datasets: [
          {
            label: 'Renewable Energy',
            data: [chartData.renew_mw],
            borderColor: '#ACEE52',
            backgroundColor: '#ACEE52',
            borderWidth: 1,
          },
          {
            label: 'Non-Renewable Energy',
            data: [null, chartData.nonrenew_mw],
            borderColor: '#F77028',
            backgroundColor: '#F77028',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: 'white',
            },
          },
          y: {
            max: 100,
            min: 0,
            ticks: {
              color: 'white',
              callback: (value) => {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Percent Non-Renewable vs Renewable Energy Generation by State',
            color: 'white',
            font: {
              size: 15,
            },
            padding: {
              bottom: 30,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const datasetLabel = context.dataset.label || '';
                const value = context.parsed.y || 0;
                return `${datasetLabel}: ${value}%`;
              },
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
    <div className='energyBar'>
      <canvas id={chartId}></canvas>
    </div>
  );
};

export default EnergyBar;
