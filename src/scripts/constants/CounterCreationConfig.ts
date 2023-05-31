import {COUNTER_TEXTS_CONFIG, COUNTER_CONTAINER, COUNTER_BACKGROUND_CONFIG} from "@/data";
import {ICounterCreationConfig} from "@profair/core";

export class CounterCreationConfig implements ICounterCreationConfig {
	public x = COUNTER_CONTAINER.x;
	public y = COUNTER_CONTAINER.y;
	public creationData = {
		backgroundConfig: COUNTER_BACKGROUND_CONFIG,
		textConfig: COUNTER_TEXTS_CONFIG
	};
}
