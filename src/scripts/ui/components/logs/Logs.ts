import {closeButton} from "./CloseButton";
import {DownloadLogsButton} from "./DownloadLogsButton";
import {LogsButton} from "./LogsButton";
import {LogsList} from "./LogsList";
import {MoreButton} from "./MoreButton";

export class Logs {
	public logsButton: LogsButton;
	public closeButton: closeButton;
	public logsList: LogsList;
	public downloadLogsButton: DownloadLogsButton;
	public moreButton: MoreButton;

	constructor(private scene: Phaser.Scene) {
		this.create();
	}

	async create() {
		await this.getLogs();

		this.logsButton = new LogsButton(this.scene);
		this.closeButton = new closeButton(this.scene);
		this.logsList = new LogsList(this.scene);
		this.downloadLogsButton = new DownloadLogsButton(this.scene);
		this.moreButton = new MoreButton(this.scene);
	}

	async getLogs() {
		if (LOGS) this.scene.allLogs = await this.scene.api.getLogData();
	}
}
