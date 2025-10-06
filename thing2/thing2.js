const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const centerX = canvas.width / 2;
	const projLineY = canvas.height / 2; //projection line across middle

	let x = 50;
	let y = 100;
	let d = 80;
	let dragging = false;

	x = parseFloat(document.getElementById('xInput').value);
	y = parseFloat(document.getElementById('yInput').value);
	d = parseFloat(document.getElementById('dInput').value);

	const camX = centerX;
	const camY = projLineY + d;
	const objX = centerX + x;
	const objY = projLineY - y;
	const projX = centerX + x * d / (d + y);
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


	//drag nonsense
	function getMousePos(evt) {
		const rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	canvas.addEventListener('mousedown', (evt) => {
		const mouse = getMousePos(evt);
		const objX = centerX + x;
		const objY = projLineY - y;
		const dist_obj = Math.hypot(mouse.x - objX, mouse.y - objY);
		if (dist_obj < 10) {
			dragging = true;
		}
	});

	canvas.addEventListener('mouseup', () => dragging = false);
	canvas.addEventListener('mouseleave', () => dragging = false);

	canvas.addEventListener('mousemove', (evt) => {
		if (!dragging) return;
		const mouse = getMousePos(evt);
		x = mouse.x - centerX;
		y = projLineY - mouse.y;
		document.getElementById('xInput').value = x.toFixed(1);
		document.getElementById('yInput').value = y.toFixed(1);
		draw();
	});

}

draw();
