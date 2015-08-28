board = d3.select('body').append('svg')
        .attr('width',600)
        .attr('height',600)

// board.selectAll('circle.enemy')
//       .data(ene)

d3.select('svg').append('circle')
          .attr('r',25)
          .attr('cx',100)
          .attr('cy',100)
          .attr('fill','red')


var move = function(x,y,r,w){
  x = 100+r*Math.cos(w*time)
  y = 100+r*Math.sin(w*time)
  d3.select('circle').transition()
          .duration(500)
          .attr('cx',x)
          .attr('cy',y)  
}

var x=100
var y=100
var time =0
setInterval(function(){
  time++;
  x += 50;
  y += 50;
  move(x,y,100,100)}
  ,500)