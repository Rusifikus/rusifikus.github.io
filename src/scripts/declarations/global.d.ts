/* eslint-disable no-unused-vars */
declare const DEVELOPMENT: boolean;
declare const PRODUCTION: boolean;
declare const CHEAT_TOOL: boolean;
declare const FUN: boolean;
declare const LOGS: boolean;
declare const UK: boolean;
declare const DYNAMIC_TOKEN: boolean;
declare const VERSION: boolean;
declare const COMMITHASH: boolean;
declare const profairGamesParams: ProfairGamesParams;

declare interface ProfairGamesParams {
	API: string;
}

declare interface Window {
	profairGamesParams: ProfairGamesParams;
}

declare interface Window {
	SpinePlugin: any;
}

declare module Phaser {
	/**
	 * Used only for PROG-1964 solved problems after migration to the TS.
	 * In future will be removed because it's a very bad approach to extend base entity which Phaser gives us.
	 * !!! Must be divided into different models !!!
	 */
	interface Scene {
		toolsCore: any;
		rexUI: any;
		infoCore: any;
		allSounds: any;
		soundOff: any;
		soundOn: any;
		musicState: any;
		bgSound: any;
		setMute: any;
		clickSound: any;
		lineSecondColor: any;
		lineMainColor: any;
		logs: any;
		allLogs: any;
		api: any;
		disabledSpin: any;
		defSpin: any;
		stopSpin: any;
		spineData: any;
		arrowLeft: any;
		arrowRight: any;
		info: any;
		resultCore: any;
		balanceCore: any;
		spinCore: any;
		bigWinSound: any;
		modal: any;
		stripInterval: any;
		linesCore: any;
		smallWinAboveSound: any;
		smallWinBelowSound: any;
		smallWinEqualSound: any;
		megaWinSound: any;
		spinSound: any;
		freeSpinsAnimation: any;
		bigWinAnimation: any;
		megaWinAnimation: any;
		totalWinAnimation: any;
		noWinAnimation: any;
		spinMode: any;
		autoSpinCore: any;
		firstCreateSpin: any;
		freeSpinsText: any;
		freeNumText: any;
		stopSound: any;
		lineSound: any;
		bg: any;
		dummyBg: any;
		spineContainer: any;
	}

	namespace GameObjects {
		interface GameObjectFactory {
			rexInputText: any;
		}
		interface GameObject {
			setText: any;
			style: any;
			alpha: number;
			setAlpha(alpha: number): void;
		}

		interface Container {
			formPosition: number[];
		}
	}

	namespace Sound {
		interface NoAudioSoundManager {
			setMute: any;
		}
	}

	interface Game {
		currentScene: Phaser.Scene;
		apiData: any;
		connectApi: string;
	}

	namespace Utils {
		namespace Objects {
			function GetValue(source: object, key: string, defaultValue?: any): any;
		}
	}
	//For here
}

declare module "phaser3-rex-plugins/plugins/dropshadowpipeline-plugin" {
	export default class DropShadowPipelinePlugin extends Phaser.Plugins.BasePlugin {
		add(gameObject: Phaser.GameObjects.GameObject, config: any): any;
		remove(gameObject: Phaser.GameObjects.GameObject): any;
		get(gameObject: Phaser.GameObjects.GameObject): any;
	}
}

declare module "*";
