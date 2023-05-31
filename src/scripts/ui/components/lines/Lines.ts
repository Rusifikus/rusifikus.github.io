import {ProfairBankHeistModel, SpinnableSymbolsModel} from "@models";
import {AppStates} from "@ui/components";
import {DummyForLine, dummyCoordinates, lines, soundConfig, textStyles} from "@utils";

export class Lines extends AppStates {
	private readonly spinnableSymbolsModel: SpinnableSymbolsModel = new SpinnableSymbolsModel(this.scene);
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();

	public timeAnimationOneLine: number = 2000;
	public dummyInstance: DummyForLine = new DummyForLine(this.scene);
	public dummy = this.dummyInstance.getDummy();

	public linePath: Phaser.Curves.Path;
	public line: Phaser.GameObjects.Graphics;
	public linesCoordinates: any;
	public dummyCoordinates: any[];
	public form: Phaser.GameObjects.Sprite;
	public formText: Phaser.GameObjects.Text;
	public containerText: Phaser.GameObjects.Container;

	constructor(public scene: Phaser.Scene) {
		super(scene);

		this.createForm();
	}

	createLineTemplate(lineHeight: number, color: number, alpha: number, ...arr: number[]) {
		this.linePath = new Phaser.Curves.Path(arr[0], arr[1]);

		arr.forEach((el, i) => {
			if (el != undefined && (i + 1) % 2 === 0) {
				this.linePath.lineTo(arr[i - 1], arr[i]);
			}
		});

		this.line = this.scene.add.graphics();
		this.line.lineStyle(lineHeight, color, alpha);
		this.linePath.draw(this.line);

		return this.line;
	}

	generateLines() {
		this.getLinesData();
		const {winLines} = this.profairBankHeistModel.gameData;
		for (let i = 0; i < winLines.length; i++) {
			const {check, arr} = this.linesCoordinates[i];
			const currentLine = this.scene.add
				.container(0, 0, [
					this.createLineTemplate(10, this.scene.lineSecondColor, 0.7, ...arr),
					this.createLineTemplate(5, this.scene.lineMainColor, 1, ...arr)
				])
				.setDepth(7)
				.setAlpha(0);

			currentLine.formPosition = check;

			const timeShow = this.timeAnimationOneLine * i;
			setTimeout(() => this.showLines(currentLine, i), timeShow);
		}
	}

	getLinesData() {
		const {winLines} = this.profairBankHeistModel.gameData;
		this.linesCoordinates = lines(winLines);
		this.dummyCoordinates = dummyCoordinates(winLines);
	}

	calculateTimeAnimationLines(quantity: number) {
		return this.timeAnimationOneLine * quantity;
	}

	showLines(line: Phaser.GameObjects.Container, i: number) {
		const {winLines, winSymbolAmounts} = this.profairBankHeistModel.gameData;
		this.dummyCoordinates[i].forEach((y: number, index: number) =>
			this.dummy[index].setPosition(this.dummy[index].x, y)
		);
		setTimeout(() => this.tweenLine([line, ...this.dummy], 1), 100);

		// this.spinnableSymbolsModel.emitLineInformation(winLines[i], winSymbolAmounts[i]);
		// this.spinnableSymbolsModel.emitSymbolsAnimation();
		this.playSound();
		this.setTextForm(line, this.calculateFormLine(i));
	}

	createForm() {
		this.form = this.scene.add.sprite(0, 0, "interface", "form").setOrigin(0, 0.5);
		const width = this.form.displayWidth;

		this.formText = this.scene.add.text(
			0,
			-34,
			`2 5 0`,
			textStyles("Roboto Black Italic, sans-serif", 47, width, "center", "#ffffff")
		);
		this.formText.setStroke("#7a3400", 4);

		this.containerText = this.scene.add.container(0, 0, [this.form, this.formText]).setDepth(10).setAlpha(0);
	}

	setTextForm(line: Phaser.GameObjects.Container, text: string) {
		this.formText.setText(text);
		this.containerText.setPosition(...line.formPosition);
	}

	calculateFormLine(index: number) {
		const {coefficients, bet} = this.profairBankHeistModel.gameData;
		const finishValue = bet * coefficients[index];

		return finishValue.toFixed(2);
	}

	playSound() {
		const soundParameters = soundConfig(false);
		this.scene.lineSound.play(soundParameters);
	}

	tweenLine(targets: any, alpha: number) {
		const duration = 150;

		this.scene.tweens.add({
			targets: [...targets, this.containerText],
			alpha,
			duration,
			onComplete: () => {
				if (alpha === 1)
					setTimeout(() => this.tweenLine(targets, 0), this.timeAnimationOneLine - (duration * 2 + 200));
				if (alpha === 0)
					setTimeout(() => targets[0].destroy(), this.timeAnimationOneLine - (duration * 2 + 200));
			}
		});
	}
}
