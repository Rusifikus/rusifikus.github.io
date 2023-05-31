import { TSymbolStrip } from "@/types";
import {Assets, SceneSize} from "@constants";
import {DEFAULT_GAME_DATA} from "@data";
import {ControlPanelModel, HintModel, ProfairBankHeistModel, SpinnableSymbolsModel} from "@models";
import {CoreEvents, EScenes, SharingDataStore} from "@profair/core";
import {
	AutoSpin,
	Balance,
	DefaultSpin,
	Hover,
	Info,
	Lines,
	Logs,
	Modals,
	Recovery,
	Result,
	Sounds,
	Time
} from "@ui/components";
import {textStyles} from "@utils";

type TInputData = {
	musicState: boolean;
};

export class GameScene extends Phaser.Scene {
	private readonly controlPanelModel: ControlPanelModel = new ControlPanelModel(this);
	private readonly hintModel: HintModel = new HintModel(this);
	private readonly spinnableSymbolsModel = new SpinnableSymbolsModel(this);
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();

	public readonly storeInstance = SharingDataStore.getStoreInstance();

	public lineMainColor: number;
	public lineSecondColor: number;
	public firstCreateSpin: boolean;
	public spinMode: string;
	public stripInterval: number;
	public musicState: any;
	public bg: Phaser.GameObjects.Sprite;
	public dummyBg: Phaser.GameObjects.Sprite;
	public controlPanelBg: Phaser.GameObjects.Sprite;
	public gameLogo: Phaser.GameObjects.Sprite;
	public info: Phaser.GameObjects.Image;
	public soundOff: Phaser.GameObjects.Sprite;
	public soundOn: Phaser.GameObjects.Sprite;
	public defSpin: Phaser.GameObjects.Sprite;
	public disabledSpin: Phaser.GameObjects.Sprite;
	public stopSpin: Phaser.GameObjects.Sprite;
	public arrowRight: Phaser.GameObjects.Image;
	public arrowLeft: Phaser.GameObjects.Image;
	public freeNumText: Phaser.GameObjects.Text;
	public freeSpin: Phaser.GameObjects.Sprite;
	public freeSpinsText: Phaser.GameObjects.Container;
	public allSounds: Phaser.Sound.BaseSound[];
	public bgSound: Phaser.Sound.BaseSound;
	public clickSound: Phaser.Sound.BaseSound;
	public spinSound: Phaser.Sound.BaseSound;
	public stopSound: Phaser.Sound.BaseSound;
	public lineSound: Phaser.Sound.BaseSound;
	public bigWinSound: Phaser.Sound.BaseSound;
	public megaWinSound: Phaser.Sound.BaseSound;
	public smallWinBelowSound: Phaser.Sound.BaseSound;
	public smallWinEqualSound: Phaser.Sound.BaseSound;
	public smallWinAboveSound: Phaser.Sound.BaseSound;
	public spineData: Phaser.GameObjects.Sprite[];
	public spineX: any;
	public spineContainer: Phaser.GameObjects.Container;
	public bigWinAnimation: SpineGameObject;
	public megaWinAnimation: SpineGameObject;
	public freeSpinsAnimation: SpineGameObject;
	public totalWinAnimation: SpineGameObject;
	public noWinAnimation: SpineGameObject;
	public linesCore: Lines;
	public spinCore: DefaultSpin;
	public timeCore: Time;
	public infoCore: Info;
	public balanceCore: Balance;
	public modalsCore: Modals;
	public autoSpinCore: AutoSpin;
	public soundCore: Sounds;
	public resultCore: Result;
	public logs: Logs;

	start: number;
	previousTimeStamp: number;
	done: boolean;

	constructor() {
		super(EScenes.GAME_SCENE);
	}

	init(inputData: TInputData) {
		this.scale.fullscreenTarget = document.querySelector(".wrapper");

		this.lineMainColor = 0xfffe8b;
		this.lineSecondColor = 0x7a3400;
		this.firstCreateSpin = true;
		this.spinMode = "isSpin";
		this.stripInterval = 300;
		this.musicState = inputData.musicState;

		this.profairBankHeistModel.setScene(this);
		this.controlPanelModel.init();
		this.getDataForCreate();
		this.spinnableSymbolsModel.init();
		this.hintModel.init();
	}

	getDataForCreate() {
		// const {currency, balance} = this.profairBankHeistModel.playerData;
		// const {stripsToShow} = this.profairBankHeistModel.gameData;

		// DEFAULT_GAME_DATA.currency = currency ?? DEFAULT_GAME_DATA.currency;
		// DEFAULT_GAME_DATA.defaultStrips = stripsToShow ?? DEFAULT_GAME_DATA.defaultStrips;
		DEFAULT_GAME_DATA.defaultStrips = [
			["A", "A", "A"],
			["A", "A", "A"],
			["A", "A", "A"],
			["A", "A", "A"],
			["A", "A", "A"],
		];
		// DEFAULT_GAME_DATA.defaultStrips[0][2] = "a";
		
		// DEFAULT_GAME_DATA.defaultStrips[0].pop().push("a");

		// must save to store (initial data)
		// this.storeInstance.setData({
		// 	balance: balance ?? DEFAULT_GAME_DATA.balance
		// });
		this.events.emit(CoreEvents.SharingDataStore.BALANCE_CHANGED);
	}

