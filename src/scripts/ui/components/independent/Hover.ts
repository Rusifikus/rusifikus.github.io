interface IHoverInputParams {
	element: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
	hoverTexture: string;
	defaultTexture: string;
}

export class Hover {
	public element: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
	public hoverTexture: string;
	public defaultTexture: string;

	constructor(params: IHoverInputParams) {
		this.element = params.element;
		this.hoverTexture = params.hoverTexture;
		this.defaultTexture = params.defaultTexture;

		this.hover();
		this.default();
	}

	hover() {
		this.element.on("pointerover", () => {
			this.element.setFrame(this.hoverTexture);
		});
	}

	default() {
		this.element.on("pointerout", () => {
			this.element.setFrame(this.defaultTexture);
		});
	}
}
