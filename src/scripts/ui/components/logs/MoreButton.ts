import {textStyles} from "@utils";

export class MoreButton {
	public background: Phaser.GameObjects.Graphics;
	public trigger: Phaser.GameObjects.Rectangle;
	public button: Phaser.GameObjects.Container;

	public buttonWidth: number = 200;
	public buttonHeight: number = 50;
	public position: number[] = [685, 825];
	public text: string = "Show More";

	constructor(private scene: Phaser.Scene) {
		this.create();
	}

	create() {
		this.createButton();
		this.addEvent();
	}

	createButton() {
		this.background = this.createBackground();
		this.trigger = this.createTrigger();
		//TODO
		this.text = this.createText();

		const elements: any = [this.background, this.trigger, this.text];
		this.button = this.scene.add
			.container(...this.position, elements)
			.setDepth(6)
			.setVisible(false);
	}

	createBackground() {
		const graphics = this.scene.add.graphics();
		graphics.fillStyle(0x545454, 1);
		graphics.fillRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, 5);

		return graphics;
	}

	createTrigger() {
		return this.scene.add
			.rectangle(0, 0, this.buttonWidth, this.buttonHeight, 0x000, 0.01)
			.setInteractive({cursor: "pointer"})
			.setOrigin(0);
	}

	createText() {
		const y = this.buttonHeight / 2;

		return this.scene.add
			.text(0, y, this.text, textStyles("Roboto, sans-serif", 27, this.buttonWidth, "center", "#ffffff"))
			.setOrigin(0, 0.5);
	}

	addEvent() {
		this.trigger.on("pointerdown", () => this.scene.logs?.logsList?.showMore(), this);
		this.trigger.on("pointerover", () => this.animationButton("over"), this);
		this.trigger.on("pointerout", () => this.animationButton("out"), this);
	}

	show() {
		this.button.setVisible(true);
	}

	hide() {
		this.button.setVisible(false);
	}

	animationButton(event: any) {
		this.scene.tweens.add({
			targets: this.button,
			scale: event === "over" ? 1.05 : 1,
			x: event === "over" ? this.position[0] - 5 : this.position[0],
			y: event === "over" ? this.position[1] - 1 : this.position[1],
			duration: 100
		});
	}
}
