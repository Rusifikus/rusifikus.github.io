import {EApiBaseUrls, EHttpRequstUrls} from "@/enum";
import {IResponse, IApiResponse} from "@/interfaces";
import {Singleton, HttpService} from "@profair/core";

@Singleton
export class ProfairApiService {
	private _httpService!: HttpService;
	private _baseUrl: string;

	constructor() {
		this.defineBaseUrl();
		this.createHttpService();
	}

	public async init(): Promise<IApiResponse> {
		const {data} = await this._httpService.post<IResponse<IApiResponse>>(EHttpRequstUrls.INIT);
		return data;
	}

	public async playRound(bet: number): Promise<IApiResponse> {
		const {data} = await this._httpService.post<IResponse<IApiResponse>>(EHttpRequstUrls.PLAY_ROUND, {bet});
		return data;
	}

	public end(): Promise<void> {
		return this._httpService.delete<void>(EHttpRequstUrls.END);
	}

	private defineBaseUrl(): void {
		switch (PRODUCTION) {
			case true:
				this._baseUrl = EApiBaseUrls.PROD;
				break;
			case false:
				this._baseUrl = EApiBaseUrls.DEV;
				break;
		}
	}

	private createHttpService(): void {
		this._httpService = new HttpService({
			config: {baseURL: this._baseUrl},
			useInterceptors: true
		});
	}
}
