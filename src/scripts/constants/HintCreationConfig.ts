import {HINT_CONTAINER, HINT_MESSAGE_TEXT_CONFIG} from "@data";
import {IHintCreationConfig} from "@profair/core";

export class HintCreationConfig implements IHintCreationConfig {
	public x = HINT_CONTAINER.x;
	public y = HINT_CONTAINER.y;
	public creationData = {
		width: HINT_CONTAINER.width,
		height: HINT_CONTAINER.height,
		messageConfig: HINT_MESSAGE_TEXT_CONFIG
	};
}
