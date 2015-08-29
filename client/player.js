var Player = function(id,r,cx,cy,color,rx,ry){
  
  Asteroid.apply(this, arguments);
  this.rx = rx;
  this.ry = ry;
};

Player.prototype = Object.create(Asteroid.prototype);
Player.prototype.constructor = Player;

