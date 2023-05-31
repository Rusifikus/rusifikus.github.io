import {LoadingScreenCreationConfig} from "@/constants";
import {LoadingScreenContext} from "@profair/core";

export class LoadingScreenModel {
	private loadingScreenCreationConfig: LoadingScreenCreationConfig = new LoadingScreenCreationConfig();
	private loadingScreenContext: LoadingScreenContext = new LoadingScreenContext(
		this.scene,
		this.loadingScreenCreationConfig
	);

	constructor(public scene: Phaser.Scene) {}

	init(): void {
		this.loadingScreenContext.init();
	}
}
