import {Singleton} from "@profair/core";

@Singleton
export class FreeSpinsFinalPopupModel {
	private _shouldDisplay: boolean = false;

	public get shouldDisplay(): boolean {
		return this._shouldDisplay;
	}

	public set shouldDisplay(value: boolean) {
		this._shouldDisplay = value;
	}
}
