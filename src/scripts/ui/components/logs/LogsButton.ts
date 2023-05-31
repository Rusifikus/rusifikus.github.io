import {textStyles} from "@utils";

export class LogsButton {
	public buttonWidth: number;
	public buttonHeight: number;
	public position: number[];
	public buttonLogs: Phaser.GameObjects.Container;
	public trigger: Phaser.GameObjects.Rectangle;

	constructor(private scene: Phaser.Scene) {
		this.buttonWidth = 120;
		this.buttonHeight = 50;
		this.position = [20, 20];

		this.create();
	}

	create() {
		this.createButtonLogs();
		this.addTriggerEvent();
	}

	createButtonLogs() {
		const button = this.createButton();
		const text = this.createText();
		const trigger = this.createButtonTrigger();
		const elements = [button, text, trigger];

		this.buttonLogs = this.scene.add.container(20, 20, elements).setDepth(5);
	}

	createButton() {
		const graphics = this.scene.add.graphics();
		graphics.fillStyle(0x000, 0.7);
		graphics.fillRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, 5);

		return graphics;
	}

	createButtonTrigger() {
		return (this.trigger = this.scene.add
			.rectangle(0, 0, this.buttonWidth, this.buttonHeight, 0xfff, 0.01)
			.setInteractive({cursor: "pointer"})
			.setOrigin(0));
	}

	createText() {
		const text = this.scene.add.text(
			0,
			0,
			"LOGs",
			textStyles("Roboto, sans-serif", 27, this.buttonWidth, "center", "#ffffff")
		);
		const y = (this.buttonHeight - text.displayHeight) / 2;

		text.setPosition(0, y);
		return text;
	}

	addTriggerEvent() {
		this.trigger.on("pointerdown", () => this.showLogs(), this);
		this.trigger.on("pointerover", () => this.animationButton("over"), this);
		this.trigger.on("pointerout", () => this.animationButton("out"), this);
	}

	showLogs() {
		this.scene.logs?.logsList?.show();
		this.scene.logs?.closeButton?.show();
		this.scene.logs?.downloadLogsButton?.show();

		if (this.scene.allLogs.length > 10 && this.scene.logs.logsList.logCounter < this.scene.allLogs.length) {
			this.scene.logs?.moreButton?.show();
			this.scene.logs?.downloadLogsButton?.setPosition("displaced");
		}
	}

	setInteractive() {
		this.trigger.setInteractive({cursor: "pointer"});
	}

	removeInteractive() {
		this.trigger.removeInteractive();
	}

	animationButton(event: any) {
		this.scene.tweens.add({
			targets: this.buttonLogs,
			scale: event === "over" ? 1.05 : 1,
			x: event === "over" ? this.position[0] - 2 : this.position[0],
			y: event === "over" ? this.position[1] - 2 : this.position[1],
			duration: 100
		});
	}
}
