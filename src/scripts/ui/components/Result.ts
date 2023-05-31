import {Assets, SceneSize} from "@/constants";
import {EAlign, EAnimationData, EColors, EElementNames, EFonts, EModeNames, ETitles} from "@/enum";
import {TFreeSpinsPopupArgs} from "@/types";
import {DEFAULT_GAME_DATA} from "@data";
import {FreeSpinsFinalPopupModel, ProfairBankHeistModel, SpinnableSymbolsModel} from "@models";
import {CoreEvents, ESpinOutComes, NumberToCurrencyUtil, SharingDataStore, TESpines} from "@profair/core";
import {Recovery} from "@ui/components";
import {soundConfig, textStyles} from "@utils";

export class Result {
	private readonly spinnableSymbolsModel: SpinnableSymbolsModel = new SpinnableSymbolsModel(this.scene);
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();
	public readonly storeInstance = SharingDataStore.getStoreInstance();
	private readonly freeSpinsFinalPopupModel: FreeSpinsFinalPopupModel = new FreeSpinsFinalPopupModel();

	public timePopup: number;
	public timeStopSpin: any;
	public bgAnim: Phaser.GameObjects.Rectangle;
	public math: Phaser.GameObjects.Text;
	public animationWinValue: Phaser.GameObjects.Text;
	public time: number;
	public recoveryDummy: Phaser.GameObjects.Rectangle;
	public textToContinue: Phaser.GameObjects.Text;
	public animationToShow: any;
	public pulse: Phaser.Tweens.Tween;
	public pulseAnim: any;

	constructor(private scene: Phaser.Scene) {
		this.timePopup = EAnimationData.POPUP_ANIMATION_TIME;
		this.timeStopSpin =
			DEFAULT_GAME_DATA.spinDuration +
			this.scene.stripInterval * 4 +
			this.scene.spinCore.durationCompressSymbol * 2;

		this.createElements();
		this.createPopupsWinValue();
	}

	createElements() {
		this.bgAnim = this.scene.add
			.rectangle(0, 0, SceneSize.WIDTH, SceneSize.HEIGHT, 0x000000)
			.setOrigin(0)
			.setDepth(8)
			.setAlpha(0);
		this.math = this.scene.add
			.text(950, 610, ``, textStyles(EFonts.ROBOTO_BLACK_ITALIC, 40, 0, EAlign.CENTER, EColors.WHITE))
			.setDepth(20)
			.setOrigin(0.5)
			.setAlpha(0)
			.setScale(0)
			.setStroke(EColors.BLACK_PEARL, 4);
	}

	createPopupsWinValue() {
		this.animationWinValue = this.scene.add
			.text(950, 630, ``, textStyles(EFonts.ROBOTO_BLACK_ITALIC, 100, 0, EAlign.CENTER, EColors.WHITE))
			.setDepth(20)
			.setOrigin(0.5)
			.setAlpha(0)
			.setScale(0);
	}

	showResultSpin() {
		setTimeout(() => {
			const {spinOutcome} = this.profairBankHeistModel.gameData;
			this.getTimeAnimation();
			/**
			 * @deprecated
			 * @description
			 * Need to rework cheat tool
			 */
			// if (CHEAT_TOOL) this.scene.toolsCore.setNumberOnInputs();
			switch (spinOutcome) {
				case ESpinOutComes.LOSE:
					return this.lose();
				case ESpinOutComes.SMALL_WIN:
					return this.smallWin();
				case ESpinOutComes.BIG_WIN:
					return this.bigWin();
				case ESpinOutComes.MEGA_WIN:
					return this.megaWin();
				case ESpinOutComes.FREE_SPINS:
					return this.freeSpins();
			}
		}, this.timeStopSpin);
	}

	getTimeAnimation() {
		const {winLines, scatterCoefficient} = this.profairBankHeistModel.gameData;
		this.time = this.scene.linesCore.timeAnimationOneLine * winLines.length;
		if (scatterCoefficient > 0) {
			this.time += this.scene.linesCore.timeAnimationOneLine;
		}
	}

	lose() {
		this.stopedSpin();
		this.finishPopup(0);
	}

	showSpinOutcome() {
		const {winLines, scatterCoefficient} = this.profairBankHeistModel.gameData;

		this.scene.linesCore.generateLines();

		const time = this.scene.linesCore.timeAnimationOneLine * winLines.length;
		if (scatterCoefficient > 0) {
			setTimeout(() => this.scatterWin(), time);
		}
		this.finishPopup(this.time);
	}

