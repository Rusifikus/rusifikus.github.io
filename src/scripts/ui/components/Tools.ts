import {Assets, SceneSize} from "@/constants";
import {ProfairBankHeistModel} from "@/models";
import {GameModeUtil} from "@/utils";
import {textStyles} from "@utils";
import {Scene} from "phaser";

export class Tools {
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();

	public inputsValue: number[];
	public cheatToolState: boolean;
	public isFreeSpins: boolean;
	public hidePositionTools: number;
	public showPositionTools: number;
	public font: string;
	public baseModeValues: number[];
	public freeSpinsModeValues: number[];
	public stripsLengthData: any;
	public modalAllElementsInputs: any[];
	public arrow: any;
	public buttonsMode: any;
	public allElementsInputs: any[];

	public bgSwitchOff: Phaser.GameObjects.Graphics;
	public bgSwitchOn: Phaser.GameObjects.Graphics;
	public switchCircle: Phaser.GameObjects.Arc;
	public triggerSwitch: Phaser.GameObjects.Rectangle;
	public dummyOptionTool: Phaser.GameObjects.Rectangle;
	public background: Phaser.GameObjects.Sprite;
	public error: Phaser.GameObjects.Text;
	public modalBackground: Phaser.GameObjects.Sprite;
	public modalError: Phaser.GameObjects.Text;
	public freeSpinModalRandomButton: Phaser.GameObjects.Sprite;
	public freeSpinModalSpinButton: Phaser.GameObjects.Sprite;
	public toolModal: Phaser.GameObjects.Container;
	public tools: Phaser.GameObjects.Container;

	constructor(private scene: Scene) {
		this.inputsValue = [2, 2, 2, 2, 2];
		this.cheatToolState = true;

		this.isFreeSpins = false;
		this.hidePositionTools = -266;
		this.showPositionTools = -5;
		this.font = "Roboto Regular, sans-serif";

		this.baseModeValues = [2, 2, 2, 2, 2];
		this.freeSpinsModeValues = [2, 2, 2, 2, 2];
	}

	create() {
		this.createElements();
		this.checkRecovery();
	}

	createElements() {
		this.getStripsLengthData();
		const modalElements = [
			this.createModalBackground(),
			this.createModalError(),
			...this.createModalButtons(),
			...this.createModalSymbolPosition()
		];

		const elements = [
			this.createBackground(),
			this.createError(),
			this.createTrigger(),
			this.createToolsText(),
			this.createArrow(),
			...this.createButtonsMode(),
			...this.createSymbolPosition(),
			this.createRandomText(),
			this.createSwitch(),
			this.createDummyOptionsTool()
		];

		this.createStyle();
		this.toolModal = this.scene.add
			.container(SceneSize.WIDTH / 2, SceneSize.HEIGHT / 2, modalElements)
			.setDepth(5)
			.setScale(0)
			.setAlpha(0);
		this.tools = this.scene.add.container(0, this.hidePositionTools, elements).setDepth(5);
	}

	checkRecovery() {
		const {nextSymbolNumbers, freeSpinsAmount} = this.profairBankHeistModel.gameData;

		if (!!nextSymbolNumbers) this.setNumberOnInputs();
		if (GameModeUtil.isFreeSpinMode(freeSpinsAmount) && this.cheatToolState) this.switchTween();
	}

	getStripsLengthData() {
		this.stripsLengthData = this.scene.result.stripsLengthData;
	}

	createBackground() {
		return (this.background = this.scene.add.sprite(0, 0, "tools", "backgroundTools").setOrigin(0));
	}

	createError() {
		return (this.error = this.scene.add
			.text(
				0,
				62.5,
				"Invalid value",
				textStyles(this.font, 20, this.background.displayWidth, "center", "#ffffff")
			)
			.setVisible(false));
	}
	createModalBackground() {
		return (this.modalBackground = this.scene.add.sprite(0, 0, Assets.images.CHEAT_TOOL_BACKROUND).setOrigin(0.5));
	}

