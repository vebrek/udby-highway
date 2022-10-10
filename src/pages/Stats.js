import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AgeGraph from '../components/age-graph';

const data = [
  {
    name: '10',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '3',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '1',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];



const Stats = () => {
    return (
        <AgeGraph />
    );
  };
  
  export default Stats;