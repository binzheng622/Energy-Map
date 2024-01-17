import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

//chartjs pie chart used for comparison
const BreakdownPie = ({ side }: { side: string }) => {
  const chartId: string = `${Math.random()}`;

  let chartData: any;
  if (side === 'left') {
    chartData = useSelector((state: any) => state.states.compareState1);
  } else if (side === 'right') {
    chartData = useSelector((state: any) => state.states.compareState2);
  }

  useEffect(() => {
    const chartElement: any = document.getElementById(chartId);

    const myChart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: [
          `Solar Power ${chartData.solar_mw}%`,
          `Wind Power ${chartData.wind_mw}%`,
          `HydroElectric Power ${chartData.hydro_mw}%`,
          `Geothermal ${chartData.geo_mw}%`,
          `Biomass Power ${chartData.bio_mw}%`,
        ],
        datasets: [
          {
            data: [
              chartData.solar_mw,
              chartData.wind_mw,
              chartData.hydro_mw,
              chartData.geo_mw,
              chartData.bio_mw,
            ],
            borderColor: [
              '#FCF6B1',
              '#A9E5BB',
              '#2D1E2F',
              '#F72C25',
              '#F7B32B',
            ],
            backgroundColor: [
              '#FCF6B1',
              '#A9E5BB',
              '#2D1E2F',
              '#F72C25',
              '#F7B32B',
            ],
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
            text: 'Percent of Total State Renewable Energy Generation by Type',
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
    <div className='breakdownPie'>
      <canvas id={chartId}></canvas>
    </div>
  );
};

export default BreakdownPie;
