import {Button, IButtonInputData} from "./Button";
import {EScenes} from "@profair/core";
import {IosSoundPopupModel} from "@models";

export class SoundButton extends Button {
	public isIOS: boolean;
	public iosSoundPopupModel: IosSoundPopupModel = new IosSoundPopupModel(this.scene, this.musicState);

	constructor(data: IButtonInputData, public musicState: boolean) {
		super(data);

		this.isIOS = /iPhone/i.test(navigator.userAgent);
	}

	init() {
		super.init();
		this.setInteractive({cursor: "pointer"});
		this.on("pointerdown", this.checkIOS, this);
	}

	checkIOS() {
		this.isIOS && this.musicState === true ? this.showIosModal() : this.startGameScene();
	}

	startGameScene() {
		this.scene.scene.start(EScenes.GAME_SCENE, {
			musicState: this.musicState
		});
	}

	showIosModal() {
		this.scene.scene.scene.modal.setVisible(false);
		this.iosSoundPopupModel.init();
	}
}
