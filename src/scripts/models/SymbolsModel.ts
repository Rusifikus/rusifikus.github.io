import {SymbolsCreationData} from "@constants";
import {Singleton} from "@profair/core";

@Singleton
export class SymbolsModel {
	public readonly symbolsCreationData: SymbolsCreationData = new SymbolsCreationData();
}
