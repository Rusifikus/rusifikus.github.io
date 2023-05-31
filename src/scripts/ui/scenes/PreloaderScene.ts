import {LoadingScreenModel, ProfairBankHeistModel, SourceModel} from "@models";
import {EScenes} from "@profair/core";

export class PreloaderScene extends Phaser.Scene {
	private readonly profairBankHeistModel: ProfairBankHeistModel = new ProfairBankHeistModel();
	private readonly sourceModel: SourceModel = new SourceModel();
	private readonly loadingScreenModel: LoadingScreenModel = new LoadingScreenModel(this);

	constructor() {
		super(EScenes.PRELOADER_SCENE);
	}

	/** @description Phaser life cycle method */
	public init(): void {
		this.loadingScreenModel.init();
	}

	/** @description Phaser life cycle method */
	public preload(): void {
		this.profairBankHeistModel.setScene(this);
		this.sourceModel.preloadScene(this);
	}

	/** @description Phaser life cycle method */
	public create(): void {
		// this.profairBankHeistModel.init(() => {
			this.scene.start(EScenes.START_SCENE);
		// });
	}
}
