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


Asteroid.prototype.move = function(x,y,r,w){
  x = 100+r*Math.cos(w*time);
  y = 100+r*Math.sin(w*time);
  d3.select('circle').transition()
    .duration(options.speed)
    .attr('cx',x)
    .attr('cy',y); 
}
var Player = function(id,r,cx,cy,color){
  // copy props
  Asteroid.apply(this, arguments);
// <svg height="250" width="500">
  // <polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1" />
// </svg>
};

Player.prototype = Object.create(Asteroid.prototype);
Player.prototype.constructor = Player;

var newPlayer = new Player('player',10,300,300,'green');

 d3.select('svg').selectAll('circle')
  .data([newPlayer], function(d){return d.id})
  .enter().append('svg:circle')
  .attr('class','Player')
  .attr('r',function(d){return d.r})
  .attr('cx',function(d){return d.cx})
  .attr('cy',function(d){return d.cy})
  .attr('fill',function(d){return d.color});

// var playerSelection = d3.select(".player")
var drag = d3.behavior.drag().on('drag',function(d){
  var x =  d.cx + d3.event.dx;
  var y = d.cy + d3.event.dy;
  newPlayer.cx = x
  newPlayer.cy = y
  d3.select(this).attr("cx",x).attr("cy",y);
  //console.log(x,' ',y)
})

newPlayerSelect = d3.select('svg').selectAll('circle')
  .data([newPlayer], function(d){return d.id})
  .attr('class','Player')
  .attr('r',function(d){return d.r})
  .attr('fill',function(d){return d.color});

newPlayerSelect.call(drag);



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
var asteroids = randomAsteroids(1);
 
initCircles(asteroids);

var points = 0;
var collisions = 0;
var highScore = 0;
var checkCollision = function(astroObj){
  //cecjkk
  for (var i = 0; i < asteroids.length; i++) {
    var refAstro = asteroids[i];
    var x = asteroids[i].cx
    var y = asteroids[i].cy
    var dist = Math.pow(Math.pow(astroObj.cx - x,2)+Math.pow(astroObj.cx - y,2),0.5);
    console.log(dist)
    if (dist < astroObj.r + refAstro.r){
      collisions++;
      d3.select('.collisions').select('span').text(collisions);
      if(points > highScore){
        d3.select('.high').select('span').text(points);
      }
      points = 0;
      d3.select('.current').select('span').text(points);
    };
  };
}
var update = function(data){
  points ++;
  d3.select('.current').select('span').text(points);
  options.time = options.time + 0.00001;
  checkCollision(newPlayer);
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

