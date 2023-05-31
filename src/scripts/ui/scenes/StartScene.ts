import {textStyles} from "@utils";
import {SoundButton} from "@ui/components";
import {EScenes} from "@profair/core";
import {SceneSize} from "@/constants";

export class StartScene extends Phaser.Scene {
	public background: Phaser.GameObjects.Sprite;
	public modal: any;
	public rexUI: any;

	constructor() {
		super(EScenes.START_SCENE);
	}

	create() {
		this.createBackground();
		this.createQuestion();
	}

	createBackground() {
		this.background = this.add.sprite(0, 0, "start").setOrigin(0);
	}

	createQuestion() {
		this.add.rectangle(0, 0, SceneSize.WIDTH, SceneSize.HEIGHT, 0x000000, 0.1).setOrigin(0).setInteractive();

		this.modal = this.rexUI.add
			.dialog({
				x: Number(this.game.config.width) / 2,
				y: Number(this.game.config.height) / 2,
				width: 960,
				height: 539,
				background: this.add.sprite(0, 0, "backgroundQuestion"),

				content: this.add.text(
					0,
					0,
					`DO YOU WANT TO ENABLE\n SOUND?`,
					textStyles("Roboto Condensed, sans-serif", 70, 0, "center", "#7FCBEB")
				),

				actions: [
					new SoundButton(
						{
							scene: this,
							x: 0,
							y: 0,
							texture: "soundOnDefault"
						},
						true
					),
					new SoundButton(
						{
							scene: this,
							x: 0,
							y: 0,
							texture: "soundOffDefault"
						},
						false
					)
				],

				space: {
					content: 57,
					action: 90,

					left: 70,
					right: 70,
					top: 50,
					bottom: 44
				},

				align: {
					actions: "center"
				},

				expand: {
					content: false
				}
			})
			.layout()
			.popUp(600);
	}
}
