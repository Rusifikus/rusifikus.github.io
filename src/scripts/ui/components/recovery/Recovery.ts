import {Assets, SceneSize} from "@/constants";
import {ProfairBankHeistModel} from "@/models";
import {GameModeUtil} from "@/utils";
import {HintModel} from "@models";
import {CoreEvents, SharingDataStore} from "@profair/core";
import {textStyles} from "@utils";

export class Recovery {
	private readonly storeInstance = SharingDataStore.getStoreInstance();
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();
	private readonly hintModel = new HintModel(this.scene);

	public recoveryDummy: Phaser.GameObjects.Rectangle;
	public textToContinue: Phaser.GameObjects.Text;
	public pulse: Phaser.Tweens.Tween;

	constructor(private scene: Phaser.Scene) {
		const {isRecovery, freeSpinsAmount} = this.profairBankHeistModel.gameData;

		if (isRecovery) {
			this.recoveryTheBet();

			if (GameModeUtil.isFreeSpinMode(freeSpinsAmount)) {
				this.recoveryFreeSpins();
			}
		}
	}

	recoveryFreeSpins() {
		this.createDummy();
		this.createTextToContinue();
		this.showLeftFreeSpins();
		this.showTextToContinue();
	}

	createDummy() {
		this.recoveryDummy = this.scene.add
			.rectangle(0, 0, SceneSize.WIDTH, SceneSize.HEIGHT, 0x000, 0)
			.setOrigin(0)
			.setDepth(100)
			.setInteractive({cursor: "pointer"});
	}

	createTextToContinue() {
		this.textToContinue = this.scene.add
			.text(
				960,
				740,
				"CLICK TO CONTINUE WITH FREE SPINS",
				textStyles("Roboto Black Italic, sans-serif", 45, SceneSize.WIDTH, "center", "#ffffff")
			)
			.setShadow(-3, 3, "#333333", 2, true, false)
			.setStroke("#de007e", 6)
			.setScale(0)
			.setAlpha(0)
			.setOrigin(0.5)
			.setDepth(100);
	}

	recoveryTheBet() {
		const {bet: recoveryBet} = this.profairBankHeistModel.gameData;
		if (recoveryBet) {
			//TODO: setData should be moved to core
			this.storeInstance.setData({bet: recoveryBet});
			// can be called in sharing store setData method (NOT SURE)
			this.scene.events.emit(CoreEvents.SharingDataStore.BET_CHANGED);
		}
	}

	showLeftFreeSpins() {
		this.scene.resultCore.setAnimationToShow(Assets.spinePopups.FREE_SPINS);
		this.scene.resultCore.playAnimationWinValue("recovery");
		this.scene.resultCore.playPopupAnimation("recovery");
		this.scene.resultCore.playSound(this.scene.bigWinSound);
	}

	showTextToContinue() {
		const {animationToShow} = this.scene.resultCore;
		const stopTime = 1100;
		const showTextClick = stopTime + 200;

		this.scene.time.addEvent({
			delay: stopTime,
			callback: () => animationToShow.clearTrack(0)
		});

		this.scene.time.addEvent({
			delay: showTextClick,
			callback: () => this.showText()
		});
	}

	showText() {
		this.scene.tweens.add({
			targets: this.textToContinue,
			alpha: 1,
			scale: 1,
			duration: 300,
			onComplete: () => {
				this.recoveryDummy.on("pointerdown", this.setEventPointerDown, this);
				this.tweenPulse();
			}
		});
	}

	tweenPulse() {
		const scale = this.textToContinue.scale === 1 ? 0.9 : 1;

		this.pulse = this.scene.tweens.add({
			targets: this.textToContinue,
			scale,
			duration: 800,
			onComplete: () => this.tweenPulse()
		});
	}

	setEventPointerDown() {
		this.hidePopupAndText();
		this.pulse.stop();
		this.hintModel.clearMessage();
		this.scene.spinCore.setInfoButtonState("inactive");
		this.scene.spinCore.disableAllButtons();
		this.scene.spinCore.startFreeSpins();
	}

	hidePopupAndText() {
		const {animationToShow, bgAnim, animationWinValue} = this.scene.resultCore;

		animationWinValue.setAlpha(0).setScale(0);

		[animationToShow, bgAnim].forEach((element) => element.setAlpha(0));
		[this.recoveryDummy, this.textToContinue].forEach((element) => element.setVisible(false));
	}
}
