function Afactory(b) {
  return {
    foo: function() {
      b.say();
    },

    what: function() {
      return "Hello";
    }
  }
}

function Bfactory(a) {
  return {
    a: a,
    say: function() {
      console.log('I say: ' + a.what);
    }
  }
}

const b = Bfactory(null); 
const a = Afactory(b); 
a.b = b;