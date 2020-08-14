exports.code = () => {
  let newCode = '';

  for(let i = 0; i < 5; i++){
    newCode = newCode + Math.round(Math.random() * 9);
  }

  return newCode;
}