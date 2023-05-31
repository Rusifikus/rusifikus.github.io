import {SceneSize} from "@/constants";
import "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import UIPlugin from "phaser3-rex-plugins/dist/rexuiplugin.min.js";
import GridTablePlugin from "phaser3-rex-plugins/plugins/gridtable-plugin.js";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin.js";
import SliderPlugin from "phaser3-rex-plugins/plugins/slider-plugin.js";

export const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,
	fps: {
    // Defaults:
    	deltaHistory: 10,
    	panicMax: 120,
    	smoothStep: true
  	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: document.querySelector(".wrapper") as HTMLElement,
		width: SceneSize.WIDTH,
		height: SceneSize.HEIGHT
	},
	transparent: true,
	plugins: {
		global: [
			{
				key: "rexInputTextPlugin",
				plugin: InputTextPlugin,
				start: true
			},
			{
				key: "rexGridTablePlugin",
				plugin: GridTablePlugin,
				start: true
			},
			{
				key: "rexSlider",
				plugin: SliderPlugin,
				start: true
			}
		],
		scene: [
			{
				key: "rexUI",
				plugin: UIPlugin,
				mapping: "rexUI"
			},
			{key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine"}
		]
	},
	dom: {
		createContainer: true
	}
};