	smallWin() {
		const {bet, payout} = this.profairBankHeistModel.gameData;

		this.stopedSpin();
		this.playSound(
			bet < payout
				? this.scene.smallWinAboveSound
				: bet > payout
				? this.scene.smallWinBelowSound
				: this.scene.smallWinEqualSound
		);
		this.showSpinOutcome();
	}

	bigWin() {
		this.setAnimationToShow(Assets.spinePopups.BIG_WIN);
		this.stopedSpin();
		this.playAnimationWinValue();
		this.playPopupAnimation();
		this.playSound(this.scene.bigWinSound);

		setTimeout(() => this.showSpinOutcome(), this.timePopup);
	}

	megaWin() {
		this.setAnimationToShow(Assets.spinePopups.MEGA_WIN);
		this.stopedSpin();
		this.playAnimationWinValue();
		this.playPopupAnimation();
		this.playSound(this.scene.megaWinSound);

		setTimeout(() => this.showSpinOutcome(), this.timePopup);
	}

	freeSpins() {
		this.animationWinValue.setVisible(true);
		this.setAnimationToShow(Assets.spinePopups.FREE_SPINS);
		this.stopedSpin();
		this.playAnimationWinValue();
		this.playPopupAnimation();
		this.playSound(this.scene.bigWinSound);
		/**
		 * @deprecated
		 * @description
		 * Need to rework cheat tool
		 */
		// if (CHEAT_TOOL && this.scene.toolsCore.cheatToolState) this.scene.toolsCore.switchTween();

		setTimeout(() => this.showSpinOutcome(), this.timePopup);
	}

	showFreeSpinsFinalPopup({assetToShow, isPayoutVisible}: TFreeSpinsPopupArgs) {
		this.setAnimationToShow(assetToShow);
		this.stopedSpin();
		this.playPopupAnimation(EModeNames.RECOVERY);
		this.totalWinValue(isPayoutVisible);
		this.playSound(this.scene.bigWinSound);
		this.createDummy();
		this.createTextToContinue();
		this.showTextToContinue();
		this.tweenPulse();
		this.display();
	}

	totalWinValue(winValueVisibility: boolean) {
		const {freeSpinsTotalWin} = this.profairBankHeistModel.gameData;
		const arrData: [number, number, string, number, string] = [
			SceneSize.WIDTH / 2,
			478,
			EColors.YELLOW,
			85,
			EColors.TORCH_RED
		];
		const [positionX, positionY, colorText, fontSize, colorStroke] = arrData;

		this.animationWinValue
			.setText(freeSpinsTotalWin.toFixed(2))
			.setPosition(positionX, positionY)
			.setColor(colorText)
			.setStroke(colorStroke, 6)
			.setFontSize(fontSize)
			.setVisible(winValueVisibility);

		this.tweenShowPopup(this.animationWinValue, 1, EModeNames.RECOVERY);

		const targets = this.animationWinValue;

		setTimeout(() => {
			this.scene.tweens.add({
				targets,
				alpha: 1,
				scale: 1,
				duration: EAnimationData.WIN_VALUE_ANIMATION_DURATION
			});
		}, 300);
	}

	createDummy() {
		this.recoveryDummy = this.scene.add
			.rectangle(0, 0, SceneSize.WIDTH, SceneSize.HEIGHT, 0x000, 0)
			.setOrigin(0)
			.setDepth(100)
			.setInteractive({cursor: Phaser.Input.Pointer});
	}

	createTextToContinue() {
		this.textToContinue = this.scene.add
			.text(
				960,
				740,
				ETitles.CONTINUE,
				textStyles(EFonts.ROBOTO_BLACK_ITALIC, 45, SceneSize.WIDTH, EAlign.CENTER, EColors.WHITE)
			)
			.setShadow(-3, 3, EColors.NIGHT_RIDER, 2, true, false)
			.setStroke(EColors.MEDIUM_VIOLET_RED, 6)
			.setScale(0)
			.setAlpha(0)
			.setOrigin(0.5)
			.setDepth(100);
	}
	showTextToContinue() {
		const {animationToShow} = this.scene.resultCore;

		this.scene.time.addEvent({
			delay: EAnimationData.STOP_TIME,
			callback: () => animationToShow.clearTrack(0)
		});

		this.scene.time.addEvent({
			delay: EAnimationData.CONTINUE_TEXT_ANIMATION_DELAYING,
			callback: () => this.showText()
		});
	}

