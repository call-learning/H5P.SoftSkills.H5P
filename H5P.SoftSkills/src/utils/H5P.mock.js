/**
 * Emulates H5P library for tests
 */

var H5P = {};
H5P.t = function (key, vars, ns) {
  return '[' + key + (vars? ':' + JSON.stringify(vars): '') + ']';
} // Emulate translation function
H5P.getPath = function (srcpath, contentid) {
  return srcpath;
}

export default H5P;
