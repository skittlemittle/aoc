const subjectNumber = 7;
// const input = { k1: 17807724, k2: 5764801 }; // test
const input = { k1: 1327981, k2: 2822615 }; // real

const transform = (val, subjectNumber) => (val * subjectNumber) % 20201227;

function findLoopSize(publicKey) {
  let loopSize = 1;
  let value = 1;
  while (true) {
    value = transform(value, subjectNumber);
    if (value === publicKey) break;
    loopSize++;
  }
  return loopSize;
}

function one(publicKeys) {
  const ls1 = findLoopSize(publicKeys.k1);
  const ls2 = findLoopSize(publicKeys.k2);
  console.log(`${ls1} ${ls2}`);
  let privateKey = 1;
  for (let i = 0; i < ls2; i++) {
    privateKey = transform(privateKey, publicKeys.k1);
  }

  return privateKey;
}

console.log(one(input));
