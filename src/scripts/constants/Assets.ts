import {Atlases} from "./Atlases";
import {Images} from "./Images";
import {MultiAtlases} from "./MultiAtlases";
import {PathUrls} from "./PathUrls";
import {Sounds} from "./Sounds";
import {SpinePopups} from "./SpinePopups";
import {SpineSymbols} from "./SpineSymbols";

export class Assets {
	public static readonly images: Images = new Images();
	public static readonly atlases: Atlases = new Atlases();
	public static readonly multiAtlases: MultiAtlases = new MultiAtlases();
	public static readonly sounds: Sounds = new Sounds();
	public static readonly spinePopups: SpinePopups = new SpinePopups();
	public static readonly spineSymbols: SpineSymbols = new SpineSymbols();
	public static readonly pathUrls: PathUrls = new PathUrls();
}
