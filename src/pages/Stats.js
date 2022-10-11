import React from 'react';
import { Grid } from '@mui/material';
import AgeGraph from '../components/age-graph';
import StateAgeGraph from '../components/state-age';


const Stats = () => {
    return (
      <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AgeGraph />
        </Grid>
        <Grid item xs={12}>
          <StateAgeGraph />
        </Grid>
      </Grid>
      </>
    );
  };
  
  export default Stats;