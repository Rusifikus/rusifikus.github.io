import {SPINE_POPUPS, SPINE_SYMBOLS} from "@/data";
import {SpinePopupsEntity, SpineSymbolsEntity} from "@/entities";
import {ProfairSourceModel} from "@profair/core";

export class SpinesModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene): void {
		this.profairSourceModel.loadSpine(scene, SPINE_POPUPS, SpinePopupsEntity);
		this.profairSourceModel.loadSpine(scene, SPINE_SYMBOLS, SpineSymbolsEntity);
	}
}
