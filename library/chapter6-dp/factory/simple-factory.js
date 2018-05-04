// factory for creating objects
function createImage(name) {
  return new Image(name);
}

const image = createImage('photo.jpeg');

// const image = new Image(name); // will directly create the object


function createImage(name) {
  if(name.match(/\.jpeg$/)) { 
    return new JpegImage(name); 
  } else if(name.match(/\.gif$/)) {
    return new GifImage(name); 
  } else if(name.match(/\.png$/)) {
    return new PngImage(name); 
  } else {
    throw new Exception('Unsupported format'); 
  }
}