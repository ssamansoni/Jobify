import {BarChart , Bar, XAxis, YAxis , CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const BarChartComp = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
        <BarChart data={data} margin={{top:50}}>
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='date'/>
            <YAxis allowDecimals={false}/>
            <Tooltip/>
            <Bar dataKey='count' fill='#0e7c86' barSize={75}/>
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComp
