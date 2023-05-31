import {
	IOS_POPUP_CONTAINER,
	SCENE_NAME,
	BACKGROUND_CONFIG,
	MAIN_TEXT_CONFIG,
	INFO_IMAGE_CONFIG,
	COMFRIM_BUTTON_CONFIG
} from "@/data";
import {IIosSoundPopupCreationConfig} from "@profair/core";

export class IosSoundPopupCreationConfig implements IIosSoundPopupCreationConfig {
	constructor(public sceneMusicState: boolean) {}

	public x = IOS_POPUP_CONTAINER.x;
	public y = IOS_POPUP_CONTAINER.y;
	public creationData = {
		sceneName: SCENE_NAME,
		sceneSharingData: {musicState: this.sceneMusicState},
		backgroundConfig: BACKGROUND_CONFIG,
		mainTextConfig: MAIN_TEXT_CONFIG,
		infoImageConfig: INFO_IMAGE_CONFIG,
		confirmButtonConfig: COMFRIM_BUTTON_CONFIG
	};
}