	createModalError() {
		return (this.modalError = this.scene.add
			.text(
				0,
				-60,
				"Invalid value",
				textStyles(this.font, 20, this.modalBackground.displayWidth, "center", "#ffffff")
			)
			.setVisible(false)
			.setOrigin(0.5, 1));
	}

	createModalButtons() {
		this.freeSpinModalRandomButton = this.scene.add
			.sprite(-20, 100, "cheatToolButton")
			.setOrigin(1)
			.setScale(0.8, 1)
			.setInteractive({cursor: "pointer"});

		this.freeSpinModalSpinButton = this.scene.add
			.sprite(20, 100, "cheatToolButton")
			.setOrigin(0, 1)
			.setScale(0.8, 1)
			.setInteractive({cursor: "pointer"});

		const buttons = [
			this.freeSpinModalRandomButton,
			this.scene.add.text(-10, 90, "RANDOM", textStyles(this.font, 24, 200, "center", "#ffffff")).setOrigin(1),
			this.freeSpinModalSpinButton,
			this.scene.add.text(10, 90, "SPIN", textStyles(this.font, 24, 200, "center", "#ffffff")).setOrigin(0, 1)
		];

		return buttons;
	}

	createModalSymbolPosition() {
		const text = this.scene.add
			.text(0, -100, "SYMBOL POSITION IN THE FREE SPIN REEL", textStyles(this.font, 20, 500, "center", "#ffffff"))
			.setStroke("#000000", 10)
			.setOrigin(0.5);

		this.modalAllElementsInputs = [];
		const allElements: any = [text];
		let x = -200;

		for (let i = 0; i < 5; i++) {
			const bgInput = this.scene.add.sprite(x, -40, "tools", "rectangleTools").setOrigin(0);
			const input = this.createModalInput(x - 10, -40, i, this);

			allElements.push(bgInput, input);
			this.modalAllElementsInputs.push(input);

			x += 82;
		}

		return allElements;
	}

	createModalInput(x: number, y: number, number: number, context: any) {
		const inputSetting = {
			id: "myNumberInput",
			type: "number",
			fontSize: "30px",
			align: "center"
		};
		context.inputValue = context.freeSpinsModeValues;
		const inputNumber = this.scene.add
			.rexInputText(x, y + 10, 10, 10, inputSetting)
			.resize(100, 40)
			.setOrigin(0)
			.setText(this.freeSpinsModeValues[number])
			.on("textchange", (inputText: Phaser.GameObjects.Text) => {
				const currentMode = this.stripsLengthData.freeSpinsMode;
				const inputValue = Number(inputText.text);
				const currentNumber = currentMode[number] - 1;

				if (inputValue > currentNumber || inputValue < 0 || inputText.text === "00") {
					this.modalError.setVisible(true).setText(`Invalid value. Number range 0-${currentNumber}`);
					return inputNumber.setText(context.inputValue[number]);
				}

				context.inputsValue[number] = +inputText.text;
				this.modalError.setVisible(false);
			});
		return inputNumber;
	}

	async openFreeSpinsModal() {
		this.visible();

		this.scene.tweens.add({
			targets: this.toolModal,
			scale: 1,
			alpha: 1,
			duration: 300
		});

		return new Promise((resolve) => {
			this.freeSpinModalSpinButton.on(
				"pointerdown",
				() => {
					this.modalAllElementsInputs.forEach((input, i) => {
						this.freeSpinsModeValues[i] = Number(input.text);
					});

					this.scene.tweens.add({
						targets: this.toolModal,
						scale: 0,
						alpha: 0,
						duration: 300
					});
					if (!this.cheatToolState) this.switchTween();

					resolve("");
				},
				this
			);

			this.freeSpinModalRandomButton.on(
				"pointerdown",
				() => {
					this.scene.tweens.add({
						targets: this.toolModal,
						scale: 0,
						alpha: 0,
						duration: 300
					});

					const {freeSpinsAmount} = this.scene.result.infoForPlayer;
					if (this.cheatToolState) {
						this.freeSpinsModeValues = [2, 2, 2, 2, 2];
						this.switchTween();
					}
					if (!this.cheatToolState && freeSpinsAmount === 1) {
						this.switchTween();
					}

					resolve("");
				},
				this
			);
		});
	}

