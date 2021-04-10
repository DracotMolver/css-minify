function getHexadecimal(hex) {
  let tempHex = hex;

  const noHash = hex.substring(1);
  const [r1, r2, g1, g2, b1, b2] = noHash.split('');

  if (r1 === r2 && g1 === g2 && b1 === b2) {
    tempHex = `#${r1}${g1}${b1}`;
  }

  return tempHex;
}

module.exports = {
  getHexadecimal,
};
