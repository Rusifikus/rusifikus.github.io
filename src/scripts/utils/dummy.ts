import {switchCoordinates} from "./helpers";
import {coordinates} from "./coordinates";

export class DummyForLine {
	public dummy: Phaser.GameObjects.Container[] = [];

	constructor(public scene: Phaser.Scene) {
		this.dummy = [];

		this.create();
		this.getDummy();
	}

	getDummy() {
		return this.dummy;
	}

	create() {
		const {c1, c2, c3, c4, c5, r1} = coordinates();
		const positionX = [c1, c2, c3, c4, c5];

		positionX.forEach((x) => {
			const dummy = this.scene.add
				.container(x, r1, [
					this.template(4, this.scene.lineSecondColor),
					this.template(2, this.scene.lineMainColor)
				])
				.setDepth(3)
				.setAlpha(0);

			this.dummy.push(dummy);
		});
	}

	template(radius: number, color: number) {
		const circle = new Phaser.Geom.Circle(0, 0, radius);
		const graphics = this.scene.add.graphics({fillStyle: {color}});
		graphics.fillCircleShape(circle);

		return graphics;
	}
}

export const dummyCoordinates = (data: number[][]) => {
	return switchCoordinates(data);
};
