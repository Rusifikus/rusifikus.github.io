import {ControlPanelModel} from "@models";
import {SharingDataStore} from "@profair/core";

export class AppStates {
	public defaultBtn: any[];
	public disabledBtn: any[];
	public readonly controlPanelModel: ControlPanelModel = new ControlPanelModel(this.scene);
	public readonly storeInstance = SharingDataStore.getStoreInstance();

	constructor(public scene: Phaser.Scene) {}
	// - buttons
	defineAllButtons() {
		this.defaultBtn = [this.scene.defSpin];
		this.disabledBtn = [this.scene.disabledSpin];
	}

	disableAllButtons() {
		this.defineAllButtons();
		this.defaultBtn.forEach((el) => el.setVisible(false));
		this.disabledBtn.forEach((el) => el.setVisible(true));

		/** @TODO (temporary solution) do when all buttons are transferred to the core */
		this.scene.info.removeInteractive();

		this.controlPanelModel.disableMaxBet();
		this.controlPanelModel.disableAutoSpin();
		this.controlPanelModel.disableBetButton();
	}

	enableAllButtons() {
		this.defineAllButtons();
		this.defaultBtn.forEach((el) => el.setVisible(true));
		this.disabledBtn.forEach((el) => el.setVisible(false));

		this.controlPanelModel.enableAutoSpin();
		this.controlPanelModel.enableBetButton();

		/** @TODO (temporary solution) do when all buttons are transferred to the core */
		this.scene.info.setInteractive({cursor: "pointer"});

		/** @TODO (temporary solution) do when all buttons are transferred to the core*/
		const maxBetState = this.controlPanelModel.getStateVisibleMaxBet();

		/** @TODO (temporary solution) do when all buttons are transferred to the core*/
		if (maxBetState === "maxBetDisabled") this.controlPanelModel.enableMaxBet();
	}

	// - set visibility
	setMainScreenVisibility(visibility: boolean) {
		this.scene.spineContainer.setVisible(visibility);
	}

	setArrowsVisibility(visibility: boolean) {
		this.scene.arrowRight.setVisible(visibility);
		this.scene.arrowLeft.setVisible(visibility);
	}

	setPaginatorsVisibility(visibility: boolean) {
		this.scene.infoCore.paginatorContainer.setVisible(visibility);
	}

	setPaytableTitleVisibility(visibility: boolean) {
		this.scene.infoCore.paytableTitle.setVisible(visibility);
	}

	setStopVisibility(state: boolean) {
		this.scene.stopSpin.setVisible(state);
		this.scene.defSpin.setVisible(!state);
	}

	// - set state
	setInfoButtonState(state: string) {
		this.scene.info.state = state;
	}

	setButtonsState(state: string) {
		this.scene.defSpin.setState(state);
		this.scene.info.setState(state);
	}

	setPaytableState(state: string) {
		this.scene.info.paytableBg = state;
	}

	setPaginatorState(num: number) {
		this.scene.infoCore.paginators.forEach((paginator: Phaser.GameObjects.Arc) => {
			paginator.setState("inactive");
			paginator.setFillStyle(this.scene.infoCore.inactive);
		});

		this.scene.infoCore.paginators[num].setState("active");
		this.scene.infoCore.paginators[num].setFillStyle(this.scene.infoCore.active);
	}

	// check and change
	changeBackgroundTexture(backgroundTexture: string, tableBackground = "dummyMainBg") {
		this.scene.bg.setTexture(backgroundTexture);
		this.scene.dummyBg.setTexture(tableBackground);
	}

	showDisabledSpinButton() {
		this.scene.stopSpin.setVisible(false);
		this.scene.disabledSpin.setVisible(true);
	}
}
