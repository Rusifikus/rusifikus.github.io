import {coordinates} from "./coordinates";

//Only for PROG-1964!

export type TTextStyle = {fontFamily: string; fontSize: number; fixedWidth: number; align: string; color: string};

export const textStyles = (
	fontFamily: string,
	fontSize: number,
	fixedWidth: number,
	align: string,
	color: string = "#000000"
): Phaser.Types.GameObjects.Text.TextStyle => {
	return {
		fontFamily,
		fontSize,
		fixedWidth,
		align,
		color
	};
};

export const soundConfig = (loop: boolean, volume?: number) => {
	return {
		loop,
		volume
	};
};

export const addZero = (num: number) => (num <= 9 ? `0${num}` : num);

export const switchCoordinates = (arrays: any) => {
	const {r1, r2, r3} = coordinates();
	const newData: any = [];

	arrays.forEach((data: number[]) => {
		const arr: any = [];

		data.forEach((el: number) => {
			switch (el) {
				case 0:
					return arr.push(r1);
				case 1:
					return arr.push(r2);
				case 2:
					return arr.push(r3);
			}
		});

		newData.push(arr);
	});

	return newData;
};
