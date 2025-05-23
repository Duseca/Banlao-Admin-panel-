import { useState } from "react";
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import ChartFilter from "./ChartFilter";

export default function ChartOne() {
  const [state, setState] = useState({
    series: [

      {
        name: 'Product Two',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
  });

  const options = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3b82f6'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#3b82f6',
        top: 40,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3b82f6', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 100,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 shadow-xl sm:px-7 ">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            {/* <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-blue-800">
              <span className="block h-2.5 w-2.5 rounded-full bg-blue-800"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-blue-500">Users visited app</p>
              <p className="text-sm font-medium text-gray-500">12.04.2022 - 12.05.2022</p>
            </div> */}
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-blue-500">
              <span className="block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-blue-500">Total Users</p>
              <p className="text-sm font-medium text-gray-500">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          {/* <ChartFilter /> */}
          {/* <div className="inline-flex items-center rounded-md bg-slate-100 p-1.5">
            <button className="rounded   py-1 px-3 text-xs font-medium text-gray-500 shadow-card hover:bg-white hover:shadow ">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-gray-500 hover:bg-white hover:shadow ">
              Week
            </button>
            <button className="rounded bg-white shadow py-1 px-3 text-xs font-medium text-gray-500 hover:bg-white hover:shadow ">
              Month
            </button>
          </div> */}
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  )
}
