//set up regexs for use in methods
export const splitPoints = /([)(+*/-]|ans)/,
  operators = /[+*/-]/,
  numbers = /[0-9]/,
  anyNumber = /[.0-9]+/,
  decimal = /[.]/,
  lastNumberHasDecimal = /([0-9]*\.[0-9]*)$/;
