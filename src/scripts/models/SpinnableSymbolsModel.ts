import {DEFAULT_GAME_DATA} from "@data";
import {CoreEvents, Singleton, SpinnableSymbolsContext} from "@profair/core";

@Singleton
export class SpinnableSymbolsModel {
	private spinnableSymbolsContext: SpinnableSymbolsContext = new SpinnableSymbolsContext(
		this.scene,
		DEFAULT_GAME_DATA
	);

	constructor(public scene: Phaser.Scene) {}

	public init() {
		this.spinnableSymbolsContext.init();
	}

	public get view() {
		return this.spinnableSymbolsContext.getView();
	}

	public emitStartSpin() {
		this.scene.events.emit(CoreEvents.SpinnableSymbols.START_SPIN);
	}

	public emitStopSpin(stripsToShow: string[][]) {
		this.scene.events.emit(CoreEvents.SpinnableSymbols.STOP_SPIN, {stripsToShow});
	}

	// public emitLineInformation(winLine: number[], winSymbolAmount: number) {
	// 	this.view.emit(ESpinnableSymbolsEvents.SET_LINE_INFORMATION, {winLine, winSymbolAmount});
	// }

	// public emitSymbolsAnimation() {
	// 	this.view.emit(ESpinnableSymbolsEvents.PLAY_SYMBOLS_ANIMATIONS);
	// }

	// public emitScatterAnimations() {
	// 	this.view.emit(ESpinnableSymbolsEvents.PLAY_SCATTER_ANIMATIONS);
	// }
}
