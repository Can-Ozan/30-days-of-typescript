import { refactorCode } from './refactor';

const code = `
function hello() {
  console.log('hello');
}

function world() {
  console.log('world');
}

function hello() {
  console.log('hello');
}
`;

const refactoredCode = refactorCode(code);

console.log(refactoredCode);
