import React from "react";
import { render } from "react-dom";

import { LineChart, Line, XAxis, YAxis } from "recharts";

/** This example illustrates how accessor function in dataKey
 * makes it easier to consume data from different sources,
 * instead of needing to create one single object.
 * This example is fragile, and only works, because data1
 * that is passed in to the contianer, covers the domain of data2 as well.
 * xAxes and yAxes only consider the data passed in to the top level contianer.
 */
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data1 = [];
const data2 = [];

const rand = 300;
for (let i = 0; i < 7; i++) {
  let d = {
    year: 2000 + i,
    value: { x: Math.random() * (rand + 50) + 100 }
  };

  data1.push(d);
}

for (let i = 0; i < 7; i++) {
  let d = {
    year: 2000 + i,
    value: { x: Math.random() * (rand + 50) + 100 }
  };

  data2.push(d);
}

const getXValueData1 = data => {
  const index = data1.findIndex(obj => obj.year === data.year);
  return data1[index].value.x;
};

const getXValueData2 = data => {
  const index = data2.findIndex(obj => obj.year === data.year);
  return data2[index].value.x;
};

const App = () => (
  <div style={styles}>
    <LineChart
      width={500}
      height={300}
      data={data1}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        type="monotone"
        dataKey={getXValueData1}
        stroke="#8884d8"
        dot={false}
      />
      <Line type="monotone" dataKey={getXValueData2} stroke="red" dot={false} />
      <XAxis dataKey="year" />
      <YAxis />
    </LineChart>
  </div>
);

render(<App />, document.getElementById("root"));
