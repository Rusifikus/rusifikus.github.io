import "phaser";
import {gameConfig} from "@config";
import {BootScene, PreloaderScene, StartScene, GameScene} from "@ui/scenes";
import {EScenes} from "@profair/core";

export class Game extends Phaser.Game {
	constructor() {
		super(gameConfig);

		this.scene.add(EScenes.BOOT_SCENE, BootScene);
		this.scene.add(EScenes.PRELOADER_SCENE, PreloaderScene);
		this.scene.add(EScenes.START_SCENE, StartScene);
		this.scene.add(EScenes.GAME_SCENE, GameScene);
		this.scene.start(EScenes.BOOT_SCENE);
	}
}
