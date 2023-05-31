import {CounterCreationConfig} from "@/constants";
import {CounterContext, Singleton} from "@profair/core";

@Singleton
export class CounterModel {
	private counterCreationConfig: CounterCreationConfig = new CounterCreationConfig();
	private counterContext: CounterContext = new CounterContext(this.scene, this.counterCreationConfig);

	constructor(public scene: Phaser.Scene) {}

	public init(): void {
		this.counterContext.init();
	}

	public get model() {
		return this.counterContext.getModel();
	}
}
