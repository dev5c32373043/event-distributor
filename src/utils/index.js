export const to = async promise => promise.then(data => [null, data]).catch(err => [err]);

export const isStringifiedFunction = str => /^(function\s*\()|^\(.*\)\s*=>/.test(str);

export * from './logger.js';
export * from './errors.js';
