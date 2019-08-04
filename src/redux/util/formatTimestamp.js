import {DateTime} from 'luxon';
import { curry, map } from 'ramda';

const formatTimestamp = curry((format, {timestamp, ...message}) => ({
	...message, 
	formattedTime: DateTime.fromMillis(timestamp).toLocaleString(format)
}));

export default formatTimestamp;