	showText() {
		this.scene.tweens.add({
			targets: this.textToContinue,
			alpha: 1,
			scale: 1,
			duration: EAnimationData.SHOW_TEXT_ANIMATION_DURATION,
			onComplete: () => {
				this.recoveryDummy.on(Phaser.Input.Events.POINTER_DOWN, this.hidePopupAndText, this);
				this.tweenPulse();
			}
		});
	}

	hidePopupAndText() {
		const {bgAnim, animationWinValue} = this.scene.resultCore;

		animationWinValue.setAlpha(0).setScale(0);

		[bgAnim].forEach((element) => element.setAlpha(0));
		[this.recoveryDummy, this.textToContinue, this.animationToShow].forEach((element) => element.setVisible(false));
		new Recovery(this.scene);
	}

	display() {
		this.displayPopup();
		this.displayText();
	}

	displayPopup() {
		const {bgAnim, animationWinValue} = this.scene.resultCore;

		animationWinValue.setAlpha(1).setScale(1);

		bgAnim.setAlpha(1);
		[this.recoveryDummy, this.animationToShow].forEach((element) => element.setVisible(true));
	}

	displayText() {
		this.textToContinue.setVisible(true);
	}

	tweenPulse() {
		const scale = this.textToContinue.scale === 1 ? 0.9 : 1;

		this.pulse = this.scene.tweens.add({
			targets: this.textToContinue,
			scale,
			duration: EAnimationData.TWEEN_PULSE_ANIMATION_DURATION,
			onComplete: () => this.tweenPulse()
		});
	}

	stopedSpin() {
		this.stopSound();
		this.updateBalance();
		this.updateWinValue();
	}

	stopSound() {
		this.scene.spinSound.stop();
	}
	setAnimationToShow(name: TESpines): void {
		switch (name) {
			case Assets.spinePopups.FREE_SPINS:
				this.animationToShow = this.scene.freeSpinsAnimation;
				break;
			case Assets.spinePopups.BIG_WIN:
				this.animationToShow = this.scene.bigWinAnimation;
				break;
			case Assets.spinePopups.MEGA_WIN:
				this.animationToShow = this.scene.megaWinAnimation;
				break;
			case Assets.spinePopups.TOTAL_WIN:
				this.animationToShow = this.scene.totalWinAnimation;
				break;
			case Assets.spinePopups.NO_WIN:
				this.animationToShow = this.scene.noWinAnimation;
				break;
			default:
				break;
		}
	}

	updateBalance() {
		const {balance} = this.profairBankHeistModel.playerData;
		/** Setted new balance from api to the store only after animations stopped	*/
		this.storeInstance.setData({balance});
		this.scene.events.emit(CoreEvents.SharingDataStore.BALANCE_CHANGED);
	}

	updateWinValue() {
		const {payout} = this.profairBankHeistModel.gameData;
		this.storeInstance.setData({payout});
		this.scene.events.emit(CoreEvents.SharingDataStore.PAYOUT_CHANGED);
	}

	finishPopup(time: number) {
		setTimeout(() => {
			const {freeSpinsAmount, freeSpinsTotalWin} = this.profairBankHeistModel.gameData;

			this.scene.spinCore.activateInfoButton();
			/**
			 * @deprecated
			 * @description
			 * Need to rework cheat tool
			 */
			// if (CHEAT_TOOL) {
			// 	this.scene.toolsCore.dummyOptionToolState();
			// }
			if (LOGS) {
				this.scene.logs.logsButton.trigger.setInteractive({cursor: Phaser.Input.Pointer});
			}
			if (this.scene.spinMode === EModeNames.IS_SPIN && freeSpinsAmount === 0) {
				this.scene.balanceCore.checkBalanceForBet();
			}
			if (this.scene.spinMode === EModeNames.IS_AUTO_SPIN) {
				this.scene.autoSpinCore.checkBalanceForSpin();
			}

			if (this.freeSpinsFinalPopupModel.shouldDisplay) {
				const isPayoutVisible = freeSpinsTotalWin > 0;
				const assetToShow = isPayoutVisible ? Assets.spinePopups.TOTAL_WIN : Assets.spinePopups.NO_WIN;
				this.showFreeSpinsFinalPopup({assetToShow, isPayoutVisible});
			}

			if (this.scene.spinMode === EModeNames.IS_SPIN) {
				this.scene.spinCore.startFreeSpinsIfExistsOrSetToDefaultState();
			}
		}, time);
	}

	playAnimationWinValue(recovery = EModeNames.NO_RECOVERY) {
		this.updatePopupWinValue();
		this.updatePopupMathValue();
		this.animationPopupWinValue(1, EElementNames.WIN_VALUE, recovery);
		if (this.animationToShow.name != Assets.spinePopups.FREE_SPINS)
			setTimeout(() => this.animationPopupWinValue(1, EElementNames.BET_MATH), 100);
	}

