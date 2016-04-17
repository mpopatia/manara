(function ($) {
	$(function () {
		var data = {
			"random": 62.5,
			"name": "#NYUADHack",
			"count": 24,
			"volume": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
			"sentiment": 30,
			"start": "06:15",
			"images": ["https://t.co/HQe2gnfDRh", "https://t.co/bckjGT2a2K", "https://t.co/LdAcgxowZc", "https://t.co/2rIJMJ34TB"],
			"location": {
				"lat": 24.523272,
				"lng": 54.434817
			},
			"tweets": [{
				"text": "A trendy urban village: @nyuabudhabi is an excellent example of New Urbanism at its best! https://t.co/bckjGT2a2K",
				"profile_image": "http://placehold.it/200x200"
			}, {
				"text": "RT @jsjohnst: The hackathon has 49% female participation this year! #nyuadhack #progress #change4good @ New https://t.co/AJBTrnSIea",
				"profile_image": "http://placehold.it/200x200"
			}, {
				"text": "RT @jsjohnst: Sana with a mother / daughter duo of very gifted technologists! #family #nyuadhack #nyu #nyuad https://t.co/a9taHcoOy6",
				"profile_image": "http://placehold.it/200x200"
			}]
		}
		$('header').html(data.name)
		var line_data = [];
		var max_density = 0;
		for (var i = 0; i < data.volume.length; i++) {
			if (data.volume[i] > max_density){
				max_density = data.volume[i] + 5;
			}
			line_data.push({'time':moment(data.start, 'HH:mm').add(i, 'minute').format('HH:mm'), 'value':data.volume[i]})			
		}
		var line = draw_line(line_data, 'line', max_density);
		setTimeout(function(){
			setInterval(function(){
				//updates chart here
				console.log('updated')
				line.animateData(line_data, { duration: 1000 });
				$('#volume').html(data.volume[data.volume.length - 1]);
			}, 3 * 1000);	
		}, 1000);

		for (var i = 0; i < data.tweets.length; i++) {
			$('.tweets').append('<div class="tweet">\
				<div class="profile" style="background:url(' + data.tweets[i].profile_image + ') no-repeat center center;background-size:20px 20px;"></div>\
				<div class="text">' + data.tweets[i].text + '</div></div>');
		}

		$(window).scroll(function() {
			format_header();
		});

		function format_header() {
			if ($(window).scrollTop() > 5) {
				$('header').css('position', 'fixed');
				$('header').css('margin-top', '-5px');
			} else {
				$('header').css('position', 'relative');
				$('header').css('margin-top', '0px');
			}
		}

		function draw_line(data, id, max_density) {
			return AmCharts.makeChart(id, {
				id: id,
				type: "serial",
				dataProvider: data,
				categoryField: "time",
				marginBottom: 40,
				marginLeft: 70,
				autoMargins: false,
				categoryAxis: {
					gridAlpha: 0,
					axisAlpha: 0,
					labelFunction: function (value, object, axis){
						return object.dataContext.time;
					},
					color: '#FFF'
				},
				balloon: {
					fillColor: '#1ABC9C',
					fillAlpha: 1,
					color: '#FFF'
				},
				valueAxes: [{
					title: "Crowd count",
					titleColor: "#FFF",
					color: "#FFF",
					autoGridCount: false,
					gridCount: 6,
					gridAlpha: 0.4,
					axisColor: "#1ABC9C",
					maximum: max_density,
					gridColor: "#FFF"
				}],
				graphs: [{ 
					valueField: "value",
					type: "smoothedLine",
					bullet: "round",
					bulletColor: "#00BBCC",
					useLineColorForBulletBorder: true,
					bulletBorderAlpha: 1,
					bulletBorderThickness: 2,
					lineThickness: 2,
					bulletSize: 5,
					balloonText: '[[value]]',
					lineColor: "#FFFFFF" 
				}],
				chartCursor: {
					selectWithoutZooming: true,
					valueLineBalloonEnabled: false
				}
			});
		}
	});
})(jQuery);