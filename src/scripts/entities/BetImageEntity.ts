import {PathUtil} from "@/utils/PathUtil";
import {BaseImageEntity, AddExtensionUtil} from "@profair/core";

export class BetImageEntity extends BaseImageEntity {
	public readonly url: string;

	constructor(public readonly key: string) {
		super();

		this.url = PathUtil.bet(AddExtensionUtil.png(key));
	}
}