	create() {
		this.createBackground();
		this.createReelSymbols();
		// this.createLogo();
		this.createIcons();
		// this.createArrows();
		// this.createWinPopups();
		// this.createText();
		// this.createSounds();
		// this.createHoverState();
		// this.createCoreElements();
		// const deltaTx = this.textures.createCanvas("delta", 800, 200);
    	// const fpsTx = this.textures.createCanvas("fps", 800, 200);

		// console.log(deltaTx);
		// console.log(fpsTx);
		
	}

	createBackground() {
		this.bg = this.add.sprite(0, 0, "mainBg").setOrigin(0).setDepth(4);
		this.dummyBg = this.add.sprite(286, 181, "dummyMainBg").setOrigin(0);
		this.controlPanelBg = this.add.sprite(0, 970, "controlPanelBg").setOrigin(0).setDepth(20);

		// window.requestAnimationFrame(() => {
		// if (this.bg.x < 1000) {
		// 	this.bg.x += 1;
		// 	console.log("1");
		// }
		// })

		// const test = () => {
		// 	if (this.bg.x < 1000) {
		// 		this.bg.x += 1;
		// 		console.log("1");

		// 		window.requestAnimationFrame(test);
		// 	}
		// }

		// window.requestAnimationFrame(test);
		//  this.start = 0,
		//  this.previousTimeStamp = 0;
		//  this.done = false;

		// window.requestAnimationFrame(this.step);

		// window.cancelAnimationFrame(0);
	}

	// createLogo() {
	// 	this.gameLogo = this.add
	// 		.sprite(SceneSize.WIDTH / 2, 50, "gameLogo")
	// 		.setOrigin(0.5, 0)
	// 		.setDepth(20)
	// 		.setScale(0.8);
	// }

	createIcons() {
		// this.createInfoIcon();
		// this.createSoundIcons();
		this.createSpinIcons();
	}

	// createInfoIcon() {
	// 	this.info = this.add
	// 		.image(40, 997, "interface", "info")
	// 		.setOrigin(0)
	// 		.setInteractive({cursor: "pointer"})
	// 		.setDepth(20);
	// }

	// createSoundIcons() {
	// 	this.soundOff = this.add
	// 		.sprite(120, 997, "interface", "soundOff")
	// 		.setOrigin(0)
	// 		.setInteractive({cursor: "pointer"})
	// 		.setDepth(21);
	// 	this.soundOn = this.add
	// 		.sprite(120, 997, "interface", "soundOn")
	// 		.setOrigin(0)
	// 		.setInteractive({cursor: "pointer"})
	// 		.setDepth(21)
	// 		.setVisible(false);
	// }

	update() {
		if (this.game.loop.delta < 10) console.log(this.game.loop.delta, this.game.loop.actualFps);
	}

	createSpinIcons() {
		this.defSpin = this.add
			.sprite(870 + 90, 909 + 90, "interface", "spinDefault")
			.setOrigin(0.5)
			.setInteractive({cursor: "pointer"})
			.setDepth(20)
			.setVisible(true);

			console.log(this.spineContainer);
			
		// @ts-ignore
		const all = this.spineContainer.list[0].allSymbolsList;
			console.log(all);

		this.defSpin.on("pointerdown", () => {
			console.log("GO");
			const duration = 80;

			this.tweens.add({
				targets: all.filter((element: any) => element.y === 0),
				y: 250,
				duration,
				loop: -1,
				onComplete: () => {
					console.log(all);
					
					all.forEach((symbol: any) => {
						// if (symbol.name === "a") symbol.setSkinByName("blurred") 
					});
				}
			});

			this.tweens.add({
				targets: all.filter((element: any) => element.y === 250),
				y: 500,
				duration,
				loop: -1,
			});

			this.tweens.add({
				targets: all.filter((element: any) => element.y === 500),
				y: 750,
				duration,
				loop: -1,
				onComplete: () => {
					this.tweens.add({
						targets: all.filter((element: any) => element.y === 750),
						y: -250,
						duration: 1,
					})
				}
			});

			this.tweens.add({
				targets: all.filter((element: any) => element.y === -250),
				y: 0,
				duration,
				loop: -1,
			});
		});


		// this.disabledSpin = this.add.sprite(870, 909, "interface", "spinDisabled").setOrigin(0).setDepth(20);
		// this.stopSpin = this.add
		// 	.sprite(870, 909, "interface", "spinStop")
		// 	.setOrigin(0)
		// 	.setInteractive({cursor: "pointer"})
		// 	.setDepth(20)
		// 	.setVisible(false);
	}


