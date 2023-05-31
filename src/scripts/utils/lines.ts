import {switchCoordinates} from "./helpers";
import {coordinates} from "./coordinates";

type TLineData = {check: number | number[]; arr: Array<number>};

const getFormCoordinates = (line: TLineData, lineData: number[]) => {
	const {r1, r2, r3, topRow, middleRow, bottomRow} = coordinates();

	switch (lineData[4]) {
		case r1:
			return (line.check = topRow);
		case r2:
			return (line.check = middleRow);
		case r3:
			return (line.check = bottomRow);
	}
};

const getLineCoordinates = (line: TLineData, lineData: number[]) => {
	const {c1, c2, c3, c4, c5, st, end} = coordinates();
	const coordinatesX = [c1, c2, c3, c4, c5];

	lineData.forEach((y, i) => {
		if (i === 0) line.arr.push(st, y);
		line.arr.push(coordinatesX[i], y);
		if (i === 4) line.arr.push(end, y);
	});
};

export const lines = (data: number[][]) => {
	const linesData = switchCoordinates(data);
	const lines: TLineData[] = [];

	linesData.forEach((lineData) => {
		const line = {check: 0, arr: []};

		getFormCoordinates(line, lineData);
		getLineCoordinates(line, lineData);

		lines.push(line);
	});

	return lines;
};
