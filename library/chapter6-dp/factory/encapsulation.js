function createPerson(name) {
  const privateProperties = {}

  const person = {
    setName: name => {
      if(!name) {
        throw new Error('A person must have a name');
      }
    },
    getName: () => {
      return privateProperties.name;
    }
  };

  person.setName(name);
  return person;
  
}