	// createArrows() {
	// 	this.arrowRight = this.add
	// 		.image(1608, 455, "interface", "arrowDefault")
	// 		.setVisible(false)
	// 		.setDepth(20)
	// 		.setOrigin(0)
	// 		.setInteractive({cursor: "pointer"});
	// 	this.arrowLeft = this.add
	// 		.image(170, 455, "interface", "arrowDefault")
	// 		.setVisible(false)
	// 		.setDepth(20)
	// 		.setOrigin(0)
	// 		.setFlipX(true)
	// 		.setInteractive({cursor: "pointer"});
	// }

	// createText() {
	// 	this.createFreeSpinsText();
	// }

	// createFreeSpinsText() {
	// 	this.freeNumText = this.add
	// 		.text(0, 23, "10", textStyles("Open Sans ExtraBold, sans-serif", 50, 137, "center", "#ffffff"))
	// 		.setStroke("#001d20", 2);
	// 	this.freeSpin = this.add.sprite(0, 0, "interface", "freeSpin").setOrigin(0);

	// 	this.freeSpinsText = this.add
	// 		.container(1427, 72, [this.freeSpin, this.freeNumText])
	// 		.setDepth(20)
	// 		.setVisible(false);
	// }

	// createSounds() {
	// 	this.allSounds = [];

	// 	this.bgSound = this.soundTemplate(Assets.sounds.BACKGROUND);
	// 	this.clickSound = this.soundTemplate(Assets.sounds.CLICK);
	// 	this.spinSound = this.soundTemplate(Assets.sounds.SPIN);
	// 	this.stopSound = this.soundTemplate(Assets.sounds.STOP);
	// 	this.lineSound = this.soundTemplate(Assets.sounds.LINE);
	// 	this.bigWinSound = this.soundTemplate(Assets.sounds.BIG_WIN);
	// 	this.megaWinSound = this.soundTemplate(Assets.sounds.MEGA_WIN);
	// 	this.smallWinBelowSound = this.soundTemplate(Assets.sounds.SMALL_WIN_BELOW);
	// 	this.smallWinEqualSound = this.soundTemplate(Assets.sounds.SMALL_WIN_EQUAL);
	// 	this.smallWinAboveSound = this.soundTemplate(Assets.sounds.SMALL_WIN_ABOVE);
	// }

	// soundTemplate(name: string): Phaser.Sound.BaseSound {
	// 	const sound = this.sound.add(name);
	// 	this.allSounds.push(sound);

	// 	return sound;
	// }

	createReelSymbols() {
		this.createSymbols();
	}

	createSymbols() {
		this.spineContainer = this.spinnableSymbolsModel.view;
	}

	// createWinPopups() {
	// 	this.bigWinAnimation = this.popupTemplate(Assets.spinePopups.BIG_WIN);
	// 	this.megaWinAnimation = this.popupTemplate(Assets.spinePopups.MEGA_WIN);
	// 	this.freeSpinsAnimation = this.popupTemplate(Assets.spinePopups.FREE_SPINS);
	// 	this.totalWinAnimation = this.popupTemplate(Assets.spinePopups.TOTAL_WIN);
	// 	this.noWinAnimation = this.popupTemplate(Assets.spinePopups.NO_WIN);
	// }

	// popupTemplate(name: string) {
	// 	const popup = this.add
	// 		.spine(SceneSize.WIDTH / 2, SceneSize.HEIGHT / 2, name)
	// 		.setDepth(10)
	// 		.setAlpha(0);
	// 	popup.name = name;

	// 	return popup;
	// }

	// createCoreElements() {
		// this.linesCore = new Lines(this);
		// this.spinCore = new DefaultSpin(this);
		// this.timeCore = new Time(this);
		// this.infoCore = new Info(this);
		// this.balanceCore = new Balance(this);
		// this.modalsCore = new Modals(this);
		// if (!UK) this.autoSpinCore = new AutoSpin(this);
		// this.soundCore = new Sounds(this);
		// this.resultCore = new Result(this);

		/**
		 * @deprecated
		 * Need to remork cheat tool!
		 * @template
		 * if (CHEAT_TOOL) {
		 *	this.toolsCore = new Tools(this);
		 *	this.toolsCore.create();
		 * }
		 */
		// if (LOGS) this.logs = new Logs(this);
		// new Recovery(this);
	// }

	// createHoverState() {
	// 	new Hover({
	// 		element: this.arrowLeft,
	// 		hoverTexture: "arrowOver",
	// 		defaultTexture: "arrowDefault"
	// 	});
	// 	new Hover({
	// 		element: this.arrowRight,
	// 		hoverTexture: "arrowOver",
	// 		defaultTexture: "arrowDefault"
	// 	});
	// }
}
