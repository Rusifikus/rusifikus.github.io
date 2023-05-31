import {GameModeUtil} from "@/utils";
import {Spin} from "./Spin";
import {CoreEvents} from "@profair/core";
import {AutoSpinPopupModel, CounterModel} from "@models";

export class AutoSpin extends Spin {
	private autoSpinPopup = new AutoSpinPopupModel(this.scene);
	private counter = new CounterModel(this.scene);
	public counterContainer: Phaser.GameObjects.Container;

	constructor(public scene: Phaser.Scene) {
		super(scene);
		if (UK) return;

		this.autoSpinPopup.init();
		this.counter.init();

		this.scene.events.on(CoreEvents.SpinnableSymbols.START_AUTO_SPIN, this.startAutoSpin, this);
		this.scene.stopSpin.on("pointerdown", this.onStop, this);
	}

	get amountSpin() {
		return this.counter.model.quantity;
	}

	startAutoSpin() {
		const {balance} = this.storeInstance.getData();

		switch (true) {
			case GameModeUtil.isFreeSpinMode(this.scene.result?.infoForPlayer?.freeSpinsAmount):
				this.inFreeSpinMode();
				this.setZeroSpinAmount();
				this.showDisabledSpinButton();
				break;
			case this.amountSpin > 0 && balance >= 0:
				this.inDefaultMode();
				break;
			case this.amountSpin === 0 && this.scene.result?.infoForPlayer?.freeSpinsAmount === 0:
				if (balance >= 0) this.checkBalanceOnStop();
				this.changeBackgroundTexture("mainBg");
				this.hideAmountFreeSpins();
				break;
			case this.scene.result?.infoForPlayer?.freeSpinsAmount === 0 && this.amountSpin > 0:
				this.checkBalanceForSpin();
				this.changeBackgroundTexture("mainBg");
				this.hideAmountFreeSpins();
				break;
		}
	}

	inFreeSpinMode() {
		this.scene.events.emit(CoreEvents.Counter.HIDE);
		this.startFreeSpins();
		this.showDisabledSpinButton();
	}

	inDefaultMode() {
		this.scene.spinMode = "isAutoSpin";
		this.hideAmountFreeSpins();
		this.setStopVisibility(true);
		this.changeBackgroundTexture("mainBg");
		this.disableAllButtons();
		this.spin();
		this.scene.events.emit(CoreEvents.Counter.DECREMENT);
	}

	checkBalanceOnStop() {
		this.scene.stopSpin.setVisible(false);
		this.enableAllButtons();
		this.hideAmountFreeSpins();
		this.scene.events.emit(CoreEvents.Counter.HIDE);
	}

	onStop() {
		this.setZeroSpinAmount();
		this.showDisabledSpinButton();
		this.scene.stopSound.play();
	}

	checkBalanceForSpin() {
		const {balance, bet} = this.storeInstance.getData();

		switch (true) {
			case balance > 0 && bet <= balance:
				return this.startAutoSpin();
			case balance > 0 && bet > balance:
				return this.spinDisabled();
			case GameModeUtil.isFreeSpinMode(this.scene.result?.infoForPlayer?.freeSpinsAmount):
				return this.startAutoSpin();
			case balance === 0:
				return this.balanceZero();
		}
	}

	setDefaultState() {
		this.setZeroSpinAmount();
		this.scene.events.emit(CoreEvents.Counter.HIDE);
		this.changeBackgroundTexture("mainBg");
		this.hideAmountFreeSpins();
		this.scene.stopSpin.setVisible(false);
	}

	spinDisabled() {
		this.setDefaultState();
		this.scene.balanceCore.spinDisabled();
	}

	balanceZero() {
		this.setDefaultState();
		this.scene.balanceCore.balanceZero();
	}

	setZeroSpinAmount() {
		this.counter.model.setQuantity(0);
	}
}