	createTrigger() {
		return this.scene.add
			.rectangle(25, 243, 180, 50, 0xfff, 0)
			.setOrigin(0)
			.setInteractive({cursor: "pointer"})
			.on("pointerdown", this.visible, this);
	}

	visible() {
		const {freeSpinsAmount} = this.profairBankHeistModel.gameData;
		if (GameModeUtil.isFreeSpinMode(freeSpinsAmount) && this.tools.y === this.hidePositionTools) return;
		const flip = !this.arrow.flipY;
		const y = flip ? this.showPositionTools : this.hidePositionTools;

		this.arrow.setFlipY(flip);

		this.scene.tweens.add({
			targets: this.tools,
			y,
			duration: 350
		});
	}

	createToolsText() {
		return this.scene.add.text(50, 271, "Tools", textStyles(this.font, 24, 0, "center", "#ffffff"));
	}

	createArrow() {
		return (this.arrow = this.scene.add.sprite(140, 280, "tools", "arrowTools").setOrigin(0));
	}

	createButtonsMode() {
		this.createButtons();
		this.createEventsButtonMode();

		return this.buttonsMode;
	}

	createButtons() {
		const baseButton = this.buttonModeTemplate([12, 10], "BASE MODE", "buttonActive");
		const freeSpinsButton = this.buttonModeTemplate([230, 10], "FREE SPINS MODE", "buttonDisabled");

		this.buttonsMode = [baseButton, freeSpinsButton];
	}

	buttonModeTemplate(position: number[], title: string, visibleButton: string) {
		const alpha = visibleButton === "buttonActive" ? 1 : 0.01;
		const flip = visibleButton === "buttonActive" ? false : true;
		const [x, y] = position;

		const button = this.scene.add
			.sprite(0, 0, "tools", "buttonActive")
			.setOrigin(0)
			.setInteractive({cursor: "pointer"})
			.setAlpha(alpha)
			.setFlipX(flip);
		const titleText = this.scene.add.text(
			0,
			14,
			title,
			textStyles(this.font, 22, button.displayWidth, "center", "#ffffff")
		);

		return this.scene.add.container(x, y, [button, titleText]);
	}

	createEventsButtonMode() {
		this.buttonsMode.forEach((buttonContainer: Phaser.GameObjects.Container) =>
			buttonContainer.list[0].on(
				"pointerdown",
				() => {
					this.switchStateButtonMode(buttonContainer);
					this.setNumberSwitchMode();
				},
				this
			)
		);
	}

	switchStateButtonMode(buttonContainer: Phaser.GameObjects.Container) {
		if (buttonContainer.list[0].alpha === 1) return;

		this.buttonsMode.forEach((buttonContainer: Phaser.GameObjects.Container) =>
			buttonContainer.list[0].setAlpha(0.01)
		);
		buttonContainer.list[0].setAlpha(1);

		this.isFreeSpins = !this.isFreeSpins;
	}

	createSymbolPosition() {
		const text = this.scene.add
			.text(0, 83, "SYMBOL POSITION IN THE REEL", textStyles(this.font, 24, 456, "center", "#ffffff"))
			.setStroke("#000000", 10);
		this.allElementsInputs = [];
		const allElements: any = [text];
		let x = 25;

		for (let i = 0; i < 5; i++) {
			const bgInput = this.scene.add.sprite(x, 123, "tools", "rectangleTools").setOrigin(0);
			const input = this.createInput<Tools>(x - 10, 133, i, this);

			allElements.push(bgInput, input);
			this.allElementsInputs.push(input);

			x += 82;
		}

		return allElements;
	}

