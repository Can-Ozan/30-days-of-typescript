import { useEffect, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { ASTNode } from "@/utils/codeParser";

interface TreeVisualizerProps {
  astTree: ASTNode | null;
}

const NODE_COLORS = {
  function: "hsl(var(--node-function))",
  variable: "hsl(var(--node-variable))",
  loop: "hsl(var(--node-loop))",
  class: "hsl(var(--node-class))",
  conditional: "hsl(var(--node-conditional))",
  other: "hsl(var(--muted))",
};

export const TreeVisualizer = ({ astTree }: TreeVisualizerProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!astTree) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: newNodes, edges: newEdges } = convertASTToFlow(astTree);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [astTree, setNodes, setEdges]);

  const convertASTToFlow = (
    astNode: ASTNode,
    x = 0,
    y = 0,
    level = 0
  ): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const horizontalSpacing = 300;
    const verticalSpacing = 100;

    const node: Node = {
      id: astNode.id,
      type: "default",
      position: { x, y },
      data: {
        label: astNode.label,
      },
      style: {
        background: NODE_COLORS[astNode.nodeType],
        color: "white",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "12px",
        fontWeight: "600",
      },
    };

    nodes.push(node);

    let childX = x - (astNode.children.length - 1) * (horizontalSpacing / 2);
    astNode.children.forEach((child, index) => {
      const childY = y + verticalSpacing;
      const childResult = convertASTToFlow(child, childX, childY, level + 1);

      nodes.push(...childResult.nodes);
      edges.push(...childResult.edges);

      edges.push({
        id: `${astNode.id}-${child.id}`,
        source: astNode.id,
        target: child.id,
        type: "smoothstep",
        style: { stroke: "hsl(var(--border))", strokeWidth: 2 },
        animated: false,
      });

      childX += horizontalSpacing;
    });

    return { nodes, edges };
  };

  return (
    <div className="w-full h-full bg-background rounded-lg border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="hsl(var(--border))" gap={16} />
        <Controls className="bg-secondary border border-border rounded-lg" />
        <MiniMap
          nodeColor={(node) => node.style?.background as string}
          className="bg-secondary border border-border rounded-lg"
        />
      </ReactFlow>
    </div>
  );
};
