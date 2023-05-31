import {PathUtil} from "@/utils/PathUtil";
import {BaseMultiAtlasEntity, AddExtensionUtil} from "@profair/core";

export class MultiAtlasEntity extends BaseMultiAtlasEntity {
	public atlasURL: string;
	public path: string;

	constructor(public readonly key: string) {
		super();

		this.atlasURL = PathUtil.multiAtlases(AddExtensionUtil.json(key));
		this.path = PathUtil.multiAtlasesPath();
	}
}
