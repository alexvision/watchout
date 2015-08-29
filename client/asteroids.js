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
