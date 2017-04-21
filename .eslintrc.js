module.exports = {
  "extends": "airbnb",

  "env": {
    "browser": true
  },

  "rules": {
    "no-use-before-define": "off", // Placing trivial helper methods at the bottom of the file is helpful in reading the code
    "quote-props": "off", // Since we use classnames/bind to generate css-classes (which often has hyphens) this rule becomes cumbersome
    "max-len": ["off"], // Short lines can be useful, but it's to strict to force is as a rule
    "func-names": "off", // Don't force names on functions, it's not necessary for debuggin or any other purpose
    "react/no-multi-comp": "off", // Having helper components in the same class is useful and prevents having too many files
    "react/forbid-prop-types": ["off"], // Currently we are passing around lots of objects in the code. Some day we can drop this rule, but we are not there yet
    "react/require-default-props": ["off"], // Default props for callbacks gives bloaty code. The fuss from booleans sometimes being null is smaller
    "react/no-array-index-key": ["off"], // When a list does not have unique values and cannot be reordered, using index is ok
    "no-else-return": ["off"], // This prevents 'else {return x}'. I think it sometimes makes the code more logical, so we allow it
    "class-methods-use-this": ["off"], // Allow class methods that does not use this. Sometimes it is easier to read a method as a class method
    "linebreak-style": ["off"], // linebreak style is automatically handled by git, we should not have to care about it
  },
};