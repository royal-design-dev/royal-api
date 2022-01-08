const toArray = <T = unknown>(variable: T[] | T): T[] =>
  Array.isArray(variable) ? [...variable] : [variable];

export default toArray;
