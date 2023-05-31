import {HintCreationConfig} from "@constants";
import {EHintEvents, HintContext, HintView, Singleton} from "@profair/core";

@Singleton
export class HintModel {
	private hintCreationConfig: HintCreationConfig = new HintCreationConfig();
	private hintContext: HintContext = new HintContext(this.scene, this.hintCreationConfig);
	private hintView!: HintView;

	constructor(public scene: Phaser.Scene) {}

	public init(): void {
		this.hintContext.init();
		this.hintView = this.hintContext.getView();
	}

	public setMessage(message: string): void {
		this.hintView.emit(EHintEvents.SET_MESSAGE, message);
	}

	public clearMessage(): void {
		this.hintView.emit(EHintEvents.SET_MESSAGE, "");
	}
}
