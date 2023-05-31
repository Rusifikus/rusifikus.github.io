import {DEFAULT_GAME_DATA} from "@data";
import {textStyles, addZero} from "@utils";

export class Time {
	public gameName: string;
	public currentTimeContainer: Phaser.GameObjects.Container;

	constructor(private scene: Phaser.Scene) {
		this.gameName = DEFAULT_GAME_DATA.gameName.toUpperCase();

		this.show();
		this.scene.events.on("update", this.update, this);
	}

	define() {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const time = `${addZero(hours)}:${addZero(minutes)}`;

		return time;
	}

	background() {
		return [
			this.scene.add.rectangle(18, 0, 145, 42, 0xffffff).setOrigin(0),
			this.scene.add.circle(0, 0, 21, 0xffffff).setOrigin(0),
			this.scene.add.circle(142, 0, 21, 0xffffff).setOrigin(0)
		];
	}

	logo() {
		return this.scene.add.image(10, 6, "timeCompanyLogo").setOrigin(0);
	}

	createGameName() {
		return this.scene.add
			.text(0, 45, this.gameName, textStyles("Roboto Condensed, sans-serif", 24, 185, "center", "#ffffff"))
			.setOrigin(0);
	}

	show() {
		const time = this.define();
		const background = this.background();
		const logo = this.logo();
		const gameName = this.createGameName();
		const currentTime = this.scene.add
			.text(120, 7, time, textStyles("Roboto Condensed, sans-serif", 24, 0, "center", "#000038"))
			.setOrigin(0);

		this.currentTimeContainer = this.scene.add
			.container(1723, 17, [...background, logo, currentTime, gameName])
			.setDepth(21);
	}

	update() {
		const time = this.define();
		this.currentTimeContainer.list[4].setText(time);
	}
}
