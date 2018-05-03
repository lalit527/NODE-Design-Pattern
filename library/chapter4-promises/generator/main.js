function getPath(path, source, destination) {
    let length = Object.keys(path).length;
    let vertices = Object.keys(path);
    let allPath = [];
    let vistedDic = {}
    for(let i = 0; i < length; i++) {
        vistedDic[vertices[i]] = false
    }
    getPathUtil(path, source, destination, vistedDic, allPath, resultPath)
    console.log('here', resultPath);
    //console.log(allPath);
}

function getPathUtil(path, source, destination, visited, allPath) {
    visited[source] = true
    allPath.push(source);
    //console.log(path[source]);
    //console.log(resultPath);
    if(source === destination) {
         console.log(allPath);
         resultPath.push(allPath.slice());
    } else{
        for(let i of path[source]){
            if(visited[i] === false){
                getPathUtil(path, i, destination, visited, allPath);
            }
        }
    }
    allPath.pop()
    visited[source] = false

}

const pathObject = {
    A: ["B"],
    B: ["C", "D"],
    D: ["E"],
    C: ["F", "E"],
    E: ["G"],
    F: ["G"],
    G: ["H"],
    H: []
};
const source = "A";
const destination = "H";
var resultPath = []
getPath(pathObject, source, destination, resultPath)