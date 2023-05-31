import {soundConfig} from "@utils";
import Paytable from "./Paytable";

export default class Paginators extends Paytable {
	public paginatorContainer: Phaser.GameObjects.Container;
	public inactive: number;
	public active: number;
	constructor(public scene: Phaser.Scene) {
		super(scene);

		this.active = 0x95c3f1;
		this.inactive = 0x006c8c;
	}

	createPaginator() {
		this.paginators = [];

		for (let i = 0; i < this.pages.length; i++) {
			const paginator = this.scene.add
				.circle(30 * i, 0, 10, this.inactive)
				.setOrigin(0)
				.setInteractive({cursor: "pointer"});
			this.paginators.push(paginator);
		}

		this.paginatorContainer = this.scene.add.container(905, 835, this.paginators).setDepth(5).setVisible(false);

		this.changePaginatorTexture();
	}

	changePaginatorTexture() {
		this.paginators.forEach((paginator: Phaser.GameObjects.Arc) => {
			paginator.on("pointerover", () => paginator.setFillStyle(this.active));

			paginator.on("pointerout", () => {
				paginator.state === "active"
					? paginator.setFillStyle(this.active)
					: paginator.setFillStyle(this.inactive);
			});
		});
	}

	playSound() {
		const soundParameters = soundConfig(false);
		this.scene.clickSound.play(soundParameters);
	}
}
