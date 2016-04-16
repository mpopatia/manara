$(document).ready(function() {

  var diameter = 1200,
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

  // d3.json("https://api.myjson.com/bins/1vsb0", function(error, root) {
  //   if (error) throw error;
//   dict = JSON.stringify({
//  "name": "flare",
//  "children": [
//   {
//    "name": "analytics",
//    "children": [
//       {
//        "name": "flex",
//        "children": [
//           {"name": "FlareVis", "size": 4116}
//          ]
//       }
//     ]
//   }
//  ]
// });
//     root = JSON.parse(dict);

  dict = JSON.parse(JSON.stringify([{"random":62.5,"name":"#NYUADHack","count":24,"volume":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"sentiment":30,"start":"06:15","images":["https://t.co/HQe2gnfDRh","https://t.co/bckjGT2a2K","https://t.co/LdAcgxowZc","https://t.co/2rIJMJ34TB"],"location":{"lat":24.523272,"lng":54.434817},"tweets":[{"text":"A trendy urban village: @nyuabudhabi is an excellent example of New Urbanism at its best! https://t.co/bckjGT2a2K","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: The hackathon has 49% female participation this year! #nyuadhack #progress #change4good @ New https://t.co/AJBTrnSIea","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: Sana with a mother / daughter duo of very gifted technologists! #family #nyuadhack #nyu #nyuad https://t.co/a9taHcoOy6","profile_image":"http://placehold.it/200x200"}]},{"random":62.5,"name":"#NYUADHack","count":24,"volume":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"sentiment":30,"start":"06:15","images":["https://t.co/HQe2gnfDRh","https://t.co/bckjGT2a2K","https://t.co/LdAcgxowZc","https://t.co/2rIJMJ34TB"],"location":{"lat":25.316311,"lng":51.438997},"tweets":[{"text":"A trendy urban village: @nyuabudhabi is an excellent example of New Urbanism at its best! https://t.co/bckjGT2a2K","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: The hackathon has 49% female participation this year! #nyuadhack #progress #change4good @ New https://t.co/AJBTrnSIea","profile_image":"http://placehold.it/200x200"},{"text":"RT @jsjohnst: Sana with a mother / daughter duo of very gifted technologists! #family #nyuadhack #nyu #nyuad https://t.co/a9taHcoOy6","profile_image":"http://placehold.it/200x200"}]}]));

    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(dict))
        .filter(function(d) { 
          console.log("IN FILTER");
          console.log(d);
          return d.depth > 0; }))
        .enter().append("g")
        .attr("class", "node")
        .on("click", function(d){
          console.log("on click: ");
          console.log(d);
        })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
    node.append("title")
        .text(function(d) { 
          return d.name; });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { 

          return color(d.name); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { 
          console.log("NAME: " + d.name);
          return d.name.substring(0, d.r / 3); });
  // });

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    var classes = [];
    console.log("ROOOT!");
    console.log(root);
    console.log(dict);
    for (i in dict) {
      console.log(dict[i]);
      classes.push({name: dict[i]['name'], value: dict[i]['count']});
    }
    // function recurse(name, node) {
    //   if (node.children) {
    //     node.children.forEach(function(child) { 
    //       recurse(node.name, child); 
    //     });
    //   } else {
    //     console.log("NODE: ");
    //     console.log(node);
    //     classes.push({name: node.name, value: node.size});
    //   }
    // }

    // recurse(null, root);
    return {children: classes};
  }

  d3.select(self.frameElement).style("height", diameter + "px");

});