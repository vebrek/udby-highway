import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Papa = require('papaparse');


const StateAgeGraph = () => {  
    const [ data, setData ] = useState([]);
    const range = [0, 1000];

    useEffect(() => {
        Papa.parse('../45784.csv', {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results) {
                let tmpData = {}
                for(let row of results.data) {
                    if(!tmpData[row.state]){
                        tmpData[row.state] = [];
                    }
                    if(tmpData[row.state].length <= row.age){
                        while(tmpData[row.state].length <= row.age){
                            tmpData[row.state].push({
                                name: tmpData[row.state].length,
                                Persons: 0,
                                index: 1,
                                // amt: 2500,
                              })
                        }
                    }
                    tmpData[row.state][row.age]['Persons'] += 1;
                }
                 
                setData(tmpData);
            }
          });
    }, []);

    console.log(data['HI'])


    return (
      <div style={{ width: '95%' }}>
        {['HI', 'NY', 'AL'].map(state => (
            <ResponsiveContainer width="100%" height={100}>
            <ScatterChart
              width={700}
              height={100}
              margin={{
                top: 40,
                right: 10,
                bottom: 0,
                left: 0,
              }}
            >
              <XAxis
                type="category"
                dataKey="name"
                interval={0}
                tick={{ fontSize: 0 }}
                tickLine={{ transform: 'translate(0, -6)' }}
              />
              <YAxis
                type="number"
                dataKey="index"
                name={state}
                height={10}
                width={80}
                tick={false}
                tickLine={false}
                axisLine={false}
                label={{ value: state, position: 'insideRight' }}
              />
              <ZAxis type="number" dataKey="Persons"  range={range} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} />
              <Scatter data={data[state]} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        ))}
      </div>
    );
}

export default StateAgeGraph;