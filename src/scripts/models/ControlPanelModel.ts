import {ControlPanelCreationData} from "@constants";
import {
	AutoSpinView,
	BetButtonView,
	BetTableView,
	ControlPanelContext,
	CoreEvents,
	EBetButtonEvents,
	EMaxBetEvents,
	MaxBetView,
	Singleton
} from "@profair/core";

@Singleton
export class ControlPanelModel {
	private readonly controlPanelCreationData: ControlPanelCreationData = new ControlPanelCreationData();
	private readonly controlPanelContext: ControlPanelContext = new ControlPanelContext(
		this.scene,
		this.controlPanelCreationData
	);
	private maxBetView: MaxBetView;
	private betButtonView: BetButtonView;
	private autoSpinView: AutoSpinView;

	constructor(private readonly scene: Phaser.Scene) {}

	public init(): void {
		this.controlPanelContext.init();
		this.maxBetView = this.controlPanelContext.maxBetContext.getView();
		this.betButtonView = this.controlPanelContext.betButtonContext.getView();
		this.autoSpinView = this.controlPanelContext.autoSpinContext.getView();
	}

	public openBetTable(): void {
		this.scene.events.emit(CoreEvents.BetTable.OPEN);
	}

	public closeBetTable(): void {
		this.scene.events.emit(CoreEvents.BetTable.CLOSE);
	}

	public disableBetButton(): void {
		this.betButtonView.emit(EBetButtonEvents.DISABLE);
	}

	public enableBetButton(): void {
		this.betButtonView.emit(EBetButtonEvents.ENABLE);
	}

	public disableMaxBet(): void {
		this.maxBetView.emit(EMaxBetEvents.DISABLE);
	}

	public enableMaxBet(): void {
		this.maxBetView.emit(EMaxBetEvents.ENABLE);
	}

	public disableAutoSpin(): void {
		this.scene.events.emit(CoreEvents.AutoSpin.DEACTIVATE);
		this.scene.events.emit(CoreEvents.AutoSpinPopup.HIDE);
	}

	public enableAutoSpin(): void {
		this.scene.events.emit(CoreEvents.AutoSpin.ACTIVATE);
	}

	// @TODO (temporary solution) do when all buttons are transferred to the core
	public getStateVisibleMaxBet(): string {
		return this.maxBetView.frame.name;
	}

	// @TODO (temporary solution) do when all buttons are transferred to the core
	public getStateVisibleBetButton(): string {
		return this.betButtonView.frame.name;
	}

	public getStateVisibleAutoSpin(): string {
		return this.autoSpinView.frame.name;
	}
}
