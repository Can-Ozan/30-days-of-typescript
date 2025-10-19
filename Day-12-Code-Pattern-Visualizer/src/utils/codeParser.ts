import * as acorn from "acorn";
import * as walk from "acorn-walk";

export interface ASTNode {
  id: string;
  type: string;
  label: string;
  nodeType: "function" | "variable" | "loop" | "class" | "conditional" | "other";
  children: ASTNode[];
}

let nodeId = 0;

const getNodeType = (type: string): ASTNode["nodeType"] => {
  if (
    type === "FunctionDeclaration" ||
    type === "FunctionExpression" ||
    type === "ArrowFunctionExpression" ||
    type === "MethodDefinition"
  )
    return "function";
  if (type === "VariableDeclaration" || type === "VariableDeclarator") return "variable";
  if (
    type === "ForStatement" ||
    type === "WhileStatement" ||
    type === "DoWhileStatement" ||
    type === "ForInStatement" ||
    type === "ForOfStatement"
  )
    return "loop";
  if (type === "ClassDeclaration" || type === "ClassExpression") return "class";
  if (type === "IfStatement" || type === "SwitchStatement" || type === "ConditionalExpression")
    return "conditional";
  return "other";
};

const getNodeLabel = (node: any): string => {
  if (node.id?.name) return `${node.type}: ${node.id.name}`;
  if (node.key?.name) return `${node.type}: ${node.key.name}`;
  if (node.operator) return `${node.type}: ${node.operator}`;
  if (node.declarations && node.declarations[0]?.id?.name) {
    return `${node.type}: ${node.declarations[0].id.name}`;
  }
  return node.type;
};

export const parseJavaScriptCode = (code: string): ASTNode | null => {
  try {
    nodeId = 0;

    // Parse the code with acorn
    const ast = acorn.parse(code, {
      ecmaVersion: "latest",
      sourceType: "module",
    });

    const rootNode: ASTNode = {
      id: `node-${nodeId++}`,
      type: "Program",
      label: "Program",
      nodeType: "other",
      children: [],
    };

    const nodeStack: ASTNode[] = [rootNode];

    // Walk through the AST using full walker
    walk.full(ast as any, (node: any, state: any, type: string) => {
      if (type === "Program") return;

      const astNode: ASTNode = {
        id: `node-${nodeId++}`,
        type,
        label: getNodeLabel(node),
        nodeType: getNodeType(type),
        children: [],
      };

      // Add to current parent
      const currentParent = nodeStack[nodeStack.length - 1];
      currentParent.children.push(astNode);

      // Push this node as the new parent for its children
      nodeStack.push(astNode);
    });

    return rootNode;
  } catch (error) {
    console.error("Parse error:", error);
    return null;
  }
};
