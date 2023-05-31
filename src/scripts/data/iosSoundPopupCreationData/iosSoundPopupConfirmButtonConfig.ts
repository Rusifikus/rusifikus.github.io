import {EIoSoundPopupState} from "@/enum";
import {textStyles} from "@/utils";
import {IIosSoundPopupConfirmButtonConfig} from "@profair/core";

export const COMFRIM_BUTTON_CONFIG: IIosSoundPopupConfirmButtonConfig = {
	x: 0,
	y: 262,
	background: {
		x: 0,
		y: 0,
		texture: EIoSoundPopupState.MODAL_BUTTONS,
		standartFrame: EIoSoundPopupState.BUTTON_DEFAULT,
		hoverFrame: EIoSoundPopupState.BUTTON_HOVER
	},
	text: {
		x: 0,
		y: 0,
		text: "OK",
		style: textStyles("Roboto Condensed, sans-serif", 62, 0, "center", "#000000")
	}
};
