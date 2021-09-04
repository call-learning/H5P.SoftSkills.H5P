/**
 * Emulates H5P library for tests
 */

var H5P = {};
var H5PIntegration = {};

H5P.t = function (key, vars) {
  return '[' + key + (vars? ':' + JSON.stringify(vars): '') + ']';
} // Emulate translation function
H5P.getPath = function (srcpath, contentId) {
  return srcpath;
}
H5PIntegration.siteUrl='/';

export default H5P;
