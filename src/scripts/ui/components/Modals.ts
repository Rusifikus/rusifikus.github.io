import {soundConfig, textStyles} from "@utils";
import {AppStates} from "./AppStates";
import {CoreEvents} from "@profair/core";

export class Modals extends AppStates {
	public dataY: any[];
	public dataText: any[];
	public dataStyle: Phaser.Types.GameObjects.Text.TextStyle;
	public arrText: Phaser.GameObjects.Text[];

	constructor(public scene: Phaser.Scene) {
		super(scene);

		this.scene.events.on(CoreEvents.BetTable.OPEN, () => {
			this.playSound();
		});
	}

	createModalsTemplate(...arr: any) {
		this.dataY = [arr[1], arr[2], arr[3], arr[4]];
		this.dataText = [arr[5], arr[6], arr[7], arr[8]];
		this.dataStyle = textStyles("Roboto, sans-serif", 42, arr[0], "center");
		this.arrText = [];

		this.dataY.forEach((Y, i) => {
			if (Y != undefined) {
				this.arrText.push(
					this.scene.add
						.text(0, Y, this.dataText[i], this.dataStyle)
						.setOrigin(0)
						.setInteractive({cursor: "pointer"})
				);
			}
		});

		return this.arrText;
	}

	checkPaytableBacgroundState() {
		if (this.scene.info.paytableBg === "active") {
			return false;
		}
	}

	showAutoSpinContainer() {
		this.checkPaytableBacgroundState();
		this.scene.events.emit(CoreEvents.AutoSpinPopup.TOGGLE);
	}

	playSound() {
		const soundParameters = soundConfig(false);
		this.scene.clickSound.play(soundParameters);
	}
}