	playPopupAnimation(recovery = EModeNames.NO_RECOVERY) {
		this.animationToShow.play(EModeNames.ANIMATION, false);
		this.tweenShowPopup(this.animationToShow, 1, recovery);
		this.tweenShowPopup(this.bgAnim, 0.6, recovery);
	}

	playSound(sound: Phaser.Sound.WebAudioSound) {
		const soundParameters = soundConfig(false);
		sound.play(soundParameters);
	}

	updatePopupMathValue() {
		const {totalCoefficient} = this.profairBankHeistModel.gameData;
		this.math.setText(`${ETitles.BET_X}  ${totalCoefficient}`);
	}

	updatePopupWinValue() {
		const {payout} = this.storeInstance.getData();
		const {freeSpinsAmount} = this.profairBankHeistModel.gameData;
		const getWinValue =
			this.animationToShow.name === Assets.spinePopups.FREE_SPINS
				? freeSpinsAmount
				: NumberToCurrencyUtil.get(payout);
		const [positionX, positionY, colorText, fontSize, strokeColor] = this.getConfigWinValue();

		this.animationWinValue
			.setText(getWinValue)
			.setPosition(positionX, positionY)
			.setColor(colorText)
			.setFontSize(fontSize)
			.setShadow(-3, 3, EColors.NIGHT_RIDER, 2, true, false)
			.setStroke(strokeColor, 6);
	}

	getConfigWinValue(): any {
		switch (this.animationToShow.name) {
			case Assets.spinePopups.BIG_WIN:
				return [SceneSize.WIDTH / 2, 478, EColors.YELLOW, 85, EColors.TORCH_RED];
			case Assets.spinePopups.MEGA_WIN:
				return [SceneSize.WIDTH / 2, 480, EColors.LASER_LEMON, 90, EColors.VENETIAN_RED];
			case Assets.spinePopups.FREE_SPINS:
				return [SceneSize.WIDTH / 2, 480, EColors.WHITE, 90, EColors.MEDIUM_VIOLET_RED];
		}
	}

	tweenShowPopup(targets: any, alpha: any, recovery: string = EModeNames.NO_RECOVERY) {
		const duration = 200;

		this.scene.tweens.add({
			targets,
			alpha,
			duration,
			onComplete: () => {
				if (alpha > 0 && recovery === EModeNames.NO_RECOVERY) {
					setTimeout(() => this.tweenShowPopup(targets, 0), this.timePopup - (duration + 100));
				}
			}
		});
	}

	animationPopupWinValue(value: number, element: string, recovery = EModeNames.NO_RECOVERY) {
		const targets = element === EElementNames.WIN_VALUE ? this.animationWinValue : this.math;
		const time = element === EElementNames.WIN_VALUE ? this.timePopup - 800 : this.timePopup - 900;
		const timePulse = element === EElementNames.WIN_VALUE ? 400 : 600;
		const pulse = value === 0 ? 0 : 1.3;

		setTimeout(() => {
			this.scene.tweens.add({
				targets,
				alpha: value,
				scale: value,
				duration: 170,
				onComplete: () => {
					setTimeout(() => this.pulseAnimation(pulse, targets), timePulse);
					if (value > 0 && recovery === EModeNames.NO_RECOVERY)
						setTimeout(() => this.animationPopupWinValue(0, element), time);
				}
			});
		}, 300);
	}

	pulseAnimation(scale: number, targets: any) {
		if (scale === 0) this.pulseAnim.stop();

		this.pulseAnim = this.scene.tweens.add({
			targets,
			scale,
			duration: 550,
			onComplete: () => {
				if (scale > 1) return this.pulseAnimation(0.9, targets);
			}
		});
	}

	scatterWin() {
		const {scatterCoefficient} = this.profairBankHeistModel.gameData;
		const calculateWinValue = scatterCoefficient.toFixed(2);
		const pos = {formPosition: [843, 555]};

		this.scene.linesCore.setTextForm(pos, calculateWinValue);

		this.showScatterWinValue(1);
		// this.showWinScatter();
		// this.spinnableSymbolsModel.emitScatterAnimations();
		this.playSound(this.scene.bigWinSound);
		setTimeout(() => this.showScatterWinValue(0), this.scene.linesCore.timeAnimationOneLine);
	}

	showScatterWinValue(alpha: number) {
		this.scene.tweens.add({
			targets: this.scene.linesCore.containerText,
			alpha,
			duration: 200
		});
	}
}
