import {textStyles} from "@utils";
import {GameObjects} from "phaser";

export class DownloadLogsButton {
	public buttonWidth: number;
	public buttonHeight: number;
	public defaultPosition: number[];
	public displacedPosition: number[];
	public currentPosition: any;
	public text: string;
	public background: Phaser.GameObjects.Graphics;
	public trigger: Phaser.GameObjects.Rectangle;
	public button: Phaser.GameObjects.Container;

	constructor(private scene: Phaser.Scene) {
		this.buttonWidth;
		this.buttonHeight = 50;
		this.defaultPosition = [810, 825];
		this.displacedPosition = [935, 825];
		this.currentPosition = this.defaultPosition;
		this.text = "Download Logs";
		this.create();
	}

	create() {
		this.createButton();
		this.addEvent();
	}

	createButton() {
		this.background = this.createBackground();
		this.trigger = this.createTrigger();
		//TODO !!!!
		this.text = this.createText();

		const elements: any = [this.background, this.trigger, this.text];
		this.button = this.scene.add
			.container(this.defaultPosition[0], this.defaultPosition[1], elements)
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
		this.trigger.on("pointerdown", () => this.download(), this);
		this.trigger.on("pointerover", () => this.animationButton("over"), this);
		this.trigger.on("pointerout", () => this.animationButton("out"), this);
	}

	download() {
		const json = JSON.stringify(this.scene.allLogs, null, 2);
		const blob = new Blob([json], {type: "application/json"});
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.download = "logs.json";
		a.href = url;
		a.click();
	}

	show() {
		this.button.setVisible(true);
	}

	hide() {
		this.button.setVisible(false);
	}

	setPosition(state: string) {
		this.currentPosition = state === "default" ? this.defaultPosition : this.displacedPosition;
		this.button.setPosition(...this.currentPosition);
	}

	animationButton(event: any) {
		this.scene.tweens.add({
			targets: this.button,
			scale: event === "over" ? 1.05 : 1,
			x: event === "over" ? this.currentPosition[0] - 5 : this.currentPosition[0],
			y: event === "over" ? this.currentPosition[1] - 1 : this.currentPosition[1],
			duration: 100
		});
	}
}
