import { Box, useStyleConfig } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import React from 'react';

const exampleSeriesData = [{
  x: 'category A',
  y: 10
}, {
  x: 'category B',
  y: 18
}, {
  x: 'category C',
  y: 13
}]

function PortionBar({ seriesData }) {
  const opts = {
    chart: {
      type:'bar',
      width:"100%",
      height:"50px",
      stacked:true,
      stackType:'100%',
      toolbar:{show:false},
      zoom:{enabled:false},
      selection:{enabled:false},
      redrawOnParentResize:false,
      redrawOnWindowResize:false,
    },
    title: {
      text: 'Fee Destination Weights',
      align: 'center',
      margin: 0,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '24px',
        fontFamily: '',
        fontWeight: 600,
        color: 'white',
      }

    },
    plotOptions: { bar: { horizontal: true } },
    stroke: { width: 1, colors: ['#fff'] },
    legend: {
      showForSingleSeries: true,
      horizontalAlign: 'left',
      offsetX: 40
    },
    grid: { show: false },
    fill: { opacity: 1 },
    tooltip: { enabled:false },
    xaxis:{
      show:false,
      labels:{show:false},
      axisBorder:{show:false},
      axisTicks:{show:false},
      crosshairs:{show:false},
    },
    yaxis:{
      show:false,
      labels:{show:false},
      axisBorder:{show:false},
      axisTicks:{show:false},
      crosshairs:{show:false},
    },
  }
  // const { variant, children, ...rest } = props;
  // const styles = useStyleConfig("PortionBar", { variant });
  // Pass the computed styles into the `__css` prop
  return (
      <ReactApexChart
        type="bar"
        options={opts}
        series={seriesData}
        height="160px"
        width="500px"
      />
  );
}

export default PortionBar;
