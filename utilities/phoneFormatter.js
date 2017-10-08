/**
 * Automatically adds dashes required by phone format and limits characters to 10
 */
const phoneFormatter = (number) => {
  if (!number) return '';
  const splitter = /.{1,3}/g;
  if (typeof number === 'number') {
    number = number.toString();
  }
  number = number.substring(0, 10);
  return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
}

/**
 * Remove dashes added by formatter. We want to store phone as plain numbers
 */
const phoneParser = (number) => number ? number.replace(/-/g, '') : '';

export {phoneFormatter, phoneParser};
