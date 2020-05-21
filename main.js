var canvas = document.getElementById("hDc");
var hdc = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

//points
var points_data =
[
	{x: 0, y: 0.31640625},
	{x: 1, y: 0.73828125},
	{x: 2, y: 0.94921875},
	{x: 3, y: 0.99609375},
	{x: 4, y: 1},
];

//drawing data
var axisX = height - 64, axisLeft = 32, axisRight = width - axisLeft;
var axisTop = 32, axisBottom = height - axisTop;

var pointLeft = axisLeft + 96, pointRigth = axisRight - 96, pointHeight = axisTop + 64 - axisX, dashSz = 8;
var pointDx = (pointRigth - pointLeft) / (points_data[points_data.length - 1].x - points_data[0].x);
var axisY = pointLeft - pointDx * points_data[0].x;

//plot
function draw()
{
	//font
	hdc.font = "16px Arial";
	hdc.textAlign = "right";
	hdc.textBaseline = "top";
	
	//white bkg
	hdc.fillStyle = "white";
	
	hdc.beginPath();
	hdc.rect(0, 0, width, height);
	hdc.fill();
	
	//axis
	hdc.fillStyle = "black";
	hdc.strokeStyle = "black";
	hdc.lineWidth = 1;
	
	hdc.beginPath();
	hdc.moveTo(axisLeft, axisX);
	hdc.lineTo(axisRight, axisX);
	hdc.lineTo(axisRight - dashSz, axisX - dashSz);
	hdc.moveTo(axisRight, axisX);
	hdc.lineTo(axisRight - dashSz, axisX + dashSz);
	hdc.stroke();
	
	//dashes and numbers
	for (let i in points_data)
	{
		let p = points_data[i], x = pointLeft + pointDx * (p.x - points_data[0].x);
		if (p.x != 0) //dash
		{
			hdc.beginPath();
			hdc.moveTo(x, axisX - dashSz);
			hdc.lineTo(x, axisX + dashSz);
			hdc.stroke();
			
			hdc.fillText("" + p.x, x - 4, axisX + 4);
		}
	}
	
	//y axis
	hdc.beginPath();
	hdc.moveTo(axisY, axisBottom);
	hdc.lineTo(axisY, axisTop);
	hdc.lineTo(axisY - dashSz, axisTop + dashSz);
	hdc.moveTo(axisY, axisTop);
	hdc.lineTo(axisY + dashSz, axisTop + dashSz);
	hdc.stroke();
	
	hdc.fillText("0", axisY - 4, axisX + 4);
	
	//dashes and numbers on y axis
	for (let i in points_data)
	{
		let p = points_data[i], y = axisX + pointHeight * p.y;
		if (p.y != 0) //dash
		{
			hdc.beginPath();
			hdc.moveTo(axisY - dashSz, y);
			hdc.lineTo(axisY + dashSz, y);
			hdc.stroke();
			
			if (p.y == 1) hdc.textBaseline = "bottom";
			hdc.fillText("" + p.y, axisY - 4, y + (p.y == 1 ? -4 : 4));
		}
	}
	
	//mini lines
	hdc.strokeStyle = "lightgray";
	for (let i in points_data)
	{
		let p = points_data[i], x = pointLeft + pointDx * (p.x - points_data[0].x), y = axisX + pointHeight * p.y;
		if (y < axisX - dashSz) //vertical
		{
			hdc.beginPath();
			hdc.moveTo(x, axisX - dashSz);
			hdc.lineTo(x, y);
			hdc.stroke();
		}
		if (x < axisY - dashSz) //left
		{
			hdc.beginPath();
			hdc.moveTo(x, y);
			hdc.lineTo(axisY - dashSz, y);
			hdc.stroke();
		}
		else if (x > axisY + dashSz) //right
		{
			hdc.beginPath();
			hdc.moveTo(axisY + dashSz, y);
			hdc.lineTo(x, y);
			hdc.stroke();
		}
	}
	
	//graphic itself
	hdc.strokeStyle = "red";
	hdc.lineWidth = 3;
	
	let prevX = axisLeft, prevY = axisX;
	for (let i in points_data)
	{
		let p = points_data[i], x = pointLeft + pointDx * (p.x - points_data[0].x), y = axisX + pointHeight * p.y;

		//line
		hdc.beginPath();
		hdc.moveTo(prevX + dashSz / 2, prevY);
		hdc.lineTo(x, prevY);
		hdc.stroke();
		
		//circle
		if (i > 0)
		{
			hdc.beginPath();
			hdc.arc(prevX, prevY, dashSz / 2, 0, 2 * Math.PI, 0);
			hdc.stroke();
		}
		
		//new pos
		prevX = x;
		prevY = y;
	}
	//last line
	hdc.beginPath();
	hdc.moveTo(prevX + dashSz / 2, prevY);
	hdc.lineTo(axisRight, prevY);
	hdc.stroke();
	
	hdc.beginPath();
	hdc.arc(prevX, prevY, dashSz / 2, 0, 2 * Math.PI, 0);
	hdc.stroke();
}

draw();
