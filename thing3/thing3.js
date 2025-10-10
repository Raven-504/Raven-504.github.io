const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const camCoords = [0, -100];
const points = [];
const connections = [];

//centre lines
const centreX = canvas.width / 2;
const centreY = canvas.height / 2;

//draw centreY
ctx.strokeStyle = "rgba(0, 0, 0, 0.5";
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.beginPath();
ctx.moveTo(0, centreY);
ctx.lineTo(canvas.width, centreY);
ctx.stroke();
ctx.fillText("Projection line (origin at centre)", 10, centreY - 5);

//draw centreX
ctx.beginPath();
ctx.moveTo(centreX, 0);
ctx.lineTo(centreX, canvas.height);
ctx.stroke();

ctx.strokeStyle = "black";
ctx.fillStyle = "black";

points[0] = [100,100]
points[1] = [-100,100]

function draw() {
	const camX = camCoords[0]
	const camY = camCoords[1]
	
	//line from camera to object to projection
	for (let i = 0; i < points.length; i++) {
		const objX = points[i][0];
		const objY = points[i][1];
		
		const projX = centreX + objX * -camY / (-camY + objY);
		
		ctx.beginPath();
		ctx.moveTo(centreX + camX, centreY - camY);
		ctx.lineTo(centreX + objX, centreY - objY);
		ctx.lineTo(projX, centreY)
		ctx.stroke();
	}
	//draw objects

	//draw projected points
	
	//draw camera
	
	//projected line
}
draw()
//drag nonsense
