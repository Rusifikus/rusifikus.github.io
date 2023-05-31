import {Assets} from "@/constants";

export class PathUtil {
	private static readonly sprites: string = "sprites";
	private static readonly spines: string = "spines";

	public static bet(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.BET}/${url}`;
	}

	public static background(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.BACKGROUNDS}/${url}`;
	}

	public static preloadSceneSources(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.PRELOAD_SCENE_SOURCES}/${url}`;
	}

	public static paytable(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.PAYTABLE}/${url}`;
	}

	public static atlases(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.ATLASES}/${url}`;
	}

	public static multiAtlases(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.MULTI_ATLASES}/${url}`;
	}

	public static multiAtlasesPath(): string {
		return `${this.sprites}/${Assets.pathUrls.MULTI_ATLASES}`;
	}

	public static ios(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.IOS}/${url}`;
	}

	public static sounds(urls: Array<string>): Array<string> {
		return urls.map((url) => `${Assets.pathUrls.SOUNDS}/${url}`);
	}

	public static spinePopupsJsonUrl(folderName: string, url: string): string {
		return `${this.spines}/${Assets.pathUrls.POPUPS}/${folderName}/${url}`;
	}

	public static spinePopupsAtlasUrl(folderName: string, urls: Array<string>): Array<string> {
		return urls.map((url) => `${this.spines}/${Assets.pathUrls.POPUPS}/${folderName}/${url}`);
	}

	public static spineSymbolsJsonUrl(folderName: string, url: string): string {
		return `${this.spines}/${Assets.pathUrls.SYMBOLS}/${folderName}/${url}`;
	}

	public static spineSymbolsAtlasUrl(folderName: string, urls: Array<string>): Array<string> {
		return urls.map((url) => `${this.spines}/${Assets.pathUrls.SYMBOLS}/${folderName}/${url}`);
	}

	public static cheatTool(url: string): string {
		return `${this.sprites}/${Assets.pathUrls.CHEAT_TOOL_MODAL}/${url}`;
	}
}
