import fs from 'fs'
import path from 'path'
function mkdirPath (pathStr) {
  var projectPath = path.join(process.cwd());
  if (pathStr.indexOf('/') == 0) {
    projectPath = ""
  }
  var tempDirArray = pathStr.indexOf('\\') >= 0 ? pathStr.split('\\') : pathStr.split('\/');
  for (var i = 0; i < tempDirArray.length - 1; i++) {
    projectPath = projectPath + '/' + tempDirArray[i];
    if (fs.existsSync(projectPath)) {
      var tempstats = fs.statSync(projectPath);
      if (!(tempstats.isDirectory())) {
        fs.unlinkSync(projectPath);
        fs.mkdirSync(projectPath);
      }
    }
    else {
      fs.mkdirSync(projectPath);
    }
  }
  return projectPath;
}
function writeFile (path, stringData) {
  mkdirPath(path)
  fs.writeFile(path, stringData, function (err) {
    if (err) {
      debugger
      throw err;
    }
    console.log(path + ' has been saved!');
  })
}
export default writeFile