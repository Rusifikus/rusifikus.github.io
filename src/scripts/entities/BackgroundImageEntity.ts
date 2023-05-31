import {PathUtil} from "@/utils/PathUtil";
import {BaseImageEntity, AddExtensionUtil} from "@profair/core";

export class BackgroundImageEntity extends BaseImageEntity {
	public readonly url: string;

	constructor(public readonly key: string) {
		super();

		this.url = PathUtil.background(AddExtensionUtil.png(key));
	}
}
