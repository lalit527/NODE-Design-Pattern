const stampit = require('stampit');

const character = stampit().
  props({
    name: 'annonymous',
    lifepoint: 100,
    x: 0,
    y:0
  });

const c = character();
c.name = 'John';
c.lifepoint = 10;
console.log(c);

const mover = stampit().
  methods({
    move(xIncr, yIncr) { 
      this.x += xIncr; 
      this.y += yIncr; 
      console.log(`${this.name} moved to [${this.x}, ${this.y}]`); 
    }
  });

const slasher = stampit().
  methods({
    slash(direction) {
      console.log(`${this.name} slashed to the ${direction}`);
    }
  });

const shooter = stampit()
  .proprs({
    bullets: 6
  })
  .methods({
    shoot(direction) {
      if (this.bullets > 0) { 
        --this.bullets; 
        console.log(`${this.name} shoot to the ${direction}`); 
      }
    }
  })

