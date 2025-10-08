const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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


points[0] = [1,0]
points[1] = [2,3]
console.log(points)


function draw() {
	//line from camera to projection

	//line form camera to object

	//draw camera

	//draw objects

	//draw projected points

	//projected line
}

//drag nonsense
