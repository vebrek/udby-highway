import React, { useState, useEffect } from 'react';
import DataTable from '../components/data_table';

const Papa = require('papaparse');

const Home = () => {
  const [ data, setData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
      Papa.parse('../45784.csv', {
          header: true,
          download: true,
          dynamicTyping: true,
          complete: function(results) {
            setData(results.data);
            setIsLoading(false);
          }
        });
  }, [])
    return <DataTable data={data} isLoading={isLoading} />;
  };
  
  export default Home;