import {PathUtil} from "@utils/PathUtil";
import {BaseImageEntity, AddExtensionUtil} from "@profair/core";

export class PaytableImageEntity extends BaseImageEntity {
	public readonly url: string;

	constructor(public readonly key: string) {
		super();

		this.url = PathUtil.paytable(AddExtensionUtil.png(key));
	}
}
