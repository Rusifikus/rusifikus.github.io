import {
	AUTO_SPIN_BUTTON,
	BALANCE_CONTAINER,
	BET_BUTTON,
	BET_CONTAINER,
	BET_TABLE,
	FULL_SCREEN_BUTTON,
	MAX_BET_BUTTON,
	PAYOUT_CONTAINER
} from "@/data";
import {
	IBalanceContainerCreationConfig,
	IBetContainerCreationConfig,
	IBetTableCreationConfig,
	IButtonCreationConfig,
	IPayoutContainerCreationConfig
} from "@profair/core";

export class ControlPanelCreationData {
	public fullScreenCreationConfig: IButtonCreationConfig = FULL_SCREEN_BUTTON;
	public maxBetCreationConfig: IButtonCreationConfig = MAX_BET_BUTTON;
	public betButtonCreationConfig: IButtonCreationConfig = BET_BUTTON;
	public betContainerCreationConfig: IBetContainerCreationConfig = BET_CONTAINER;
	public balanceContainerCreationConfig: IBalanceContainerCreationConfig = BALANCE_CONTAINER;
	public autoSpinCreationConfig: IButtonCreationConfig = AUTO_SPIN_BUTTON;
	public payoutContainerCreationConfig: IPayoutContainerCreationConfig = PAYOUT_CONTAINER;
	public betTableCreationConfig: IBetTableCreationConfig = BET_TABLE;
}
