import {PathUtil} from "@/utils/PathUtil";
import {BaseSpineEntity, AddExtensionUtil} from "@profair/core";

export class SpinePopupsEntity extends BaseSpineEntity {
	public atlasURL: string[];
	public jsonURL: string;
	public preMultipliedAlpha: boolean;

	constructor(public readonly key: string) {
		super();

		this.jsonURL = PathUtil.spinePopupsJsonUrl(key, AddExtensionUtil.json(key));
		this.atlasURL = PathUtil.spinePopupsAtlasUrl(key, [AddExtensionUtil.atlas(key)]);
		// Only for Bank Heist case
		this.preMultipliedAlpha = false;
	}
}
