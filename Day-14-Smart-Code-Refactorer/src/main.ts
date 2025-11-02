import { refactorCode } from './refactor';

export function main() {
  const before = document.getElementById('before') as HTMLTextAreaElement;
  const after = document.getElementById('after') as HTMLTextAreaElement;
  const refactor = document.getElementById('refactor') as HTMLButtonElement;

  refactor.addEventListener('click', () => {
    const code = before.value;
    after.value = refactorCode(code);
  });
}
