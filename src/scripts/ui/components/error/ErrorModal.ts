import {textStyles} from "@utils";
import {AppStates} from "@ui/components";

const MODAL_BUTTONS = "modalButtons";
const BUTTON_DEFAULT = "reloadDefault";
const BUTTON_HOVER = "reloadOver";
export class ErrorModal extends AppStates {
	public canvasWidth: number;
	public canvasHeight: number;
	public textError: string;
	public textReload: string;
	public errorAnimation: any;
	public modal: any;
	public backgroundWidth: number;
	public backgroundHeight: number;
	public modalX: number;
	public modalY: number;

	constructor(public scene: Phaser.Scene) {
		super(scene);
		this.canvasWidth = this.scene.scale.canvas.width;
		this.canvasHeight = this.scene.scale.canvas.height;
		this.textError = "CONNECTION ERROR";
		this.textReload = "Please, reload the page,\n or try again later";

		this.create();
	}

	create() {
		this.createModal();
		this.errorAnimation.play("errorAnimation");

		this.scene.tweens.add({
			targets: this.modal,
			alpha: 1,
			duration: 600
		});
	}

	createModal() {
		const background = this.createBackground();
		const textError = this.createTitleText(this.textError);
		const textReload = this.createBodyText(this.textReload);
		const logoAnimation = this.createErrorAnimation();
		const buttonReload = this.createReloadButton();

		const allElements = [background, textError, textReload, logoAnimation, buttonReload];

		this.modal = this.scene.add.container(this.modalX, this.modalY, allElements).setAlpha(0).setDepth(10);
	}

	createBackground() {
		const background = this.scene.add.sprite(0, 0, "errorModalBackground").setOrigin(0);

		this.backgroundWidth = background.width;
		this.backgroundHeight = background.height;
		this.modalX = this.canvasWidth / 2 - this.backgroundWidth / 2;
		this.modalY = this.canvasHeight / 2 - this.backgroundHeight / 2;

		return background;
	}

	createTitleText(text: string) {
		const style = textStyles("Roboto Condensed", 84, this.backgroundWidth, "center", "#7FCBEB");
		return this.scene.add.text(0, 43, text, style);
	}

	createBodyText(text: string) {
		const style = textStyles("Roboto", 48, this.backgroundWidth, "center", "#fff");
		return this.scene.add.text(0, 193, text, style);
	}

	createErrorAnimation() {
		return (this.errorAnimation = this.createAtlasPopupTemplate("errorAnimation", "error_00000", 59, "error_", 5));
	}

	createAtlasPopupTemplate(
		fileName: string,
		startFrame: string,
		end: number,
		prefix: string,
		zeroPad: number,
		frameRate = 30,
		start = 0
	) {
		const frames = this.scene.anims.generateFrameNames(fileName, {
			start,
			end,
			zeroPad,
			prefix,
			suffix: ""
		});

		this.scene.anims.create({
			key: fileName,
			frames,
			frameRate,
			repeat: -1
		});

		return this.scene.add.sprite(this.backgroundWidth / 2, 463, fileName, startFrame);
	}

	createReloadButton() {
		const button = this.scene.add.sprite(0, 0, MODAL_BUTTONS, BUTTON_DEFAULT).setOrigin(0.5);
		const textReload = this.scene.add
			.text(0, 0, "RELOAD", textStyles("Roboto Condensed", 62, 0, "center", "#000"))
			.setOrigin(0.5);

		const buttonTrigger = this.scene.add
			.zone(0, 0, button.width, button.height)
			.setOrigin(0.5)
			.setInteractive({cursor: "pointer"})
			.on(Phaser.Input.Events.POINTER_OVER, () => button.setFrame(BUTTON_HOVER))
			.on(Phaser.Input.Events.POINTER_OUT, () => button.setFrame(BUTTON_DEFAULT))
			.on(Phaser.Input.Events.POINTER_DOWN, () => location.reload());

		return this.scene.add.container(this.backgroundWidth / 2, this.backgroundHeight - 103, [
			button,
			textReload,
			buttonTrigger
		]);
	}
}
