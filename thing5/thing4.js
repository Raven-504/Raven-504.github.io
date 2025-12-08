const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

//const angle = 0.65//link this to an input from the html
let angle = parseFloat(document.getElementById('angle').value);

function getCoords(x) {
	
	//0----+----1        0------+--1
	//|    |    |        |     /   |
	//|    |    |    <   |    |    |
	//|    |    |        |   /     |
	//1----+----1,1      1--+------1,1
	
	const scale = 1 / numColours;
	//create vertical equal sized vertical lines and then offset them to the right by offset on the top
	//and to the left by offset on the bottom
	const offset = scale * angle;
	
	//calculate scaled lines to fit square then shift lines by offset
	//A---B
	//|   |
	//D---C
	//[A, B, C, D]
	const shiftLines = [];
	for (let i = 0; i < numColours; i++) {
		shiftLines.push([
			i * scale + offset,//        A
			(i + 1) * scale + offset,//  B
			(i + 1) * scale - offset,//  C
			i * scale - offset,//        D
		]);
	};
		
	//fix coords to square
	shiftLines[0][0] = 0;
	shiftLines[0][3] = 0;
	shiftLines.at(-1)[1] = 1;
	shiftLines.at(-1)[2] = 1;
	
	return shiftLines[x];
};

function getMix32Colour(x) {
	//generates a random but consistent hsl value
	x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
	x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
	x = x ^ (x >>> 16);
	x = x >>> 0;
	return `hsl(${x % 360} 50% 50%)`;
};

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	numColours = parseFloat(document.getElementById('numColours').value);
	for (let i = 0; i < numColours; i++) {
		const coords = getCoords(i);
		ctx.strokeStyle = getMix32Colour(i);
		ctx.fillStyle = getMix32Colour(i);
		ctx.beginPath();
		ctx.moveTo(width * coords[0], 0);
		ctx.lineTo(width * coords[1], 0);
		ctx.lineTo(width * coords[2], height);
		ctx.lineTo(width * coords[3], height);
		
		ctx.lineTo(width * coords[0], 0);
		ctx.fill();
	};
};
draw();

document.getElementById("numColours").addEventListener("input", function() {
	if (this.value > 0) {
		draw();
	};
});
document.getElementById('angle').addEventListener("input", function() {
	if (this.value < 0) {
		document.getElementById('angle').value = 0;
	} else if (this.value > 1) {
		document.getElementById('angle').value = 1;
	} else {
		angle = document.getElementById('angle').value
	};
	if (this.value !== "") {
		draw();
	};
});
