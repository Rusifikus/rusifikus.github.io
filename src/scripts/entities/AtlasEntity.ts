import {PathUtil} from "@/utils/PathUtil";
import {BaseAtlasEntity, AddExtensionUtil} from "@profair/core";

export class AtlasEntity extends BaseAtlasEntity {
	public readonly atlasURL: string;
	public readonly textureURL: string;

	constructor(public readonly key: string) {
		super();

		this.atlasURL = PathUtil.atlases(AddExtensionUtil.png(key));
		this.textureURL = PathUtil.atlases(AddExtensionUtil.json(key));
	}
}
