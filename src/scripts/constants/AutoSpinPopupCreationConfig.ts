import {
	AUTO_SPIN_POPUP_CONTAINER,
	AUTO_SPIN_POPUP_SPINS_QUANTITY_LIST_BACKGROUND,
	AUTO_SPIN_POPUP_QUANTITY_TEXTS_CONTAINER_CONFIG,
	AUTO_SPIN_POPUP_QUANTITY_TEXTS_CONFIG,
	AUTO_SPIN_POPUP_QUANTITY_TEXTS_HANDLE_CONFIG
} from "@/data";
import {IAutoSpinPopupCreationConfig} from "@profair/core";

export class AutoSpinPopupCreationConfig implements IAutoSpinPopupCreationConfig {
	public x = AUTO_SPIN_POPUP_CONTAINER.x;
	public y = AUTO_SPIN_POPUP_CONTAINER.y;
	public creationData = {
		spinsQuantityListBackgroundConfig: AUTO_SPIN_POPUP_SPINS_QUANTITY_LIST_BACKGROUND,
		quantityTextsContainerConfig: AUTO_SPIN_POPUP_QUANTITY_TEXTS_CONTAINER_CONFIG,
		quantityTextsConfig: AUTO_SPIN_POPUP_QUANTITY_TEXTS_CONFIG,
		quantityTextsHandleConfig: AUTO_SPIN_POPUP_QUANTITY_TEXTS_HANDLE_CONFIG
	};
}
