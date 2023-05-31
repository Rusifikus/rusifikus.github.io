import {BOOT_SCENE_PRELOAD_ATLASES, BOOT_SCENE_PRELOAD_IMAGES, MULTI_ATLASES} from "@/data";
import {AtlasEntity, MultiAtlasEntity, PreloadSceneImageEntity} from "@/entities";
import {ProfairSourceModel} from "@profair/core";

export class BootSceneModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene): void {
		this.loadImageForPreloadScene(scene);
		this.loadAtlasForPreloadScene(scene);
		this.loadMultiAltasForPreloadScene(scene);
	}

	private loadImageForPreloadScene(scene: Phaser.Scene): void {
		this.profairSourceModel.loadImage(scene, BOOT_SCENE_PRELOAD_IMAGES, PreloadSceneImageEntity);
	}

	private loadAtlasForPreloadScene(scene: Phaser.Scene): void {
		this.profairSourceModel.loadAtlas(scene, BOOT_SCENE_PRELOAD_ATLASES, AtlasEntity);
	}

	private loadMultiAltasForPreloadScene(scene: Phaser.Scene): void {
		this.profairSourceModel.loadMultiAtlas(scene, MULTI_ATLASES, MultiAtlasEntity);
	}
}
