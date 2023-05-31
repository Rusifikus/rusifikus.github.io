export class closeButton {
	public button: Phaser.GameObjects.Container;

	constructor(private scene: Phaser.Scene) {
		this.create();
	}

	create() {
		this.createButton();
		this.addEvent();
	}

	createButton() {
		const left = this.scene.add.rectangle(0, 0, 25, 4, 0xffffff).setAngle(45);
		const right = this.scene.add.rectangle(0, 0, 25, 4, 0xffffff).setAngle(-45);

		this.button = this.scene.add
			.container(1825, 220, [left, right])
			.setDepth(6)
			.setSize(25, 25)
			.setInteractive({cursor: "pointer"})
			.setVisible(false);
	}

	addEvent() {
		this.button.on("pointerdown", () => this.close(), this);
		this.button.on("pointerover", () => this.animationButton("over"), this);
		this.button.on("pointerout", () => this.animationButton("out"), this);
	}

	close() {
		this.scene.logs?.logsList?.hide();
		this.scene.logs?.downloadLogsButton?.hide();
		this.scene.logs?.moreButton?.hide();
		this.hide();
	}

	hide() {
		this.button.setVisible(false);
	}

	show() {
		this.button.setVisible(true);
	}

	animationButton(event: any) {
		this.scene.tweens.add({
			targets: this.button.list,
			scale: event === "over" ? 1.3 : 1,
			duration: 150
		});
	}
}
