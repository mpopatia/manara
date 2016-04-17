$(document).ready(function() {
  var diameter = 800,
    format = d3.format(",d"),
    color = d3.scale.category20c();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("#visualisation").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

  d3.json("http://1107587a.ngrok.io/api/activity", function(error, root) {
    if (error) throw error;

  // root = JSON.parse(JSON.stringify([{"random":62.5,"name":"#Classof2022","count":14,"volume":[44, 37, 40, 44, 38, 40, 36, 39, 34, 30, 41, 37, 49, 35, 34, 50, 40, 49, 46, 45, 40, 35, 42, 44, 48, 50, 39, 38, 38, 32, 31, 35, 46, 49, 44, 45, 50, 49, 36, 40, 32, 44, 41, 43, 31, 33, 34, 37, 49, 50, 33, 30, 42, 30, 43, 35, 40, 39, 48, 40, 46, 33, 32, 33, 48, 46, 33, 42, 41, 48, 33, 50, 46, 33, 35, 39, 32, 34, 31, 31, 46, 43, 39, 48, 48, 47, 32, 41, 36, 42, 41, 33, 45, 39, 42, 30, 30, 45, 45, 36, 45, 30, 35, 34, 47, 46, 32, 31, 44, 33, 37, 47, 44, 45, 48, 36, 31, 48, 40, 34, 39, 43, 42, 39, 49, 44, 30, 49, 42, 43, 49, 31, 33, 31, 41, 35, 50, 33, 50, 31, 50, 47, 31, 36, 37, 33, 39, 47, 47, 49, 33, 49, 41, 41, 48, 45, 46, 47, 43, 48, 30, 37, 40, 37, 32, 35, 34, 42, 37, 37, 42, 47, 36, 41, 46, 30, 33, 38, 50, 47, 44, 35, 46, 48, 47, 30, 49, 36, 45, 40, 46, 49, 42, 39, 36, 44, 49, 42, 47, 35, 47, 46, 42, 36, 50, 43, 43, 34, 39, 32, 41, 38, 34, 38, 43, 38, 35, 39, 47, 43, 46, 39, 40, 34, 33, 42, 30, 44, 32, 31, 39, 31, 39, 39, 45, 30, 45, 48, 38, 44, 48, 36, 30, 30, 44, 45, 42, 45, 50, 31, 46, 37, 32, 41, 43, 47, 31, 33, 32, 48, 47, 48, 42, 45, 32, 45, 33, 36, 39, 42, 34, 33, 32, 36, 34, 50, 42, 37, 39, 31, 36, 33, 31, 42, 44, 36, 32, 43, 39, 40, 46, 34, 34, 37, 32, 46, 33, 46, 31, 34, 48, 45, 46, 39, 31, 32, 42, 30, 31, 38, 50, 37, 41, 41, 36, 47, 36, 37, 34, 34, 40, 40, 43, 47, 38, 32, 37, 42, 40, 33, 38, 36, 37, 30, 33, 48, 48, 36, 36, 35, 47, 50, 33, 46, 44, 49, 46, 45, 37, 44, 45, 37, 40, 47, 50, 43, 35, 40, 36, 37, 41, 38, 46, 38, 36, 45, 49, 43, 47, 32, 42, 41, 36, 31, 36, 40, 42, 46, 49, 39, 32, 50, 48, 48, 31, 46, 49, 48, 41, 30, 39, 35, 39, 45, 50, 44, 50, 35, 32, 34],"sentiment":30,"start":"06:15","images":["https://t.co/HQe2gnfDRh","https://t.co/bckjGT2a2K","https://t.co/LdAcgxowZc","https://t.co/2rIJMJ34TB"],"location":{"lat":24.523272,"lng":54.434817},"tweets":[{"text":"A trendy urban village: @nyuabudhabi is an excellent example of New Urbanism at its best! https://t.co/bckjGT2a2K","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: The hackathon has 49% female participation this year! #nyuadhack #progress #change4good @ New https://t.co/AJBTrnSIea","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: Sana with a mother / daughter duo of very gifted technologists! #family #nyuadhack #nyu #nyuad https://t.co/a9taHcoOy6","profile_image":"http://placehold.it/200x200"}]},{"random":62.5,"name":"#NYUADHack","count":24,"volume":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"sentiment":70,"start":"06:15","images":["https://t.co/HQe2gnfDRh","https://t.co/bckjGT2a2K","https://t.co/LdAcgxowZc","https://t.co/2rIJMJ34TB"],"location":{"lat":25.316311,"lng":51.438997},"tweets":[{"text":"A trendy urban village: @nyuabudhabi is an excellent example of New Urbanism at its best! https://t.co/bckjGT2a2K","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: The hackathon has 49% female participation this year! #nyuadhack #progress #change4good @ New https://t.co/AJBTrnSIea","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: Sana with a mother / daughter duo of very gifted technologists! #family #nyuadhack #nyu #nyuad https://t.co/a9taHcoOy6","profile_image":"http://placehold.it/200x200"}]}]));

    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(root))
        .filter(function(d) { 
          return d.depth > 0; }))
        .enter().append("g")
        .attr("class", "node")
        .on("click", function(d){
          $('#server_msg_modal').modal('show');
          dealClick(d.everything);
        })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
    node.append("title")
        .text(function(d) { 
          return d.name; });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { 
          var sentiment = d.everything.sentiment;
          if (sentiment <= 20) {
            return '#B8312F'
          }
          if (sentiment <= 40) {
            return '#FBA026'
          } 
          if (sentiment <= 80) {
            return '#54ACD2'
          } 
          if (sentiment <= 100) {
            return '#61BD6D'
          }
          return color(d.name); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("font-size", function(d) {
          return d.r/5;
        })
        .text(function(d) { 
          return d.name; });
  });

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    var classes = [];
    for (i in root) {
      classes.push({name: root[i]['name'], value: root[i]['count'], everything: root[i]});
    }
    return {children: classes};
  }

  d3.select(self.frameElement).style("height", diameter + "px");

});


