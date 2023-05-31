import {TCurrency} from "@profair/config";

export interface IPlayerData {
	clientId: string;
	userId: string;
	balance: number;
	currency: TCurrency;
	timeStamp: number;
	callBackUrl: string;
}
