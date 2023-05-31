import {ProfairBankHeistModel, SymbolsModel} from "@models";
import {SymbolContainer} from "@profair/core";
import {AppStates} from "@ui/components";
import {textStyles} from "@utils";

export default class PaytablePage extends AppStates {
	private readonly symbolModel: SymbolsModel = new SymbolsModel();
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();

	private rules: string;

	public pageX: number;
	public pageY: number;
	public rulesPositionX: any;
	public rulesPositionY: any;
	public pages: any[];
	public dummyPaytableWidth: any;
	public closeButton: Phaser.GameObjects.Container;
	public dummyPaytableBg: Phaser.GameObjects.Sprite;
	public dummyPaytable: Phaser.GameObjects.Sprite;
	public paytableTitle: Phaser.GameObjects.Text;
	public rulesPage: any;
	public isIOS: boolean;
	public inactive: any;
	public active: any;

	constructor(public scene: Phaser.Scene) {
		super(scene);
		const {rules} = this.profairBankHeistModel.gameData;

		this.pageX = 335;
		this.pageY = 135;
		this.rulesPositionX = this.pageX + 50;
		this.rulesPositionY = this.pageY + 70;
		this.rules = rules;
	}

	createPaytable() {
		this.createDummyPaytable();
		this.createPaytableTitle();
		this.createCloseButton();

		this.pages = [
			this.createRulesPage(),
			this.createFirstPaytable(),
			this.createSecondPaytable(),
			this.createThirdPaytable()
		];
	}

	createCloseButton() {
		const x = this.pageX + this.dummyPaytableWidth - 28;
		const y = this.pageY + 25;
		const close = this.scene.add.rectangle(x, y, 25, 25, 0x000000, 0).setInteractive({cursor: "pointer"});
		const left = this.scene.add.rectangle(x, y, 25, 4, this.active).setAngle(45);
		const right = this.scene.add.rectangle(x, y, 25, 4, this.active).setAngle(-45);
		this.closeButton = this.scene.add.container(0, 0, [close, left, right]).setDepth(1).setVisible(false);

		close.on("pointerover", () => this.tweenCloneButton([left, right], 1.5));
		close.on("pointerout", () => this.tweenCloneButton([left, right], 1));
		//TODO It's running in Info context.
		close.on("pointerdown", () => this.removePaytable());
	}

	tweenCloneButton(targets: Phaser.GameObjects.Rectangle[], scale: number) {
		this.scene.tweens.add({
			targets,
			scale,
			duration: 100
		});
	}

	createDummyPaytable() {
		this.dummyPaytableBg = this.scene.add.sprite(327, 126, "dummyPaytableBg").setOrigin(0).setVisible(false);
		this.dummyPaytable = this.scene.add
			.sprite(315, 114, "dummyPaytable")
			.setOrigin(0)
			.setDepth(1)
			.setVisible(false);

		this.dummyPaytableWidth = this.dummyPaytable.displayWidth - 40;
	}

	createPaytableTitle() {
		this.paytableTitle = this.scene.add
			.text(
				this.pageX,
				this.pageY + 20,
				`GAME RULES`,
				textStyles("Open Sans ExtraBold, sans-serif", 29, this.dummyPaytableWidth, "center", "#dcffff")
			)
			.setOrigin(0)
			.setDepth(20)
			.setVisible(false);
	}

	createRulesPage() {
		const content =
			(this.rules ?? "") +
			`\n\n[size=36]Version Number: ${VERSION}[/size]\n\n[size=36]CheckSum: ${COMMITHASH}[/size]\n\n`;

		this.rulesPage = this.scene.rexUI.add
			.textArea({
				x: this.rulesPositionX,
				y: this.rulesPositionY,
				width: 1180,
				height: 615,

				text: this.scene.rexUI.add
					.BBCodeText(0, 0, "", textStyles("Verdana, sans-serif", 24, 0, "", "#dcffff")) // eslint-disable-line new-cap
					.setDepth(80),

				slider: {
					track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, this.inactive),
					thumb: this.scene.rexUI.add
						.roundRectangle(0, 0, 0, 60, 5, this.active)
						.setInteractive({cursor: "pointer"})
				}
			})
			.layout()
			.setDepth(1)
			.setVisible(false)
			.setText(content);

