import {Hover} from "@ui/components";

export interface IButtonInputData {
	scene: Phaser.Scene;
	texture: string;
	x: number;
	y: number;
}
export class Button extends Phaser.GameObjects.Sprite {
	public overTexture: any;
	public defaultTexture: any;

	constructor(data: IButtonInputData) {
		super(data.scene, data.x, data.y, "interface");

		//TODO Need to resolve it cause frame isn't the texture. Frame can contain texture key.
		this.frame = data.texture;
		this.overTexture = data.texture.includes("Disabled")
			? data.texture.replace("Disabled", "Over")
			: data.texture.replace("Default", "Over");
		this.defaultTexture = data.texture.includes("Default")
			? data.texture
			: data.texture.replace("Disabled", "Default");

		this.init();
		this.hover();
	}

	init() {
		this.setFrame(this.frame);
		this.scene.add.existing(this);
		this.setActive(!!0);
		this.setOrigin(0);
	}

	hover() {
		new Hover({
			element: this,
			hoverTexture: this.overTexture,
			defaultTexture: this.defaultTexture
		});
	}
}
