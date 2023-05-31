import {AutoSpinPopupCreationConfig} from "@/constants";
import {AutoSpinPopupContext, Singleton} from "@profair/core";

@Singleton
export class AutoSpinPopupModel {
	private autoSpinPopupCreationConfig: AutoSpinPopupCreationConfig = new AutoSpinPopupCreationConfig();
	private autoSpinPopupContext: AutoSpinPopupContext = new AutoSpinPopupContext(
		this.scene,
		this.autoSpinPopupCreationConfig
	);

	constructor(public scene: Phaser.Scene) {}

	public init(): void {
		this.autoSpinPopupContext.init();
	}
}
