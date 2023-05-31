import Paginators from "./Paginators";

export class Info extends Paginators {
	public paytableBg: string;
	public numberPage: number;
	public rulesPage: any;
	public rulesPositionX: any;
	public rulesPositionY: any;
	public pageX: number;
	public paytableTitle: any;

	constructor(public scene: Phaser.Scene) {
		super(scene);
		this.scene = scene;
		this.paytableBg = "inactive";

		this.createPaytable();
		this.createPaginator();
		this.scene.info.on("pointerdown", this.onPaytable, this);
		this.activetePaginators();
		this.activeteArrow();
	}

	onPaytable() {
		if (this.scene.info.state === "inactive") {
			if (this.scene.info.paytableBg === "active") {
				this.removePaytable();
			}
			return;
		}
		this.numberPage = 1;
		this.getActiveButtons();
		this.showDisabledButtons();
		this.setPaytable();
		this.openPaytayble();
		this.playSound();
		/**
		 * @deprecated
		 * @description
		 * Need to rework cheat tool
		 */
		// if (CHEAT_TOOL) this.scene.toolsCore.checkPaytayble();
	}

	openPaytayble() {
		this.setPaginatorState(0);
		this.paytableScreenCounter = 1;
		this.changeBackgroundTexture("paytableBg");
		this.showFirstPage();
		this.setTextTitle();
	}

	showFirstPage() {
		this.rulesPage.scrollToTop();
		this.rulesPage.setAlpha(0).setVisible(true);
		this.rulesPage.left = this.rulesPositionX;
		this.rulesPage.top = this.rulesPositionY;

		this.scene.tweens.add({
			targets: this.rulesPage,
			alpha: 1,
			duration: 400
		});
	}

	onArrow(button = "") {
		this.playSound();

		switch (this.paytableScreenCounter) {
			case 1:
				return button === "left" ? this.removePaytable() : this.sliderForArrow(1);
			case this.pages.length:
				return button === "left" ? this.sliderForArrow(-1) : this.removePaytable();
			default:
				return button === "left" ? this.sliderForArrow(-1) : this.sliderForArrow(1);
		}
	}

	onPaginator(numberPage: number) {
		this.numberPage = numberPage + 1;
		this.slider();
		this.playSound();
	}

	sliderForArrow(num: number) {
		this.numberPage += num;
		this.slider();
	}

	slider() {
		if (this.paytableScreenCounter === this.numberPage) return;
		this.setTextTitle();
		this.disabledArrows();
		this.disabledPaginator();
		this.nextSlide();
		this.setPaginatorState(this.numberPage - 1);
		this.paytableScreenCounter = this.numberPage;
	}

	nextSlide() {
		const currentPage = this.pages[this.paytableScreenCounter - 1];
		const nextPage = this.pages[this.numberPage - 1];
		const currentPageX = this.paytableScreenCounter < this.numberPage ? -1000 : 1600;
		const nextPageX = this.paytableScreenCounter < this.numberPage ? 1600 : -1000;

		nextPage.setPosition(nextPageX, nextPage.y).setVisible(true);

		this.scene.tweens.add({
			targets: currentPage,
			x: currentPageX,
			duration: 400,
			onComplete: () => currentPage.setVisible(false)
		});

		this.scene.tweens.add({
			targets: nextPage,
			x: this.numberPage === 1 ? this.pageX + 640 : this.pageX,
			duration: 400,
			onComplete: () => {
				this.activetePaginators();
				this.activeteArrow();
			}
		});
	}

	activetePaginators() {
		this.paginators.forEach((paginator: Phaser.GameObjects.Arc, numberPage: number) =>
			paginator.on("pointerdown", () => this.onPaginator(numberPage), this)
		);
	}

	activeteArrow() {
		this.scene.arrowLeft.on("pointerdown", () => this.onArrow("left"), this);
		this.scene.arrowRight.on("pointerdown", () => this.onArrow(), this);
	}

	setTextTitle() {
		switch (this.numberPage - 1) {
			case 0:
				return this.setTitle(`GAME RULES`);
			case 3:
				return this.setTitle(`PAY LINES`);
			default:
				this.setTitle(`PAY TABLE`);
		}
	}

	setTitle(text: string) {
		this.paytableTitle.setText(text);
	}
}
