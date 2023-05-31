import {EModeNames} from "@/enum";
import {GameModeUtil} from "@/utils";
import {Spin} from "./Spin";
import {ProfairBankHeistModel} from "@/models";

export class DefaultSpin extends Spin {
	constructor(public scene: Phaser.Scene) {
		super(scene);
		this.scene.defSpin.on("pointerdown", this.onSpin, this);
	}

	onSpin() {
		this.disableAllButtons();
		this.startSpin();
	}

	startSpin() {
		const {freeSpinsAmount} = this.profairBankHeistModel.gameData;
		switch (true) {
			case GameModeUtil.isFreeSpinMode(freeSpinsAmount):
				this.startFreeSpins();
				break;
			default:
				this.inDefaultMode();
				break;
		}
	}

	/**
	 * @description
	 * note: this method is called after all popups are closed
	 * if freespins amount > 0, then start freespins
	 * else return view to default state
	 */
	startFreeSpinsIfExistsOrSetToDefaultState(): void {
		const {freeSpinsAmount} = this.profairBankHeistModel.gameData;
		switch (true) {
			case GameModeUtil.isFreeSpinMode(freeSpinsAmount):
				this.startFreeSpins();
				break;
			default:
				this.hideAmountFreeSpins();
				this.changeBackgroundTexture("mainBg");
				this.checkBalance();
				break;
		}
	}

	checkBalance() {
		const {balance} = this.storeInstance.getData();
		if (balance < 0) {
			this.scene.balanceCore.disableSpinButtons();
		} else if (balance === 0) {
			this.disableAllButtons();
		}
	}

	inDefaultMode() {
		this.scene.spinMode = EModeNames.IS_SPIN;
		this.spin();
	}
}
