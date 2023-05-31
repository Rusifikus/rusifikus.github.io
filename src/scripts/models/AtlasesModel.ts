import {SOURCES_ATLASES} from "@/data";
import {AtlasEntity} from "@/entities";
import {ProfairSourceModel} from "@profair/core";

export class AtlasesModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene) {
		this.profairSourceModel.loadAtlas(scene, SOURCES_ATLASES, AtlasEntity);
	}
}
