var input = document.getElementById("input");
input.value = "-1 0.2\n0 0.5\n5 0.3";

function go()
{
	let lines = input.value.split("\n"), y = 0;
	points_data = [];
	
	for (let i in lines)
	{
		let spl = lines[i].split(" ");
		if (spl.length != 2) continue; //must be format "x y"
		y += parseFloat(spl[1]);
		points_data.push({x: parseFloat(spl[0]), y});
	}
	plot();
}