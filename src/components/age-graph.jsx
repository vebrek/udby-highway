import * as React from 'react';
import { BarChart, Brush, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Papa = require('papaparse');



const AgeGraph = () => {
    const [ data, setData ] = React.useState([]);
    const [ isLoading, setIsLoading ] = React.useState(true);

    React.useEffect(() => {
        Papa.parse('../45784.csv', {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results) {
                let tmpData = []
                for(let row of results.data) {
                    if(tmpData.length <= row.age){
                        while(tmpData.length <= row.age){
                            tmpData.push({
                                name: tmpData.length,
                                Persons: 0,
                                // amt: 2500,
                              })
                        }
                    }
                    tmpData[row.age]['Persons'] += 1;
                }
                 
                setData(tmpData);
                setIsLoading(false);
            }
          });
    }, [])

    return (
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <Bar dataKey="Persons" barSize={20} fill="#8884d8" />
        </BarChart>
  );
}

export default AgeGraph;