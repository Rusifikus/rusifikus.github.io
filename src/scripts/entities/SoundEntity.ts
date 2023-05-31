import {PathUtil} from "@/utils/PathUtil";
import {BaseSoundEntity, AddExtensionUtil} from "@profair/core";

export class SoundEntity extends BaseSoundEntity {
	public readonly soundURLS: string[];

	constructor(public readonly key: string) {
		super();

		this.soundURLS = PathUtil.sounds([AddExtensionUtil.ogg(key), AddExtensionUtil.mp3(key)]);
	}
}
