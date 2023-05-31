import {Assets, SceneSize} from "@/constants";
import {EAlign, EColors, EFonts, ETitles} from "@/enum";
import {textStyles} from "@/utils";
import {
	IBalanceContainerCreationConfig,
	IBetContainerCreationConfig,
	IBetTableCreationConfig,
	IButtonCreationConfig,
	IPayoutContainerCreationConfig,
	NumberToCurrencyUtil
} from "@profair/core";

export const FULL_SCREEN_BUTTON: IButtonCreationConfig = {
	x: 200,
	y: 997,
	creationData: {
		frame: "fullScreen"
	}
};

export const MAX_BET_BUTTON: IButtonCreationConfig = {
	x: 740,
	y: 980,
	creationData: {
		frame: "maxBet"
	}
};

export const BET_BUTTON: IButtonCreationConfig = {
	x: 612,
	y: 980,
	creationData: {
		frame: "bet"
	}
};

export const BET_CONTAINER: IBetContainerCreationConfig = {
	x: 385,
	y: 993,
	creationData: {
		betContainerValueTextConfig: {
			x: 0,
			y: 0,
			style: textStyles(EFonts.ROBOTO_CONDENSED, 31, 210, EAlign.CENTER, EColors.WHITE),
			text: NumberToCurrencyUtil.get(0)
		},
		betContainerDescriptionTextConfig: {
			x: 0,
			y: 40,
			style: textStyles(EFonts.ROBOTO, 25, 210, EAlign.CENTER, EColors.WHITE),
			text: ETitles.BET
		}
	}
};

export const BALANCE_CONTAINER: IBalanceContainerCreationConfig = {
	x: 1220,
	y: 993,
	creationData: {
		balanceContainerValueTextConfig: {
			x: 0,
			y: 0,
			style: textStyles("Roboto Condensed, sans-serif", 31, 230, "center", "#ffffff"),
			text: NumberToCurrencyUtil.get(0)
		},
		balanceContainerDescriptionTextConfig: {
			x: 0,
			y: 40,
			style: textStyles("Roboto, sans-serif", 25, 230, "center", "#ffffff"),
			text: "BALANCE"
		}
	}
};

export const AUTO_SPIN_BUTTON: IButtonCreationConfig = {
	x: 1086,
	y: 980,
	creationData: {
		frame: "autoSpin"
	}
};

export const PAYOUT_CONTAINER: IPayoutContainerCreationConfig = {
	x: 1420,
	y: 990,
	creationData: {
		payoutContainerValueTextConfig: {
			x: 0,
			y: 0,
			style: textStyles("Roboto Condensed, sans-serif", 36, 300, "center", "#99f9ff"),
			text: NumberToCurrencyUtil.get(0)
		},
		payoutContainerDescriptionTextConfig: {
			x: 0,
			y: 40,
			style: textStyles("Roboto, sans-serif", 28, 300, "center", "#99f9ff"),
			text: "WIN"
		}
	}
};

export const BET_TABLE: IBetTableCreationConfig = {
	creationData: {
		titleTextConfig: {
			x: 960,
			y: 255,
			text: "PLACE YOUR BET",
			style: {
				fontFamily: "Roboto Condensed, sans-serif",
				fontSize: "54px",
				fontStyle: "italic",
				color: "#969696"
			}
		},
		backgroundImageConfig: {
			x: 960,
			y: 540,
			creationData: {
				texture: Assets.images.BETS_MODAL
			}
		},
		closeButtonConfig: {
			x: 1450,
			y: 230,
			creationData: {
				texture: Assets.images.BET_CLOSE
			}
		},
		betValueTextConfig: {
			x: 0,
			y: 0,
			text: "", // Dynamic
			style: {
				fontFamily: "Roboto Condensed, sans-serif",
				fontSize: "36px",
				fontStyle: "italic",
				align: "left",
				color: "#969696"
			},
			// Non highlighted styles
			shadow: {
				x: 0,
				y: 3,
				creationData: {
					color: "#30085f",
					blur: 8
				}
			},
			color: "#969696",
			stroke: {
				color: "#ffffff",
				thickness: 0
			},
			// Highlighted styles
			highlight: {
				shadow: {
					x: 0,
					y: 0,
					creationData: {
						color: "#ffffff",
						blur: 12
					}
				},
				color: "#969696",
				stroke: {
					color: "#ffffff",
					thickness: 4
				}
			}
		},
		lineDividerConfig: {
			x: 0,
			y: 42,
			fillColor: 0x52859c,
			height: 3,
			width: 124
		},
		betDescriptionTextConfig: {
			x: 0,
			y: 45,
			text: "", // Dynamic
			style: {
				fontFamily: "Roboto Condensed, sans-serif",
				fontStyle: "italic",
				fontSize: "26px",
				fixedWidth: 124,
				align: "right",
				color: "#5A93A9"
			}
		},
		betHoverConfig: {
			creationData: {
				texture: Assets.images.BET_HOVER_EFFECT
			}
		},
		darkOverlayConfig: {
			creationData: {
				width: SceneSize.WIDTH,
				height: SceneSize.HEIGHT
			}
		}
	}
};
