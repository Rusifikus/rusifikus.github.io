import {MULTI_ATLASES} from "@data";
import {MultiAtlasEntity} from "@entities";
import {ProfairSourceModel} from "@profair/core";

export class MultiAtlasesModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene): void {
		this.profairSourceModel.loadMultiAtlas(scene, MULTI_ATLASES, MultiAtlasEntity);
	}
}
