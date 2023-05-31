import {SceneSize} from "@/constants";
import {ProfairBankHeistModel} from "@/models";
import {SharingDataStore} from "@profair/core";
import {textStyles} from "@utils";

export class LogsList {
	public readonly storeInstance = SharingDataStore.getStoreInstance();
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();

	public historyText: Phaser.GameObjects.Text;
	public logCounter: number = 0;
	public quantityToShow: number = 10;
	public listWidth: number = 1800;
	public listHeight: number = 700;
	public fixedWidth: number = 205;
	public logsList: any;

	constructor(private scene: Phaser.Scene) {
		this.create();
	}

	create() {
		this.createList();
		this.createHistoryText();
	}

	createList() {
		this.logsList = this.scene.rexUI.add
			.gridTable({
				x: (SceneSize.WIDTH - this.listWidth) / 2,
				y: (SceneSize.HEIGHT - this.listHeight) / 2,
				width: this.listWidth,
				height: this.listHeight,

				scrollMode: "vertical",

				background: this.scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x001f37, 0.95).setDepth(5),

				table: {
					cellHeight: 50,
					columns: 1,
					reuseCellContainer: true
				},

				slider: {
					track: this.scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x545454).setDepth(5),
					thumb: this.scene.rexUI.add
						.roundRectangle(0, 0, 0, 0, 10, 0xffffff)
						.setDepth(5)
						.setInteractive({cursor: "pointer"})
				},

				mouseWheelScroller: {
					focus: true,
					speed: 0.3
				},

				header: this.createRowItem({
					userId: this.scene.add.text(0, 0, "UserId", this.createTextStyle(24)),
					startTime: this.scene.add.text(0, 0, "Start Time", this.createTextStyle(24)),
					endTime: this.scene.add.text(0, 0, "End Time", this.createTextStyle(24)),
					startBalance: this.scene.add.text(0, 0, "Start Balance", this.createTextStyle(24)),
					gameMode: this.scene.add.text(0, 0, "Game Mode", this.createTextStyle(24)),
					endBalance: this.scene.add.text(0, 0, "End Balance", this.createTextStyle(24)),
					bet: this.scene.add.text(0, 0, "Bet", this.createTextStyle(24)),
					won: this.scene.add.text(0, 0, "Win", this.createTextStyle(24))
				}),

				space: {
					left: 10,
					right: 10,
					top: 100,
					bottom: 70,

					table: 10,
					header: 10,
					footer: 10
				},

				//TODO cell: ?, cellContainer: ?
				createCellContainerCallback: (cell: any, cellContainer: any) => {
					const {width, height, item} = cell;

					if (cellContainer === null) cellContainer = this.createRowItem();

					cellContainer.setMinSize(width, height);
					return this.updateElements(cellContainer, item);
				},
				items: this.createItems()
			})
			.setDepth(5)
			.setOrigin(0)
			.setVisible(false)
			.layout();
	}

	//TODO cellContainer: ?, item: ?
	updateElements(cellContainer: any, item: any) {
		for (const key in item) {
			cellContainer.getElement(key).setText(item[key]);
		}

		return cellContainer;
	}

	createTextStyle(fontSize: number): Phaser.Types.GameObjects.Text.TextStyle {
		return textStyles("Roboto, sans-serif", fontSize, this.fixedWidth, "center", "#ffffff");
	}

	createItems() {
		this.logCounter = this.scene.allLogs.length > 10 ? 10 : this.scene.allLogs.length;
		const data = [];

		for (let i = 0; i < this.logCounter; i++) {
			const logData = this.createLogData(this.scene.allLogs[i]);

			data.push(logData);
		}

		return data;
	}

	checkCreate(config: object, elementKey: string) {
		//TODO which defaultValue we should pass???
		const getValue = Phaser.Utils.Objects.GetValue(config, elementKey);

		return getValue ?? this.scene.add.text(0, 0, "", this.createTextStyle(20)).setDepth(5);
	}

	createRowItem(config?: any) {
		const userId = this.checkCreate(config, "userId");
		const startTime = this.checkCreate(config, "startTime");
		const endTime = this.checkCreate(config, "endTime");
		const gameMode = this.checkCreate(config, "gameMode");
		const startBalance = this.checkCreate(config, "startBalance");
		const endBalance = this.checkCreate(config, "endBalance");
		const bet = this.checkCreate(config, "bet");
		const won = this.checkCreate(config, "won");

		return this.scene.rexUI.add
			.sizer()
			.add(userId, 0, "center", {left: 10}, false, "userId")
			.add(startTime, 0, "center", {right: 16}, false, "startTime")
			.add(endTime, 0, "center", {right: 16}, false, "endTime")
			.add(gameMode, 0, "center", {right: 16}, false, "gameMode")
			.add(startBalance, 0, "center", {right: 16}, false, "startBalance")
			.add(endBalance, 0, "center", {right: 16}, false, "endBalance")
			.add(bet, 0, "center", {right: 16}, false, "bet")
			.add(won, 0, "center", {right: 16}, false, "won");
	}

	addItem() {
		this.logsList.items.unshift(this.generateItem());
		this.logsList.refresh();
	}

	createLogData(data: any) {
		let {userId, startTime, endTime, gameMode, startBalance, endBalance, bet, won} = data;
		startTime = new Date(startTime ?? 0).toLocaleString("en-UK");
		endTime = new Date(endTime ?? 0).toLocaleString("en-UK");

		return {userId, startTime, endTime, gameMode, startBalance, endBalance, bet, won};
	}

	generateItem() {
		const {balance: startBalance} = this.storeInstance.getData();
		const {bet, payout} = this.profairBankHeistModel.gameData;
		const {balance: newBalance} = this.profairBankHeistModel.playerData;

		return {
			userId: this.scene.allLogs[0]?.userID ?? "asd123",
			startTime: new Date().toLocaleString("en-UK"),
			endTime: new Date().toLocaleString("en-UK"),
			startBalance,
			newBalance,
			bet,
			won: payout
		};
	}

	showMore() {
		const amountToShow =
			this.scene.allLogs.length - this.logCounter > this.quantityToShow
				? this.quantityToShow
				: this.scene.allLogs.length - this.logCounter;

		for (let i = 0; i < amountToShow; i++) {
			const indexToShow = this.logCounter + i;
			const data = this.createLogData(this.scene.allLogs[indexToShow]);

			this.logsList.items.push(data);
		}

		this.logsList.refresh();
		this.logCounter += amountToShow;

		if (this.logCounter === this.scene.allLogs.length) {
			this.scene.logs?.moreButton?.hide();
			this.scene.logs?.downloadLogsButton?.setPosition("default");
		}
	}

	createHistoryText() {
		this.historyText = this.scene.add
			.text(0, 200, "Game History", textStyles("Roboto, sans-serif", 60, SceneSize.WIDTH, "center", "#ffffff"))
			.setDepth(5)
			.setVisible(false);
	}

	hide() {
		this.logsList.setVisible(false);
		this.historyText.setVisible(false);
		this.logsList.scrollToTop();
	}

	show() {
		this.logsList.setVisible(true);
		this.historyText.setVisible(true);
	}
}
