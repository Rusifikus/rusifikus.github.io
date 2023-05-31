import {SourceModel} from "@models";
import {EScenes} from "@profair/core";
import "phaser";

export class BootScene extends Phaser.Scene {
	private readonly sourceModel: SourceModel = new SourceModel();

	constructor() {
		super(EScenes.BOOT_SCENE);
	}

	preload() {
		this.sourceModel.bootScene(this);
	}

	create() {
		this.scene.start(EScenes.PRELOADER_SCENE);
		document.oncontextmenu = this.cmenu;
	}

	cmenu() {
		return false;
	}
}
