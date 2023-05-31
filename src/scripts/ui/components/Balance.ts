import {HintModel} from "@models";
import {EHintMessages} from "@profair/config";
import {CoreEvents} from "@profair/core";
import {soundConfig} from "@utils";
import {Scene} from "phaser";
import {AppStates} from "./AppStates";

export class Balance extends AppStates {
	public readonly hintModel = new HintModel(this.scene);

	disabledSpinBtns: any[];
	defaultSpinBtns: any[];

	constructor(public scene: Scene) {
		super(scene);
		this.disabledSpinBtns = [this.scene.disabledSpin];
		this.defaultSpinBtns = [this.scene.defSpin];

		const {balance} = this.storeInstance.getData();

		if (balance === 0) this.balanceZero();

		this.scene.events.on(CoreEvents.SharingDataStore.BET_CHANGED, () => {
			this.checkBalanceForBet();
			this.playSound();
		});
	}

	playSound() {
		const soundParameters = soundConfig(false);
		this.scene.clickSound.play(soundParameters);
	}

	disableSpinButtons() {
		this.scene.disabledSpin.setVisible(true);
		this.scene.defSpin.setVisible(false);
	}

	checkBalanceForBet() {
		const {bet, balance} = this.storeInstance.getData();

		switch (true) {
			case balance > 0 && bet <= balance:
				return this.spinActivate();
			case balance > 0 && bet > balance:
				return this.spinDisabled();
			case balance === 0:
				return this.balanceZero();
		}
	}

	spinActivate() {
		this.enableAllButtons();
		this.hintModel.clearMessage();
	}

	spinDisabled() {
		this.hintModel.setMessage(EHintMessages.NOT_ENOUGH_MONEY_ON_YOUR_BALANCE);
		// 52-55 lines mock
		this.controlPanelModel.enableMaxBet();
		this.controlPanelModel.disableAutoSpin();
		this.scene.events.emit(CoreEvents.AutoSpinPopup.HIDE);

		this.disableSpinButtons();
	}

	balanceZero() {
		this.hintModel.setMessage(EHintMessages.EMPTY_BALANCE);
		this.disableAllButtons();
		this.controlPanelModel.disableAutoSpin();
	}
}
