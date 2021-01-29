import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Japandata from "./japanpos.json";

const ChoroplethMap = ({ features, now }) => {
  const width = 1800;
  const height = 1000;
  const projection = d3
    .geoMercator()
    .scale(2000)
    .center([139.69167, 40.68944]);

  const path = d3.geoPath().projection(projection);
  
  const datas = Japandata.data;
  let x_pos,y_pos;

  return (
    <div>
      <svg width={width} height={height}>
        <g>
          {features.map((feature, i) => {
            return(
              <path key={i} d={path(feature)} fill="skyblue" stroke="white" />
            );
          })}

          {datas.map((item) => {
            x_pos = projection([item.lat,item.lng])[0];
            y_pos = projection([item.lat,item.lng])[1];
            return(
              <text 
                x={x_pos} 
                y={y_pos}
                fill="red"
                font-fontFamily="Verdana"
                fontSize="20"
                text-anchor="middle"
              >{item.word[now-1]}</text>
            )
          })}
        </g>
      </svg>
    </div>
  );
};
export const ChoroplethMapPage = ({
  now,
}) => {
  const [features, setFeatures] = useState(null);
  useEffect(() => {
    (async() => {
      const res = await fetch(`${process.env.PUBLIC_URL}./data/japan.json`)
      const data = await res.json()
      const { features } = topojson.feature(data, data.objects.japan);
      setFeatures(features);
    })()
  },[])
  if (features == null) {
    return <p>loading</p>;
  }
  return <ChoroplethMap features={features}  now={now}/>;
};