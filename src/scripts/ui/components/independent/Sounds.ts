export class Sounds {
	public rectangle: Phaser.GameObjects.Rectangle;
	public circle: Phaser.GameObjects.Arc;
	public pointer: Phaser.Input.Pointer;
	public desktop: boolean;
	color: any;
	music: any;
	currentEvent: string;

	constructor(private scene: Phaser.Scene) {
		this.desktop = this.scene.sys.game.device.os.desktop;
		this.onBackgroundSound();

		if (!this.desktop) this.setEventsMobile();
		this.color = this.scene.infoCore;
		this.createElements();
		this.setEventsDesktop();
		this.pointer = this.scene.input.activePointer;
	}

	createElements() {
		this.music = this.createSlider(this.scene.allSounds);
		this.rectangle = this.scene.rexUI.add
			.roundRectangle(148, 1050, 56, 265, 28, 0xffffff)
			.setOrigin(0.5, 1)
			.setDepth(20)
			.setAlpha(0)
			.setInteractive();
	}

	createSlider(allSounds: Phaser.Sound.WebAudioSound[]) {
		const volumeValue = this.scene.musicState ? 0 : 1;
		const heightValue = 200;

		return this.scene.rexUI.add
			.slider({
				x: 142,
				y: 1000,
				width: 5,
				height: heightValue,
				orientation: "y",

				track: this.createTrackSlider(heightValue),
				indicator: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 6, this.color.inactive),
				thumb: this.scene.rexUI.add
					.roundRectangle(0, 0, 20, 20, 6, 0x000000)
					.setInteractive({cursor: "pointer"}),

				valuechangeCallback: (value: number) => {
					const newValue = 1 - value;

					allSounds.forEach((el: Phaser.Sound.WebAudioSound) => {
						el.volume = newValue;
					});
					this.switchButton(newValue);
				},
				value: volumeValue,
				input: "drag"
			})
			.setOrigin(0, 1)
			.layout()
			.setDepth(22)
			.setAlpha(0);
	}

	createTrackSlider(height: number) {
		const track = this.scene.rexUI.add
			.roundRectangle(0, 0, 0, 0, 6, this.color.active)
			.setInteractive({cursor: "pointer"});

		track.on("pointerover", () => this.animationSlider(1), this);
		track.on("pointerdown", (pointer: Phaser.Input.Pointer, localX: number, localY: number) => {
			// pointer and localX NOT delete
			const newValue = localY / height;

			this.switchButton(1 - newValue);
			this.music.setValue(newValue);
			this.scene.clickSound.play();
		});

		return track;
	}

	setEventsDesktop() {
		const buttons = [this.scene.soundOff, this.scene.soundOn, this.rectangle];

		this.setEventClick();
		this.scene.input.on("pointerup", this.hideSlider, this);
		this.music.childrenMap.thumb.on("pointerover", () => this.showSlider(1), this);

		buttons.forEach((button) => {
			button.on("pointerover", () => this.showSlider(1), this);
			button.on("pointerout", () => this.showSlider(0), this);
		});
	}

	setEventsMobile(): void {
		this.scene.musicState ? this.stateSound(false) : this.stateSound(true);
		this.setEventClick();
	}

	setEventClick() {
		this.scene.soundOff.on("pointerdown", () => this.stateSound(false), this);
		this.scene.soundOn.on("pointerdown", () => this.stateSound(true), this);
	}

	showSlider(value: number) {
		this.currentEvent = value === 1 ? "over" : "out";
		if (this.pointer.isDown && value === 0) return;

		this.animationSlider(value);
	}

	hideSlider() {
		if (this.currentEvent === "out") this.animationSlider(0);
	}

	animationSlider(value: number) {
		const duration = 100;

		this.scene.tweens.add({
			targets: [this.rectangle, this.music],
			alpha: value,
			duration
		});
	}

	stateSound(state: boolean) {
		this.stateButton(!state);

		const value = state === true ? 1 : 0;
		!this.desktop ? this.scene.sound.setMute(state) : this.music.setValue(value);
	}

	stateButton(state: boolean) {
		this.scene.soundOn.setVisible(state);
		this.scene.soundOff.setVisible(!state);
	}

	onBackgroundSound() {
		let volume = this.scene.musicState ? 1 : 0;
		if (!this.desktop) volume = 1;

		this.scene.bgSound.play({volume, loop: true});
	}

	switchButton(value: number) {
		value > 0 ? this.stateButton(true) : this.stateButton(false);
	}
}
