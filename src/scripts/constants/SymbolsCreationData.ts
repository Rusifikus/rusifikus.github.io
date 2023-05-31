import {A, BANKNOTES, DYNAMITE, J, K, POLICE, Q, ROBBER, SCATTER, TEN, WILD} from "@/data";
import {TheBankHeistAbstractSymbolsConfig, ISymbolContainerConfig} from "@profair/core";

export class SymbolsCreationData extends TheBankHeistAbstractSymbolsConfig {
	public scatter: ISymbolContainerConfig = SCATTER;
	public wild: ISymbolContainerConfig = WILD;
	public robber: ISymbolContainerConfig = ROBBER;
	public police: ISymbolContainerConfig = POLICE;
	public banknotes: ISymbolContainerConfig = BANKNOTES;
	public dynamite: ISymbolContainerConfig = DYNAMITE;
	public a: ISymbolContainerConfig = A;
	public k: ISymbolContainerConfig = K;
	public q = Q;
	public j: ISymbolContainerConfig = J;
	public ten = TEN;
}
