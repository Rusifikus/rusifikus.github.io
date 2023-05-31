import {BACKGROUND_IMAGES, BET_IMAGES, IOS_IMAGES, LOGO_IMAGES, PAYTABLE_IMAGES} from "@/data";
import {Singleton} from "@profair/core";
import {
	BackgroundImageEntity,
	BetImageEntity,
	IOSImageEntity,
	PaytableImageEntity,
	TimeCompanyLogoImageEntity
} from "@/entities";
import {ProfairSourceModel} from "@profair/core";

@Singleton
export class ImagesModel {
	private readonly profairSourceModel: ProfairSourceModel = new ProfairSourceModel();

	public preload(scene: Phaser.Scene) {
		this.betImages(scene);
		this.backGroundsImages(scene);
		this.logoImages(scene);
		this.paytableImages(scene);
		this.IOSImages(scene);
	}

	private betImages(scene: Phaser.Scene): void {
		this.profairSourceModel.loadImage(scene, BET_IMAGES, BetImageEntity);
	}

	private backGroundsImages(scene: Phaser.Scene): void {
		this.profairSourceModel.loadImage(scene, BACKGROUND_IMAGES, BackgroundImageEntity);
	}

	private logoImages(scene: Phaser.Scene): void {
		this.profairSourceModel.loadImage(scene, LOGO_IMAGES, TimeCompanyLogoImageEntity);
	}

	private paytableImages(scene: Phaser.Scene): void {
		this.profairSourceModel.loadImage(scene, PAYTABLE_IMAGES, PaytableImageEntity);
	}

	private IOSImages(scene: Phaser.Scene): void {
		this.profairSourceModel.loadImage(scene, IOS_IMAGES, IOSImageEntity);
	}
}
