import {CHEAT_TOOL_ATLASES, CHEAT_TOOL_IMAGES} from "@data";
import {AtlasEntity, CheatToolImageEntity} from "@entities";
import {ProfairSourceModel} from "@profair/core";

export class CheatToolModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene): void {
		if (CHEAT_TOOL) {
			this.loadCheatToolAltas(scene);
			this.loadloadCheatToolImage(scene);
		}
	}

	private loadCheatToolAltas(scene: Phaser.Scene): void {
		this.profairSourceModel.loadAtlas(scene, CHEAT_TOOL_ATLASES, AtlasEntity);
	}

	private loadloadCheatToolImage(scene: Phaser.Scene) {
		this.profairSourceModel.loadImage(scene, CHEAT_TOOL_IMAGES, CheatToolImageEntity);
	}
}
