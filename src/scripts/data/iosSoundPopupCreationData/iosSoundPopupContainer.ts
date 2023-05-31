import {gameConfig} from "@/config";
import {ICoordinates} from "@profair/core";

export const IOS_POPUP_CONTAINER: ICoordinates = {
	x: Number(gameConfig.scale?.width) / 2,
	y: Number(gameConfig.scale?.height) / 2
};
