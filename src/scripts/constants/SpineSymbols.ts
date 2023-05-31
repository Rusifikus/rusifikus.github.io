import {EBonusSymbol, ERegularSymbol, ETheBankHeistSymbol} from "@profair/config";

export class SpineSymbols {
	public readonly A: string = ERegularSymbol.A;
	public readonly BANKNOTES: string = ETheBankHeistSymbol.BANKNOTES;
	public readonly DYNAMITE: string = ETheBankHeistSymbol.DYNAMITE;
	public readonly J: string = ERegularSymbol.J;
	public readonly K: string = ERegularSymbol.K;
	public readonly POLICE: string = ETheBankHeistSymbol.POLICE;
	public readonly Q: string = ERegularSymbol.Q;
	public readonly ROBBER: string = ETheBankHeistSymbol.ROBBER;
	public readonly SCATTER: string = EBonusSymbol.SCATTER;
	public readonly TEN: string = ERegularSymbol.TEN;
	public readonly WILD: string = EBonusSymbol.WILD;
}
