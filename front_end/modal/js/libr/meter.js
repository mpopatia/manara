function draw(ctx, sz) {
	ctx.lineCap = 'square';
	ctx.beginPath();
	ctx.lineWidth = sz/7;
	ctx.strokeStyle = '#e6e6e6';
	ctx.lineCap = 'round';
	ctx.arc(sz/2, sz/2, sz/2 - sz/9, (0 + 140) * Math.PI / 180, (260 + 140) * Math.PI / 180);
	ctx.stroke();
}

function move(bar, percentage, caption, sz) {
	var color = percentage > 0.85 ? '#96D711' : percentage > 0.5 ? '#FFCB09' : '#FF6A3F';
	var ctx = bar.getContext("2d");
	bar.width = bar.width;
	var new_percentage = percentage > 1 ? 1 : percentage;
	ctx.lineCap = 'square';
	ctx.beginPath();
	ctx.lineWidth = sz/10;
	ctx.strokeStyle = color;
	ctx.lineCap = 'round';
	ctx.arc(sz/2, sz/2, sz/2 - sz/9, (0 + 140) * Math.PI / 180, (new_percentage * 260 + 140) * Math.PI / 180);
	ctx.stroke();
	$(caption).text((parseInt(percentage * 100, 10)) + '%');
}