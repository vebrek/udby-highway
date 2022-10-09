import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// const fs = require('fs');
const Papa = require('papaparse');

const columns = [
  { field: 'seq', headerName: 'Seq', width: 70 },
  { field: 'name/first', headerName: 'First name', width: 130 },
  { field: 'name/last', headerName: 'Last name', width: 130 },
  {
    field: 'street',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row['name/first'] || ''} ${params.row['name/last'] || ''}`,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 50,
  },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'state', headerName: 'State', width: 50 },
  { field: 'latitude', headerName: 'Lat', width: 100 },
  { field: 'longitude', headerName: 'Long', width: 100 },
  { field: 'ccnumber', headerName: 'CC number', width: 150 },
];


const DataTable = () => {
    const [ data, setData ] = React.useState([]);
    const [ isLoading, setIsLoading ] = React.useState(true);

    React.useEffect(() => {
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
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                getRowId={(row) => row.seq} 
                rows={data}
                columns={columns}
                loading={isLoading}
                pageSize={10}
                rowsPerPageOptions={[50]}
                checkboxSelection
                components={{
                    Toolbar: GridToolbar,
                    }}
            />
    </div>
  );
}

export default DataTable