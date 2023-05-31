import {PathUtil} from "@/utils/PathUtil";
import {BaseImageEntity, AddExtensionUtil} from "@profair/core";

export class PreloadSceneImageEntity extends BaseImageEntity {
	public url: string;

	constructor(public readonly key: string) {
		super();
		this.url = PathUtil.preloadSceneSources(AddExtensionUtil.png(key));
	}
}