function dealClick(data) {
    $('.modal-title').text(data.name);
    // $('header').html(data.name);
    var line_data = [];
    var pie_data = [{'size': 90}, {'size': 10}];
    var max_density = 0;
    for (var i = 0; i < data.volume.length; i++) {
      if (data.volume[i] > max_density){
        max_density = data.volume[i];
      }
      line_data.push({'time':moment(data.start, 'HH:mm').add(i, 'second').format('HH:mm:ss'), 'value':data.volume[i]})     
    }
    max_density = max_density + 15;
    var line = draw_line(line_data, 'line', max_density);
    var pie = draw_pie(pie_data, 'sentiment', data.sentiment);



    setTimeout(function(){
      setInterval(function(){
        //updates chart here
        console.log('CALL API');
        

        var volume_url = 'http://1107587a.ngrok.io/api/activity/' + data.name.substring(1, data.name.length).toLowerCase() + '/volume';
        console.log("VOLUME" + volume_url);
        $.get(volume_url, {}, function(data) {
          console.log(data);
          line_data = [];
          // var pie_data = [{'size': 90}, {'size': 10}];
          max_density = 0;
          for (var i = 0; i < data.length; i++) {
            if (data[i] > max_density){
              max_density = data[i];
            }
            line_data.push({'time':moment(data.start, 'HH:mm').add(i, 'second').format('HH:mm:ss'), 'value':data[i]})     
          }
          max_density = max_density + 15;
          line.animateData(line_data, { duration: 1000 });
          line.valueAxes[0].maximum = max_density;
          $('#volume').html(data[data.length - 1]);

        });

        var sentiment_url = 'http://1107587a.ngrok.io/api/activity/' + data.name.substring(1, data.name.length).toLowerCase();
        $.get(sentiment_url, {}, function(data) {
          pie_data = [{'size': data.sentiment}, {'size': 100-data.sentiment}];

          pie.animateData(pie_data, {duration: 1000});
          pie.allLabels[1].text = data.sentiment;
        
        });


      }, 3 * 1000); 
    }, 1000);

    for (var i = 0; i < data.tweets.length; i++) {
      // data.tweets[i].profile_image = 'http://carbonwho.com/wp-content/uploads/2011/11/d-d2.jpg'
      $('.tweets').append('<div class="tweet">\
        <div class="profile" style="background:url(' + data.tweets[i].profile_image + ') no-repeat center center;background-size:60px 60px;"></div>\
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



    function draw_pie(data, id, text) {
      var pie = AmCharts.makeChart(id, {
          type: "pie",
          titleField: "gate",
          dataProvider: data,
          valueField: "size",
          startDuration: 1,
          startEffect: "elastic",
          innerRadius: 220,
          pullOutRadius: 80,
          labelRadius: -20,
          colors: ['#1ABC9C','#444'],
          color: '#FFF',
          balloonFunction: function(d) {
              return d.value;
          },
          labelFunction: function(value) {
            return '';
          },
          allLabels: [{
              y: "50%",
              align: "center",
              size: 50,
              text: 'Sentiment',
              color: "#FFF"
          }, {
              y: "42%",
              align: "center",
              size: 50,
              bold: true,
              text: text,
              color: "#FFF"
          }],
          balloon: {
              color: '#FFF',
              fillColor: '#34495e ',
              fillAlpha: 1,
              horizontalPaddin: 10,
              verticalPadding: 8
          }
      });
    return pie;
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
          fontSize: 20,
          minHorizontalGap: 150,
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
          gridCount: 10,
          gridAlpha: 0.4,
          axisColor: "#1ABC9C",
          maximum: max_density,
          fontSize: 20,
          minimum: 0,
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
}