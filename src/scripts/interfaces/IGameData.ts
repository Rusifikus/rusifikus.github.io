import {TSymbolStrip} from "@/types";
import {TESpinOutComes} from "@profair/core";

export interface IGameData {
	bet: number;
	payout: number;
	freeSpinsTotalWin: number;
	coefficients: number[];
	winSymbolAmounts: number[];
	nextSymbolNumbers: number[];
	winLines: number[][];
	winSymbolNames: string[];
	scatterCoefficient: number;
	totalCoefficient: number;
	spinOutcome: TESpinOutComes;
	stripsToShow: TSymbolStrip[][];
	freeSpinsAmount: number;
	message?: string;
	rules?: string;
	isRecovery?: boolean;
}
