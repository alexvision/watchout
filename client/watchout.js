options = {
  width: 1000,
  height: 1000,
  speed: 400,
  time: 0,
  period: 100
}

board = d3.select('body').append('svg')
        .attr('width',options.width)
        .attr('height',options.width)

var Asteroid = function(id,r, cx, cy, color){
  this.id = id;
  this.r = r;
  this.cx = cx;
  this.cy = cy;
  this.color = color;
}

var Player = function(){

}


Asteroid.prototype.move = function(x,y,r,w){
  x = 100+r*Math.cos(w*time);
  y = 100+r*Math.sin(w*time);
  d3.select('circle').transition()
    .duration(options.speed)
    .attr('cx',x)
    .attr('cy',y); 
}

var randomAsteroids = function(n){
  res = [];
  for (var i = 0; i < n; i++) {
    var id = i;
    var r = Math.random()*30;
    var x = Math.random()*600;
    var y = Math.random()*600;
    var rColor = Math.floor(Math.random()*256);
    var gColor = Math.floor(Math.random()*256);
    var bColor = Math.floor(Math.random()*256);
    var newAst = new Asteroid(i,r,x,y,"rgb("+rColor+","+gColor+","+bColor+")");
    res.push(newAst);
  };

  return res;
}

var initCircles = function(data){
    d3.select('svg').selectAll('circle')
    .data(data,function(d){return d.id}) //get unique key reference to circle
    .enter().append('svg:circle') // add new elements cuz none exist
    .transition().duration(1)
    .attr('class','Asteroid')
    .attr('r',function(d){return d.r})
    .attr('cx',function(d){return d.cx})
    .attr('cy',function(d){return d.cy})
    .attr('fill',function(d){return d.color}) 
};

var moveCircles = function(data){
    d3.select('svg').selectAll('circle')
    .data(data,function(d){return d.id}) //get unique key reference to circle
    .transition().duration(options.speed)
    .attr('class','Asteroid')
    .attr('cx',function(d){return d.cx})
    .attr('cy',function(d){return d.cy})
};


//initialize our asteroids
var asteroids = randomAsteroids(100);
initCircles(asteroids);


var update = function(data){
  options.time = options.time + 0.00001;
  for (var i = 0; i < data.length; i++) {
      newX = 50*(Math.random()-0.5)*Math.cos(Math.random()*options.speed*options.time) + data[i].cx;
      newY = 50*(Math.random()-0.5)*options.speed*options.time + data[i].cy;
      if (newX >options.width){
        newX = 0;
      }
      else if (newX < 0){
        newX = options.width;
      }
      if (newY >options.height){
        newY = 0;
      }
      else if (newY < 0 ){
        newY = options.height;
      }
      data[i].cx = newX;
      data[i].cy = newY;
  };
  // console.log(data[4].cx);
  moveCircles(data);
}

setInterval(function(){update(asteroids)},options.period);    

