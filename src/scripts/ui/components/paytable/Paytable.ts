import {ControlPanelModel} from "@models";
import {soundConfig} from "@utils";
import PaytablePage from "./PaytablePage";

export default class Paytable extends PaytablePage {
	public readonly controlPanelModel: ControlPanelModel = new ControlPanelModel(this.scene);
	public paytableScreenCounter: number;
	public pages: any;
	public closeButton: any;
	public dummyPaytable: any;
	public dummyPaytableBg: any;
	public buttonsStates: any[];
	public visibleButtons: any[];
	public paginators: any;
	public visibleMaxBet: string;
	public visibleBetButton: string;
	public visibleAutoSpin: string;

	constructor(public scene: Phaser.Scene) {
		super(scene);
	}

	setPaytable() {
		this.visibleMainSymbols(false);
		this.dummyPaytableVisible();
		this.closeButtonVisible();
		this.setMainScreenVisibility(false);
		this.setArrowsVisibility(true);
		this.setPaginatorsVisibility(true);
		this.setButtonsState("inactive");
		this.setPaytableState("active");
		this.setPaytableTitleVisibility(true);

		if (LOGS) {
			this.scene.logs.logsButton?.removeInteractive();
			this.scene.logs.closeButton?.close();
		}
	}

	removePaytable() {
		this.setInfoButtonState("");
		this.paytableScreenCounter = 0;
		this.visibleMainSymbols(true);
		this.dummyPaytableVisible();
		this.closeButtonVisible();
		this.setMainScreenVisibility(true);
		this.setArrowsVisibility(false);
		this.setPaginatorsVisibility(false);
		this.setButtonsState("active");
		this.setPaytableState("inactive");
		this.setPaytableTitleVisibility(false);
		this.hidePaytable();
		this.hideDisabledButtons();
		this.showActiveButtons();
		this.clearButtonsStatesArray();
		this.changeBackgroundTexture("mainBg");

		if (LOGS) {
			this.scene.logs.logsButton?.setInteractive();
		}
	}

	hidePaytable() {
		this.pages.forEach((page: any) => page.setVisible(false));
	}

	closeButtonVisible() {
		const visible = !this.closeButton.visible;
		this.closeButton.setVisible(visible);
	}

	dummyPaytableVisible() {
		const visible = !this.dummyPaytable.visible;
		this.dummyPaytable.setVisible(visible);
		this.dummyPaytableBg.setVisible(visible);
	}

	getActiveButtons() {
		this.buttonsStates = [this.scene.disabledSpin, this.scene.defSpin, this.scene.stopSpin];

		this.visibleButtons = [];

		this.buttonsStates.forEach((btn) => {
			if (btn.visible === true) this.visibleButtons.push(btn);
		});

		// @TODO (temporary solution) do when all buttons are transferred to the core
		this.visibleMaxBet = this.controlPanelModel.getStateVisibleMaxBet();
		this.visibleBetButton = this.controlPanelModel.getStateVisibleBetButton();

		if (!UK) this.visibleAutoSpin = this.controlPanelModel.getStateVisibleAutoSpin();
	}

	showDisabledButtons() {
		this.buttonsStates.forEach((el) => el.setVisible(false));
		const disableCount = 2;

		for (let i = 0; i < disableCount; i++) {
			this.buttonsStates[i].setVisible(true);
		}

		// @TODO (temporary solution) do when all buttons are transferred to the core
		this.controlPanelModel.disableMaxBet();
		this.controlPanelModel.disableBetButton();
		if (!UK) this.controlPanelModel.disableAutoSpin();
	}

	hideDisabledButtons() {
		const disableCount = 2;

		for (let i = 0; i < disableCount; i++) {
			this.buttonsStates[i].setVisible(false);
		}

		// @TODO (temporary solution) do when all buttons are transferred to the core
		if (this.visibleMaxBet != "maxBetDisabled") this.controlPanelModel.enableMaxBet();
		if (this.visibleBetButton != "BetDisabled") this.controlPanelModel.enableBetButton();
		if (this.visibleAutoSpin != "autoSpinDisabled") this.controlPanelModel.enableAutoSpin();
	}

	showActiveButtons() {
		this.visibleButtons.forEach((el) => el.setVisible(true));
	}

	clearButtonsStatesArray() {
		while (this.buttonsStates.length > 0) {
			this.buttonsStates.pop();
		}
	}

	playSound() {
		const soundParameters = soundConfig(false);
		this.scene.clickSound.play(soundParameters);
	}

	visibleMainSymbols(state: boolean) {
		const alpha = state ? 1 : 0;

		this.scene.tweens.add({
			targets: this.scene.spineData,
			alpha,
			duration: 400
		});
	}

	disabledArrows() {
		this.scene.arrowLeft.off("pointerdown");
		this.scene.arrowRight.off("pointerdown");
	}

	disabledPaginator() {
		this.paginators.forEach((paginator: Phaser.GameObjects.Arc) => {
			return paginator.off("pointerdown");
		});
	}
}
