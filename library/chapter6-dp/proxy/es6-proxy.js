// const proxy = new Proxy(target, handler);

const scientist = {
  name: 'nikola',
  surname: 'tesla'
};

const uppercaseScientist = new Proxy(scientist, {
  get: (target, property) => target[property].toUpperCase()
})

console.log(uppercaseScientist.name, uppercaseScientist.surname);