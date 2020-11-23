const cycles = ['A1', 'B1', 'A2', 'B2'];

const knownDate = {
	date: new Date('2020/11/23'),
	cycle: 'A1',
};

const numWorkdays = (start, end) => {
	// Weekdays are 0 and 6

	start = new Date(start.toDateString());
	end = new Date(end.toDateString());

	const msInDay = 86400 * 1000;

	const msApart = end.getTime() - start.getTime();

	const daysApart = Math.floor(msApart / msInDay);

	let numWeekdays = daysApart;

	if (daysApart > 6) {
		let weeksApart = Math.floor(daysApart / 7);
		numWeekdays -= weeksApart * 2;
	}

	const startDay = start.getDay();
	const endDay = end.getDay();

	if (startDay % 6 === 0 || endDay % 6 === 0) {
		numWeekdays -= 1;

		if (endDay - startDay < 0) {
			numWeekdays -= 1;
		}
	}

	return numWeekdays;
};

export default (req, res) => {
	const providedDate = new Date(req.query.date);
	const nextDate = providedDate.getTime() ? providedDate : new Date();

	const knownIndex = cycles.indexOf(knownDate.cycle);
	const difference = numWorkdays(knownDate.date, nextDate);

	const offset =
		(((difference + knownIndex) % cycles.length) + cycles.length) %
		cycles.length;

	res.json({
		date: nextDate.toDateString(),
		cycle: nextDate.getDay() % 6 === 0 ? 'Weekend' : cycles[offset],
	});
};
