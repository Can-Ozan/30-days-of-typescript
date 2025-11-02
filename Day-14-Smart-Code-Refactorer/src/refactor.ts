import * as recast from 'recast';
import * as parser from '@babel/parser';

export function refactorCode(code: string): string {
  const ast = recast.parse(code, {
    parser: {
      parse: (source: any) => parser.parse(source, {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        errorRecovery: true,
      }),
    },
  });

  const functions: any[] = [];
  recast.visit(ast, {
    visitFunctionDeclaration(path) {
      functions.push(path.node);
      return this.traverse(path);
    },
  });

  const nodesToRemove = findNodesToRemove(functions);

  recast.visit(ast, {
    visitFunctionDeclaration(path) {
      if (nodesToRemove.includes(path.node)) {
        path.prune();
      }
      return this.traverse(path);
    },
  });

  return recast.print(ast).code;
}

function findNodesToRemove(nodes: any[]): any[] {
    const toRemove: any[] = [];
    const seen = new Set();

    for (const node of nodes) {
      const source = recast.print(node).code;
      if (seen.has(source)) {
        toRemove.push(node);
      } else {
        seen.add(source);
      }
    }

    return toRemove;
  }
