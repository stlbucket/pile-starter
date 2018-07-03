function raw(script){
  return script
}

const mapper = {
  raw: raw
}

function mapFile(source, target){
  const file = require(source)
  return Promise.resolve(file)
  // return file.up(mapper, null)
}

module.exports = mapFile