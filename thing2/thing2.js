const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function project(x, y, d) {
	return x * d / (d + y);
}

function draw() {
	const x = parseFloat(document.getElementById('xInput').value);
	const y = parseFloat(document.getElementById('yInput').value);
	const d = parseFloat(document.getElementById('dInput').value);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const centerX = canvas.width / 2;
	const projLineY = canvas.height / 2; //projection line across middle

	const camX = centerX;
	const camY = projLineY + d;
	const objX = centerX + x;
	const objY = projLineY - y;
	const projX = centerX + project(x, y, d);
	const projY = projLineY;

	//Draw projection line (x-axis)
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.moveTo(0, projLineY);
	ctx.lineTo(canvas.width, projLineY);
	ctx.stroke();
	ctx.fillText("Projection line (origin at center)", 10, projLineY - 5);

	//Line from camera to object
	ctx.strokeStyle = "gray";
	ctx.beginPath();
	ctx.moveTo(camX, camY);
	ctx.lineTo(objX, objY);
	ctx.stroke();

	//Line from camera to projection
	ctx.beginPath();
	ctx.moveTo(camX, camY);
	ctx.lineTo(projX, projY);
	ctx.stroke();

	//Right-angle triangle
	ctx.strokeStyle = "purple";
	ctx.beginPath();
	ctx.moveTo(objX, objY);
	ctx.lineTo(centerX, objY);
	ctx.lineTo(centerX, camY);
	ctx.stroke();

	//Right angle marker
	ctx.beginPath();
	ctx.moveTo(centerX + 6 * Math.sign(x), objY);
	ctx.lineTo(centerX + 6 * Math.sign(x), objY + 6 * Math.sign(y + d));
	ctx.lineTo(centerX, objY + 6 * Math.sign(y + d));
	ctx.stroke();

	//Camera
	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(camX, camY, 5, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillText(`Camera (0,${-d})`, camX + 10, camY);

	//Object
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(objX, objY, 5, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillText(`Object (${x},${y})`, objX + 10, objY);

	//Projection
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.arc(projX, projY, 5, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillText(`Projection (${(projX - centerX).toFixed(1)},0)`, projX + 10, projY - 5);
}

draw();
