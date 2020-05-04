module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 2018
***REMOVED***
  "plugins": ["jest"],
 "env": {
   "jest/globals": true,
   "browser": true,
   "node": true,
   "es6": true,
   "jquery": true
 ***REMOVED***,
 "extends": ["airbnb-base"],
 "rules": {
   "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
   "arrow-parens": ["error", "always"],
   "camelcase": "error",
   "comma-dangle": ["error", "only-multiline"],
   "class-methods-use-this": "off",
   "function-paren-newline": "off",
   "indent": "off",
   "import/no-unresolved": "warn",
   "import/no-extraneous-dependencies": "warn",
   "import/extensions": [
     "error",
     "never",
     {
       "js": "off",
       "svg": "always",
       "scss": "always",
       "css": "always"
   ***REMOVED***
   ],
   'prefer-destructuring': 'warn',
   'no-await-in-loop': 'warn',
   'no-useless-escape': 'warn',
   "max-len": [
     "error",
     {
       "code": 125,
       "ignoreUrls": true,
       "ignoreRegExpLiterals": true,
       "ignoreStrings": true
   ***REMOVED***
   ],
   "no-console": "off",
   "no-mixed-operators": "off",
   "no-restricted-globals": "off",
   "no-underscore-dangle": "off",
   "object-curly-newline": ["error", { "consistent": true ***REMOVED***],
   "require-jsdoc": [
     "warn",
     {
       "require": {
         "FunctionDeclaration": true,
         "MethodDefinition": true,
         "ClassDeclaration": true,
         "ArrowFunctionExpression": true
     ***REMOVED***
   ***REMOVED***
   ]
 ***REMOVED***
***REMOVED***;
