import {PathUtil} from "@/utils/PathUtil";
import {BaseImageEntity, AddExtensionUtil} from "@profair/core";

export class IOSImageEntity extends BaseImageEntity {
	public readonly url: string;

	constructor(public readonly key: string) {
		super();

		this.url = PathUtil.ios(AddExtensionUtil.png(key));
	}
}
