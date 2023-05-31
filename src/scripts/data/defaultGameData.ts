import {Assets} from "@/constants";
import {SymbolsDataUtil} from "@/utils";
import {ECurrency} from "@profair/config";
import {IDefaultGameData} from "@profair/core";
import {SPINE_SYMBOLS} from "./spineSymbols";

export const DEFAULT_GAME_DATA: any = {
	defaultStrips: [
		// [Assets.spineSymbols.ROBBER, Assets.spineSymbols.K, Assets.spineSymbols.J],
		// [Assets.spineSymbols.BANKNOTES, Assets.spineSymbols.Q, Assets.spineSymbols.POLICE],
		// [Assets.spineSymbols.K, Assets.spineSymbols.DYNAMITE, Assets.spineSymbols.A],
		// [Assets.spineSymbols.DYNAMITE, Assets.spineSymbols.ROBBER, Assets.spineSymbols.Q],
		// [Assets.spineSymbols.WILD, Assets.spineSymbols.TEN, Assets.spineSymbols.POLICE]
		[Assets.spineSymbols.A, Assets.spineSymbols.A, Assets.spineSymbols.A],
		[Assets.spineSymbols.A, Assets.spineSymbols.A, Assets.spineSymbols.A],
		[Assets.spineSymbols.A, Assets.spineSymbols.A, Assets.spineSymbols.A],
		[Assets.spineSymbols.A, Assets.spineSymbols.A, Assets.spineSymbols.A],
		[Assets.spineSymbols.A, Assets.spineSymbols.A, Assets.spineSymbols.A]
	],
	containerPositions: {
		x: 460,
		y: 300
	},
	symbolsPositions: {
		y: [0, 250, 500, -250],
		x: [0, 250, 500, 750, 1000]
	},
	spinDuration: 2000,
	firstSymbolYPosition: -250,
	lastSymbolYPosition: 750,
	symbolSpinningSpeed: 100,
	stripInterval: 300,
	stripRiseHeight: 100,
	stripRiseDuration: 200,
	currency: ECurrency.USD,
	balance: 3750,
	columns: 5,
	rows: 3,
	gameName: "The Bank Heist",
	// allSymbols: SymbolsDataUtil.getAllSymbolsData(),
	allSymbols: SPINE_SYMBOLS
};
