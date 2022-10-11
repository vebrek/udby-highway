import * as React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { BarChart, Brush, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const Papa = require('papaparse');


const AgeGraph = () => {
    const [ data, setData ] = React.useState([]);

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
                              })
                        }
                    }
                    tmpData[row.age]['Persons'] += 1;
                }
                setData(tmpData);
            }
          });
    }, [])

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Age distribution for entire dataset</h1>
          </Grid>
        </Grid>
        <Grid container spacing={2}  direction="row" justifyContent="center">
          <Grid item >
          {data.length === 0 ?
            <CircularProgress />
            :
            <BarChart
              width={1000}
              height={300}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
              <Bar dataKey="Persons" barSize={20} fill="#8884d8" />
            </BarChart>
            }
          </Grid>
        </Grid>
      </>
        
  );
}

export default AgeGraph;