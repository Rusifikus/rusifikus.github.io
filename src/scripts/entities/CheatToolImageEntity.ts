import {PathUtil} from "@/utils/PathUtil";
import {BaseImageEntity, AddExtensionUtil} from "@profair/core";

export class CheatToolImageEntity extends BaseImageEntity {
	public url: string;

	constructor(public readonly key: string) {
		super();

		this.url = PathUtil.cheatTool(AddExtensionUtil.png(key));
	}
}
