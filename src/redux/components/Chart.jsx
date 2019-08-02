import React from 'react';
import DateTime from 'luxon/src/datetime.js'
import { mapObjIndexed, toPairs, groupBy, map, pipe, prop, tap } from 'ramda';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const countMessagesByMinute = pipe(
	map(
		({timestamp, ...message}) => ({
			...message, 
			formattedTime:DateTime.fromMillis(timestamp).toLocaleString(DateTime.TIME_24_SIMPLE)
		})
	), // format timestamp to minutes
	groupBy(prop('formattedTime')), // group by formatted time
	mapObjIndexed(value => value.length), // count the amount of messages per minute
	toPairs, // convert to array
	map(([formattedTime, amount]) => ({formattedTime, amount})) // convert to something chart lib can consume
)

const Component = ({messages}) => {
	const data = React.useMemo(() => countMessagesByMinute(messages), [messages])

	return (
		<div className="panel">
			<div className="panel-block">
			<ResponsiveContainer height={300} width="100%">
		      <LineChart
		        data={data}
		        margin={{
		          top: 5, right: 30, left: 20, bottom: 5,
		        }}
		      >
		        <CartesianGrid strokeDasharray="3 3" />
		        <XAxis dataKey="formattedTime" />
		        <YAxis />
		        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
		      </LineChart>
			</ResponsiveContainer>
			</div>
		</div>
	)
}

export default Component;
