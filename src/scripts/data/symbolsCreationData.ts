import {textStyles} from "@/utils";
import {ISymbolContainerConfig} from "@profair/core";

export const SCATTER: ISymbolContainerConfig = {
	x: 345,
	y: 50,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "scatterSymbol"
			}
		},
		symbolTexts: {
			x: -345,
			y: -50,
			creationData: [
				{
					x: 105,
					y: 80,
					text: " 3, 4, 5",
					style: textStyles("Open Sans ExtraBoldItalic, sans-serif", 22, 0, "center", "#99f9ff")
				},
				{
					x: 185,
					y: 80,
					text: "symbols give",
					style: textStyles("Open Sans ExtraBoldItalic, sans-serif", 22, 0, "center", "#ffffff")
				},
				{
					x: 105,
					y: 105,
					text: "Free Spins",
					style: textStyles("Open Sans ExtraBoldItalic, sans-serif", 22, 0, "center", "#99f9ff")
				}
			]
		},
		symbolMultipliers: {
			x: -295,
			y: 40,
			creationData: {
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 105},
					{x: 55, y: 140},
					{x: 55, y: 175}
				],
				textValuePosition: [
					{x: 110, y: 70},
					{x: 110, y: 105},
					{x: 110, y: 140},
					{x: 110, y: 175}
				],
				availableMultipliers: ["50", "10", "5"],
				maxMultiplierValue: 5,
				freeSpins: ["15", "10", "5"],
				freeSpinText: "Free",
				stylesForMultiplier: textStyles("Open Sans ExtraBoldItalic, sans-serif", 30, 0, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles(
					"Open Sans ExtraBoldItalic, sans-serif",
					30,
					200,
					"right",
					"#ffffff"
				)
			}
		}
	}
};
export const WILD: ISymbolContainerConfig = {
	x: 913,
	y: 40,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "wildSymbol"
			}
		},
		symbolMultipliers: {
			x: -245,
			y: 50,
			creationData: {
				availableMultipliers: ["150", "50", "10"],
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 105},
					{x: 55, y: 140},
					{x: 55, y: 175}
				],
				textValuePosition: [
					{x: 115, y: 70},
					{x: 115, y: 105},
					{x: 115, y: 140},
					{x: 115, y: 175}
				],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBoldItalic, sans-serif", 30, 0, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles(
					"Open Sans ExtraBoldItalic, sans-serif",
					30,
					52,
					"right",
					"#ffffff"
				)
			}
		},
		symbolTexts: {
			x: -913,
			y: -41,
			creationData: [
				{
					x: 660,
					y: 80,
					text: "Substitutes any symbol",
					style: textStyles("Open Sans ExtraBoldItalic, sans-serif", 23, 0, "center", "#ffffff")
				},
				{
					x: 660,
					y: 105,
					text: "except",
					style: textStyles("Open Sans ExtraBoldItalic, sans-serif", 23, 0, "center", "#ffffff")
				},
				{
					x: 750,
					y: 105,
					text: "SCATTER",
					style: textStyles("Open Sans ExtraBoldItalic, sans-serif", 23, 0, "center", "#99f9ff")
				}
			]
		}
	}
};
export const ROBBER: ISymbolContainerConfig = {
	x: 140,
	y: 255,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "robberSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["10", "5", "2", "1"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 110},
					{x: 55, y: 150},
					{x: 55, y: 185}
				],
				textValuePosition: [
					{x: 100, y: 70},
					{x: 100, y: 110},
					{x: 100, y: 150},
					{x: 100, y: 185}
				]
			}
		}
	}
};
export const POLICE: ISymbolContainerConfig = {
	x: 670,
	y: 255,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "policeSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["7.5", "3", "1.5", "1"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 75, y: 70},
					{x: 75, y: 110},
					{x: 75, y: 150},
					{x: 75, y: 185}
				],
				textValuePosition: [
					{x: 135, y: 70},
					{x: 135, y: 110},
					{x: 135, y: 150},
					{x: 135, y: 185}
				]
			}
		}
	}
};
export const BANKNOTES: ISymbolContainerConfig = {
	x: 355,
	y: 455,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "banknotesSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["2.5", "1.5", "1", "0.5"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: -380, y: 70},
					{x: -380, y: 110},
					{x: -380, y: 150},
					{x: -380, y: 185}
				],
				textValuePosition: [
					{x: -315, y: 70},
					{x: -315, y: 110},
					{x: -315, y: 150},
					{x: -315, y: 185}
				]
			}
		}
	}
};
export const DYNAMITE: ISymbolContainerConfig = {
	x: 900,
	y: 465,
	creationData: {
		symbolImage: {
			x: -40,
			y: 10,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "dynamiteSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["2", "1", "0.7", "0.3"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: -380, y: 70},
					{x: -380, y: 110},
					{x: -380, y: 150},
					{x: -380, y: 185}
				],
				textValuePosition: [
					{x: -315, y: 70},
					{x: -315, y: 110},
					{x: -315, y: 150},
					{x: -315, y: 185}
				]
			}
		}
	}
};
export const A: ISymbolContainerConfig = {
	x: -10,
	y: 145,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "ASymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["1", "0.7", "0.4"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 110},
					{x: 55, y: 150},
					{x: 55, y: 185}
				],
				textValuePosition: [
					{x: 100, y: 70},
					{x: 100, y: 110},
					{x: 100, y: 150},
					{x: 100, y: 185}
				]
			}
		}
	}
};
export const K: ISymbolContainerConfig = {
	x: 400,
	y: 145,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "KSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["0.7", "0.5", "0.3"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 110},
					{x: 55, y: 150},
					{x: 55, y: 185}
				],
				textValuePosition: [
					{x: 100, y: 70},
					{x: 100, y: 110},
					{x: 100, y: 150},
					{x: 100, y: 185}
				]
			}
		}
	}
};
export const Q: ISymbolContainerConfig = {
	x: 840,
	y: 145,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "QSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["0.7", "0.5", "0.3"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 110},
					{x: 55, y: 150},
					{x: 55, y: 185}
				],
				textValuePosition: [
					{x: 100, y: 70},
					{x: 100, y: 110},
					{x: 100, y: 150},
					{x: 100, y: 185}
				]
			}
		}
	}
};
export const J: ISymbolContainerConfig = {
	x: 170,
	y: 415,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "JSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["0.6", "0.4", "0.2"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 110},
					{x: 55, y: 150},
					{x: 55, y: 185}
				],
				textValuePosition: [
					{x: 100, y: 70},
					{x: 100, y: 110},
					{x: 100, y: 150},
					{x: 100, y: 185}
				]
			}
		}
	}
};
export const TEN: ISymbolContainerConfig = {
	x: 665,
	y: 415,
	creationData: {
		symbolImage: {
			x: 0,
			y: 0,
			creationData: {
				x: 0,
				y: 0,
				symbolTextureName: "symbols",
				frame: "TenSymbol"
			}
		},
		symbolMultipliers: {
			x: 200,
			y: 0,
			creationData: {
				availableMultipliers: ["0.6", "0.4", "0.2"],
				maxMultiplierValue: 5,
				stylesForMultiplier: textStyles("Open Sans ExtraBold, sans-serif", 30, 50, "center", "#99f9ff"),
				stylesForMultiplierValue: textStyles("Open Sans ExtraBold, sans-serif", 30, 52, "right", "#ffffff"),
				textXPositions: [
					{x: 55, y: 70},
					{x: 55, y: 110},
					{x: 55, y: 150},
					{x: 55, y: 185}
				],
				textValuePosition: [
					{x: 100, y: 70},
					{x: 100, y: 110},
					{x: 100, y: 150},
					{x: 100, y: 185}
				]
			}
		}
	}
};
