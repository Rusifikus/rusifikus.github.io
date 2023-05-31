import {AtlasesModel} from "./AtlasesModel";
import {AudiousModel} from "./AudiousModel";
import {CheatToolModel} from "./CheatToolModel";
import {ImagesModel} from "./ImagesModel";
import {SpinesModel} from "./SpinesModel";

export class PreloadSceneModel {
	private readonly imagesModel: ImagesModel = new ImagesModel();
	private readonly atlasesModel: AtlasesModel = new AtlasesModel();
	private readonly audiousModel: AudiousModel = new AudiousModel();
	private readonly spinesModel: SpinesModel = new SpinesModel();
	private readonly cheatToolModel: CheatToolModel = new CheatToolModel();

	public preload(scene: Phaser.Scene): void {
		this.images(scene);
		this.atlases(scene);
		this.audious(scene);
		this.spines(scene);
		this.cheatToolAssets(scene);
	}

	private images(scene: Phaser.Scene): void {
		this.imagesModel.preload(scene);
	}

	/**
	 * Load all Atlases
	 * @param scene
	 */
	private atlases(scene: Phaser.Scene): void {
		this.atlasesModel.preload(scene);
	}

	/**
	 * Load all Sounds
	 * @param scene
	 */
	private audious(scene: Phaser.Scene): void {
		this.audiousModel.preload(scene);
	}

	/**
	 * Load all Spines
	 * @param scene
	 */
	private spines(scene: Phaser.Scene): void {
		this.spinesModel.preload(scene);
	}

	/**
	 * This method will load all assets related for Ceat Tool game mode
	 * @param scene
	 */
	private cheatToolAssets(scene: Phaser.Scene): void {
		this.cheatToolModel.preload(scene);
	}
}
