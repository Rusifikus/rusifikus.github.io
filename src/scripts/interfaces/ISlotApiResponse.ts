import {IGameData} from "./IGameData";
import {IPlayerData} from "./IPlayerData";

export interface IApiResponse {
	playerData: IPlayerData;
	gameData: IGameData;
}