		this.scene.input.on(
			"wheel",
			function (pointer: Phaser.Input.Pointer, gameObjects: Array<any>, deltaX: number, deltaY: number) {
				if (!rulesPage.visible) return;

				const scroll = deltaY < 0 ? -0.1 : 0.1;

				rulesPage.t += scroll;
				if (rulesPage.t < 0) rulesPage.t = 0;
				if (rulesPage.t > 1) rulesPage.t = 1;
			}
		);

		const rulesPage = this.rulesPage;
		const text = this.rulesPage.getElement("text").setInteractive();

		let currentY: number;
		text.on("pointerdown", () => (currentY = this.scene.input.y));

		text.on("pointermove", () => {
			const speed = this.isIOS === true ? 0.05 : 0.1;

			if (this.scene.input.activePointer.isDown) {
				if (this.scene.input.y < currentY) rulesPage.t += speed;
				if (this.scene.input.y > currentY) rulesPage.t -= speed;

				if (rulesPage.t < 0) {
					rulesPage.t = 0;
					currentY = this.scene.input.y;
				}
				if (rulesPage.t > 1) {
					rulesPage.t = 1;
					currentY = this.scene.input.y;
				}
			}
		});

		this.assignMaskTo(this.rulesPage);

		return this.rulesPage;
	}

	createFirstPaytable() {
		const firstPageSymbols = this.createSymbolFirstPage();
		const symbols = [firstPageSymbols];

		const firstPayTableContainer = this.scene.add
			.container(this.pageX, this.pageY, symbols)
			.setDepth(1)
			.setVisible(false);

		this.assignMaskTo(firstPayTableContainer);

		return firstPayTableContainer;
	}

	createSymbolFirstPage() {
		const scatter = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.scatter);
		const wild = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.wild);
		const robber = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.robber);
		const police = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.police);
		const banknotes = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.banknotes);
		const dynamite = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.dynamite);

		return this.scene.add.container(0, 0, [scatter, wild, robber, police, banknotes, dynamite]);
	}
	createSecondPaytable() {
		const aSymbol = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.a);
		const kSymbol = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.k);
		const qSymbol = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.q);
		const jSymbol = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.j);
		const tenSymbol = new SymbolContainer(this.scene, this.symbolModel.symbolsCreationData.ten);

		const symbols: Phaser.GameObjects.Container[] = [aSymbol, kSymbol, qSymbol, jSymbol, tenSymbol];

		const secondPayTableContainer = this.scene.add
			.container(this.pageX, this.pageY, symbols)
			.setDepth(1)
			.setVisible(false);

		this.assignMaskTo(secondPayTableContainer);

		return secondPayTableContainer;
	}

	assignMaskTo(container: Phaser.GameObjects.Container) {
		const graphicGeometry = this.scene.add.graphics().fillRect(350, 150, 1220, 700).setVisible(false);
		// TODO: don't find a way how to add mask to scene
		const mask = new Phaser.Display.Masks.GeometryMask(this.scene, graphicGeometry);
		container.setMask(mask);
	}

	createThirdPaytable() {
		const topText = this.scene.add.text(
			0,
			630,
			`All symbols pay left-to-right except scatter which pays any.`,
			textStyles("Verdana, sans-serif", 27, this.dummyPaytableWidth, "center", "#ffffff")
		);
		const bottomText = this.scene.add.text(
			0,
			660,
			`The betting line only pays the highest coefficient to the player.`,
			textStyles("Verdana, sans-serif", 27, this.dummyPaytableWidth, "center", "#ffffff")
		);
		const lines = this.scene.add.image(20, 85, "payLines").setOrigin(0);

		const thirdPayTableContainer = this.scene.add
			.container(this.pageX, this.pageY, [topText, bottomText, lines])
			.setDepth(1)
			.setVisible(false);

		this.assignMaskTo(thirdPayTableContainer);

		return thirdPayTableContainer;
	}
}
