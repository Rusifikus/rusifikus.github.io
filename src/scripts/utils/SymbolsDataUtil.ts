import {SymbolData} from "@profair/core";
import {ETheBankHeistSymbol, ERegularSymbol, EBonusSymbol} from "@profair/config";

// TODO check why do we need that and if we really need that looks likr that is the model responsibility
export class SymbolsDataUtil {
	public static getAllSymbolsData() {
		return [
			new SymbolData(ERegularSymbol.TEN),
			new SymbolData(ERegularSymbol.A),
			new SymbolData(ERegularSymbol.Q),
			new SymbolData(ERegularSymbol.K),
			new SymbolData(ERegularSymbol.J),
			new SymbolData(ETheBankHeistSymbol.DYNAMITE),
			new SymbolData(ETheBankHeistSymbol.POLICE),
			new SymbolData(ETheBankHeistSymbol.BANKNOTES),
			new SymbolData(ETheBankHeistSymbol.ROBBER),
			new SymbolData(EBonusSymbol.SCATTER),
			new SymbolData(EBonusSymbol.WILD)
		];
	}
}
