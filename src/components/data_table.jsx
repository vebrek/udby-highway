import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CustomToolbar from './custom-toolbar';
const Papa = require('papaparse');

const columns = [
  { field: 'seq', headerName: 'Seq', flex: 1 },
  { field: 'name/first', headerName: 'First name', flex: 2 },
  { field: 'name/last', headerName: 'Last name', flex: 2 },
  {
    field: 'fullname',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    flex: 3.5,
    valueGetter: (params) =>
      `${params.row['name/first'] || ''} ${params.row['name/last'] || ''}`,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1,
  },
  { field: 'street', headerName: 'Street', flex: 3 },
  { field: 'city', headerName: 'City', flex: 2 },
  { field: 'state', headerName: 'State', flex: 1 },
  { field: 'latitude', headerName: 'Lat', flex: 2.5,  },
  { field: 'longitude', headerName: 'Long', flex: 2.5, },
  { field: 'ccnumber', headerName: 'CC number', flex: 3 },
];


const DataTable = () => {
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [pageSize, setPageSize] = useState(10)

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

    return (
        <div style={{ display: 'flex', width: '100%', height: window.innerHeight - 120 }}>
            <DataGrid
                getRowId={(row) => row.seq} 
                rows={data}
                columns={columns}
                loading={isLoading}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pagination
                checkboxSelection
                //autoHeight 
                
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
    </div>
  );
}

export default DataTable;