import {DateTime} from 'luxon';
import formatTimestamp from './formatTimestamp';

const message = 
	{timestamp: 1564842544000, data: {}};

describe('formatTimestamp', () => {
	it('will format message timestamp to a given format', () => {
		const formattedMessage = formatTimestamp(DateTime.TIME_24_SIMPLE, message);

		expect(formattedMessage).toEqual(
			{"data": {}, "formattedTime": "17:29"}
		);
	});

	it('is curried', () => {
		const formattedMessage = formatTimestamp(DateTime.TIME_24_SIMPLE)(message);

		expect(formattedMessage).toEqual(
			{"data": {}, "formattedTime": "17:29"}
		);
	})
})