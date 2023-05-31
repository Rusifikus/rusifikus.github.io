import {SOUNDS} from "@/data";
import {SoundEntity} from "@/entities";
import {ProfairSourceModel} from "@profair/core";

export class AudiousModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene) {
		this.profairSourceModel.loadAudio(scene, SOUNDS, SoundEntity);
	}
}
