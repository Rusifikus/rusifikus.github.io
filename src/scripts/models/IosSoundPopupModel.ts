import {IosSoundPopupCreationConfig} from "@/constants";
import {IosSoundPopupContext, Singleton} from "@profair/core";

@Singleton
export class IosSoundPopupModel {
	private iosSoundPopupCreationConfig: IosSoundPopupCreationConfig = new IosSoundPopupCreationConfig(this.musicState);
	private iosSoundPopupContext: IosSoundPopupContext = new IosSoundPopupContext(
		this.scene,
		this.iosSoundPopupCreationConfig
	);

	constructor(public scene: Phaser.Scene, public musicState: boolean) {}

	public init(): void {
		this.iosSoundPopupContext.init();
	}
}
