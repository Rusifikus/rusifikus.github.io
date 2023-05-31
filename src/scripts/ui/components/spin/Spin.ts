import {GameModeUtil, LastFreeSpinUtil} from "@/utils";
import {Assets} from "@constants";
import {FreeSpinsFinalPopupModel, ProfairBankHeistModel, SpinnableSymbolsModel} from "@models";
import {CoreEvents} from "@profair/core";
import {AppStates} from "@ui/components";
import {soundConfig} from "@utils";

export class Spin extends AppStates {
	protected readonly spinnableSymbolsModel: SpinnableSymbolsModel = new SpinnableSymbolsModel(this.scene);
	protected readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();
	protected readonly freeSpinsFinalPopupModel: FreeSpinsFinalPopupModel = new FreeSpinsFinalPopupModel();

	durationCompressSymbol: number;
	constructor(public scene: Phaser.Scene) {
		super(scene);
		this.durationCompressSymbol = 100;

		if (this.scene.firstCreateSpin) {
			this.scene.firstCreateSpin = false;
		}
	}

	async spin() {
		const {freeSpinsAmount} = this.profairBankHeistModel.gameData;

		/**
		 * @deprecated
		 * @description
		 * Need to rework cheat tool
		 * @template
		 * if (CHEAT_TOOL && GameModeUtil.isFreeSpinMode(this.profairBankHeistModel.gameData?.freeSpinsAmount)) {
		 *    await this.scene.toolsCore.openFreeSpinsModal();
		 * }
		 */
		// Need to show the emitation for user that the balance changed when you start spin by the bet

		if (!GameModeUtil.isFreeSpinMode(freeSpinsAmount)) {
			const {balance, bet} = this.storeInstance.getData();
			this.storeInstance.setData({balance: balance - bet});
			this.scene.events.emit(CoreEvents.SharingDataStore.BALANCE_CHANGED);
		}
		this.freeSpinsFinalPopupModel.shouldDisplay = LastFreeSpinUtil.check(freeSpinsAmount);

		this.spinPrep();
		try {
			const {bet} = this.storeInstance.getData();
			await this.profairBankHeistModel.playRound(bet);

			this.spinApiSuccess();
			if (LOGS) this.scene.logs.logsList.addItem();
		} catch (err) {
			/**
			 * @deprecated
			 * @description
			 * Need to rework cheat tool
			 */
			// if (CHEAT_TOOL) this.scene.toolsCore.dummyOptionToolState();
		}
	}

	spinPrep() {
		if (LOGS) {
			this.scene.logs.closeButton.close();
			this.scene.logs.logsButton.removeInteractive();
		}
		/**
		 * @deprecated
		 * @description
		 * Need to rework cheat tool
		 */
		// if (CHEAT_TOOL) this.scene.toolsCore.dummyOptionToolState();
		this.setInfoButtonState("inactive");
		this.spinnableSymbolsModel.emitStartSpin();
	}

	spinApiSuccess() {
		const {stripsToShow} = this.profairBankHeistModel.gameData;
		this.setDefaultPayoutValue();
		this.playSound();
		this.spinnableSymbolsModel.emitStopSpin(stripsToShow);
		this.enableAllButtons();
		// this.scene.resultCore.showResultSpin();
	}

	setDefaultPayoutValue() {
		this.storeInstance.setData({payout: 0});
		this.scene.events.emit(CoreEvents.SharingDataStore.PAYOUT_CHANGED);
	}

	activateInfoButton() {
		this.setInfoButtonState("");
	}

	playSound() {
		const soundParameters = soundConfig(true);
		this.scene.spinSound.play(soundParameters);
	}

	startFreeSpins() {
		this.showAmountFreeSpins();
		this.changeBackgroundTexture(Assets.images.FREE_SPINS_BG, Assets.images.DUMMY_FREE_SPINS_BG);
		this.spin();
	}

	showAmountFreeSpins() {
		const {freeSpinsAmount} = this.profairBankHeistModel.gameData;
		this.scene.freeSpinsText.setVisible(true);
		this.scene.freeNumText.text = freeSpinsAmount;
	}

	hideAmountFreeSpins() {
		this.scene.freeSpinsText.setVisible(false);
	}
}