	createInput<T extends {inputsValue?: number[]}>(x: number, y: number, number: number, context: T) {
		const inputSetting = {
			id: "myNumberInput",
			type: "number",
			fontSize: "30px",
			align: "center"
		};

		const inputNumber = this.scene.add
			.rexInputText(x, y, 10, 10, inputSetting)
			.resize(100, 40)
			.setOrigin(0)
			.setText(this.inputsValue[number])
			.on("textchange", (inputText: Phaser.GameObjects.Text) => {
				const currentMode = this.isFreeSpins
					? this.stripsLengthData.freeSpinsMode
					: this.stripsLengthData.baseMode;
				const inputValue = Number(inputText.text);
				const currentNumber = currentMode[number] - 1;

				if (inputValue > currentNumber || inputValue < 0 || inputText.text === "00") {
					this.error.setVisible(true).setText(`Invalid value. Number range 0-${currentNumber}`);
					return inputNumber.setText(context.inputsValue![number]);
				}

				//save spin mode values
				if (this.isFreeSpins) {
					this.freeSpinsModeValues[number] = +inputText.text;
				} else {
					this.baseModeValues[number] = +inputText.text;
				}

				context.inputsValue![number] = +inputText.text;
				this.error.setVisible(false);
			});

		return inputNumber;
	}

	createRandomText() {
		return this.scene.add
			.text(40, 198, "RANDOM POSITION", textStyles(this.font, 24, 0, "center", "#ffffff"))
			.setStroke("#000000", 10);
	}

	createSwitch() {
		this.bgSwitchOff = this.bgSwitchTemplate(0x939393);
		this.bgSwitchOn = this.bgSwitchTemplate(0xff7dd7);
		this.switchCircle = this.scene.add.circle(18, 17.5, 14, 0xffffff);
		this.triggerSwitch = this.scene.add
			.rectangle(0, 0, 70, 35, 0x000000, 0)
			.setOrigin(0)
			.setInteractive({cursor: "pointer"});

		this.triggerSwitch.on("pointerdown", this.switchTween, this);
		return this.scene.add.container(320, 195, [
			this.bgSwitchOn,
			this.bgSwitchOff,
			this.switchCircle,
			this.triggerSwitch
		]);
	}

	bgSwitchTemplate(color: number) {
		const graphics = this.scene.add.graphics();
		graphics.fillStyle(color, 1).fillRoundedRect(0, 0, 70, 35, 17);

		return graphics;
	}

	switchTween() {
		this.cheatToolState = !this.cheatToolState;
		const alpha = this.cheatToolState ? 1 : 0;
		const x = this.cheatToolState ? 18 : 52;

		this.triggerSwitch.removeInteractive();

		this.scene.tweens.add({
			targets: this.switchCircle,
			x,
			duration: 300,
			onComplete: () => this.triggerSwitch.setInteractive({cursor: "pointer"})
		});

		this.scene.tweens.add({
			targets: this.bgSwitchOff,
			alpha,
			duration: 300
		});
	}

	createDummyOptionsTool() {
		return (this.dummyOptionTool = this.scene.add
			.rectangle(0, 0, this.background.displayWidth, this.background.displayHeight - 50, 0xffffff, 0.0001)
			.setOrigin(0)
			.setInteractive()
			.setVisible(false));
	}

	createStyle() {
		const style = document.createElement("style");
		style.innerHTML = `
        #myNumberInput::-webkit-inner-spin-button, 
        #myNumberInput::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }`;
		document.head.appendChild(style);
	}

	setNumberOnInputs() {
		const numbersData = this.isFreeSpins ? this.freeSpinsModeValues : this.baseModeValues;

		this.allElementsInputs.forEach((input, i) => {
			input.text = numbersData[i];
			this.inputsValue[i] = numbersData[i];
		});
	}

	setNumberSwitchMode() {
		this.inputsValue = this.isFreeSpins ? this.freeSpinsModeValues : this.baseModeValues;
		this.allElementsInputs.forEach((input, i) => {
			input.text = this.inputsValue[i];
		});
	}

	dummyOptionToolState() {
		const state = !this.dummyOptionTool.visible;

		this.dummyOptionTool.setVisible(state);
		this.allElementsInputs.forEach((input) => input.setReadOnly(state));
	}

	checkPaytayble() {
		if (this.tools.y === this.showPositionTools) this.visible();
	}
}
