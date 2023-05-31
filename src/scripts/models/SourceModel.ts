import {BootSceneModel, PreloadSceneModel} from "@models";

export class SourceModel {
	private readonly preloadSceneModel: PreloadSceneModel = new PreloadSceneModel();
	private readonly bootSceneModel: BootSceneModel = new BootSceneModel();

	/**
	 * Preload all Assets.
	 * Will be run in Preload Scene.
	 * @param scene
	 */
	public preloadScene(scene: Phaser.Scene): void {
		this.preloadSceneModel.preload(scene);
	}

	/**
	 * Preload all Assets for Preload Scene.
	 * Will be run in Boot Scene.
	 * @param scene
	 */
	public bootScene(scene: Phaser.Scene): void {
		this.bootSceneModel.preload(scene);
	}
}
