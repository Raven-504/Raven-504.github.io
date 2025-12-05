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

points[0] = [100, 100];
points[1] = [-100, 100];
points.push([200, 200]);

connections[0] = [0, 1];
connections.push([0,2]);

function draw() {
	const camX = camCoords[0];
	const camY = camCoords[1];
	
	//line from camera to object to projection
	for (let i = 0; i < points.length; i++) {
		const objX = points[i][0];
		const objY = points[i][1];
		
		const projX = centreX + objX * -camY / (-camY + objY);
		
		ctx.beginPath();
		ctx.moveTo(centreX + camX, centreY - camY);
		ctx.lineTo(centreX + objX, centreY - objY);
		ctx.lineTo(projX, centreY);
		ctx.stroke();
	};
	
	//draw camera
	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(centreX + camX, centreY - camY, 5, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillText(`Camera (${camX},${camY})`, centreX + camX + 10, centreY - camY - 10);
	
	//draw objects
	ctx.fillStyle = "red";
	ctx.strokeStyle = "red";
	
	for (let i = 0; i < points.length; i++) {
		const objX = points[i][0];
		const objY = points[i][1];
		
		ctx.beginPath();	
		ctx.arc(centreX + objX, centreY - objY, 5, 0, Math.PI * 2);
		ctx.fill();
	};
	
	ctx.lineWidth = 10;
	ctx.beginPath();
	for (let i = 0; i < connections.length; i++) {
		const obj1X = points[connections[i][0]][0];
		const obj1Y = points[connections[i][0]][1];
		
		const obj2X = points[connections[i][1]][0];
		const obj2Y = points[connections[i][1]][1];
		
		ctx.moveTo(centreX + obj1X, centreY - obj1Y);
		ctx.lineTo(centreX + obj2X, centreY - obj2Y);
	};
	ctx.stroke();
	
	//draw projected points
	ctx.fillStyle = "green";
	ctx.strokeStyle = "green";
	ctx.lineWidth = 1;
	
	for (let i = 0; i < points.length; i++) {
		const objX = points[i][0];
		const objY = points[i][1];
		
		const projX = centreX + objX * -camY / (-camY + objY);
		
		ctx.beginPath();
		ctx.arc(projX, centreY, 5, 0, Math.PI * 2);
		ctx.fill()
	};
	
	ctx.lineWidth = 10;
	ctx.beginPath();
	for (let i = 0; i < connections.length; i++) {
		const obj1X = points[connections[i][0]][0];
		const obj1Y = points[connections[i][0]][1];
		const proj1X = centreX + obj1X * -camY / (-camY + obj1Y);
		
		const obj2X = points[connections[i][1]][0];
		const obj2Y = points[connections[i][1]][1];
		const proj2X = centreX + obj2X * -camY / (-camY + obj2Y);
			
		ctx.moveTo(proj1X, centreY);
		ctx.lineTo(proj2X, centreY);
	};
	ctx.stroke();
};
draw();
//drag nonsense