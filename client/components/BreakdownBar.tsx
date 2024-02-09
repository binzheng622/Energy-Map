import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

//chartjs bar chart used for state map
const BreakdownBar = () => {
  const chartId: string = `${Math.random()}`;
  const chartData = useSelector((state: any) => state.states.hoverState);

  useEffect(() => {
    const chartElement: any = document.getElementById(chartId);

    const myChart = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: [
          'Solar Power',
          'Wind Power',
          'HydroElectric Power',
          'Geothermal',
          'Biomass Power',
        ],
        datasets: [
          {
            label: 'Solar Power',
            data: [chartData.solar_mw],
            borderColor: '#FCF6B1',
            backgroundColor: '#FCF6B1',
            borderWidth: 1,
          },
          {
            label: 'Wind Power',
            data: [null, chartData.wind_mw],
            borderColor: '#A9E5BB',
            backgroundColor: '#A9E5BB',
            borderWidth: 1,
          },
          {
            label: 'HydroElectric Power',
            data: [null, null, chartData.hydro_mw],
            borderColor: '#2D1E2F',
            backgroundColor: '#2D1E2F',
            borderWidth: 1,
          },
          {
            label: 'Geothermal',
            data: [null, null, null, chartData.geo_mw],
            borderColor: '#F72C25',
            backgroundColor: '#F72C25',
            borderWidth: 1,
          },
          {
            label: 'Biomass Power',
            data: [null, null, null, null, chartData.bio_mw],
            borderColor: '#F7B32B',
            backgroundColor: '#F7B32B',
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
            text: 'Percent of Total State Renewable Energy Generation by Type',
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
    <div className='breakdownBar'>
      <canvas id={chartId}></canvas>
    </div>
  );
};

export default BreakdownBar;
