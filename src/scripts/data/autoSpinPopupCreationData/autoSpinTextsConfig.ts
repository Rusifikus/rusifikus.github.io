import {textStyles} from "@/utils";
import {ITextConfig} from "@profair/core";

const style = textStyles("Roboto, sans-serif", 42, 112, "center");

export const AUTO_SPIN_POPUP_QUANTITY_TEXTS_CONFIG: ITextConfig[] = [
	{
		x: 0,
		y: 265,
		text: "25",
		style
	},
	{
		x: 0,
		y: 190,
		text: "50",
		style
	},
	{
		x: 0,
		y: 115,
		text: "100",
		style
	},
	{
		x: 0,
		y: 40,
		text: "200",
		style
	}
];
