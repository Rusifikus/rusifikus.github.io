import {ProfairApiService} from "@/service";
import {ErrorModal} from "@/ui/components";
import {IGameData, IPlayerData, IApiResponse} from "@interfaces";
import {Singleton} from "@profair/core";

@Singleton
export class ProfairBankHeistModel {
	// private readonly profairApiService: ProfairApiService = new ProfairApiService();
	// private _playerData: IPlayerData;
	// private _gameData: IGameData;
	private _scene: Phaser.Scene;

	public setScene(scene: Phaser.Scene) {
		this._scene = scene;
	}

	// /**  @description This @param callback need to avoid this.scene.scene.start("Needed scene").*/
	public async init(callback: Function): Promise<void> {
	// 	let initSlotData!: IApiResponse;

	// 	try {
	// 		initSlotData = await this.profairApiService.init();
	// 	} catch (error) {
	// 		this.showErrorModal();
	// 	}

	// 	this.setInititalData(initSlotData);
	// 	callback();
	}

	// public async playRound(bet: number): Promise<void> {
	// 	let playRoundData!: IApiResponse;

	// 	try {
	// 		playRoundData = await this.profairApiService.playRound(bet);
	// 	} catch (error) {
	// 		this.showErrorModal();
	// 	}

	// 	const {gameData, playerData} = playRoundData;
	// 	this.updateGameData(gameData);
	// 	this.updatePlayerData(playerData);
	// }

	// public setInititalData({playerData, gameData}: IApiResponse): void {
	// 	this._playerData = playerData;
	// 	this._gameData = gameData;
	// }

	// public updatePlayerData(playerData: IPlayerData): void {
	// 	this._playerData = playerData;
	// }

	// public updateGameData(gameData: IGameData): void {
	// 	this._gameData = gameData;
	// }

	// public get playerData(): IPlayerData {
	// 	return this._playerData;
	// }

	// public get gameData(): IGameData {
	// 	return this._gameData;
	// }

	// private showErrorModal(): void {
	// 	new ErrorModal(this._scene);
	// }
}
