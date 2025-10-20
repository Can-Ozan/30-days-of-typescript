import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VisualizationPanel = ({ 
  analysisData = null, 
  isAnalyzing = false,
  onExport = () => {},
  onReset = () => {}
}) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Node type configurations
  const nodeConfig = {
    function: { color: '#3B82F6', icon: '⚡', label: 'Fonksiyon' },
    variable: { color: '#10B981', icon: '📦', label: 'Değişken' },
    loop: { color: '#F59E0B', icon: '🔄', label: 'Döngü' },
    conditional: { color: '#8B5CF6', icon: '🔀', label: 'Koşul' },
    class: { color: '#EF4444', icon: '🏗️', label: 'Sınıf' },
    import: { color: '#6B7280', icon: '📥', label: 'İçe Aktarım' }
  };

  // Mock analysis data for demonstration
  const mockAnalysisData = {
    nodes: [
      {
        id: 'root',
        name: 'Ana Program',
        type: 'function',
        line: 1,
        children: ['calc', 'cart', 'imports'],
        complexity: 3,
        size: 45
      },
      {
        id: 'imports',
        name: 'Item Interface',
        type: 'import',
        line: 1,
        children: [],
        complexity: 1,
        size: 20
      },
      {
        id: 'calc',
        name: 'calculateTotal',
        type: 'function',
        line: 2,
        children: ['loop1', 'cond1'],
        complexity: 4,
        size: 35
      },
      {
        id: 'loop1',
        name: 'for...of döngüsü',
        type: 'loop',
        line: 5,
        children: ['cond2', 'var1'],
        complexity: 2,
        size: 25
      },
      {
        id: 'cond1',
        name: 'item.isActive kontrolü',
        type: 'conditional',
        line: 6,
        children: ['var2'],
        complexity: 1,
        size: 20
      },
      {
        id: 'cond2',
        name: 'discount kontrolü',
        type: 'conditional',
        line: 11,
        children: ['var3'],
        complexity: 2,
        size: 22
      },
      {
        id: 'var1',
        name: 'total',
        type: 'variable',
        line: 3,
        children: [],
        complexity: 1,
        size: 15
      },
      {
        id: 'var2',
        name: 'discountAmount',
        type: 'variable',
        line: 12,
        children: [],
        complexity: 1,
        size: 15
      },
      {
        id: 'var3',
        name: 'existingItem',
        type: 'variable',
        line: 28,
        children: [],
        complexity: 1,
        size: 15
      },
      {
        id: 'cart',
        name: 'ShoppingCart',
        type: 'class',
        line: 20,
        children: ['method1', 'method2'],
        complexity: 3,
        size: 40
      },
      {
        id: 'method1',
        name: 'addItem',
        type: 'function',
        line: 25,
        children: ['cond3'],
        complexity: 2,
        size: 30
      },
      {
        id: 'method2',
        name: 'getTotal',
        type: 'function',
        line: 35,
        children: [],
        complexity: 1,
        size: 18
      },
      {
        id: 'cond3',
        name: 'existingItem kontrolü',
        type: 'conditional',
        line: 28,
        children: [],
        complexity: 1,
        size: 20
      }
    ],
    stats: {
      totalNodes: 13,
      functions: 4,
      variables: 3,
      loops: 1,
      conditionals: 4,
      classes: 1,
      complexity: 22,
      linesOfCode: 45
    }
  };

  const currentData = analysisData || mockAnalysisData;

  // Create hierarchical data structure
  const createHierarchy = useCallback((nodes) => {
    const nodeMap = new Map(nodes.map(node => [node.id, { ...node, children: [] }]));
    const roots = [];

    nodes?.forEach(node => {
      const nodeObj = nodeMap?.get(node?.id);
      if (node?.children && node?.children?.length > 0) {
        node?.children?.forEach(childId => {
          const child = nodeMap?.get(childId);
          if (child) {
            nodeObj?.children?.push(child);
          }
        });
      }
      
      // Find root nodes (nodes that aren't children of others)
      const isRoot = !nodes?.some(n => n?.children && n?.children?.includes(node?.id));
      if (isRoot) {
        roots?.push(nodeObj);
      }
    });

    return roots;
  }, []);

  // D3 visualization rendering
  const renderVisualization = useCallback(() => {
    if (!currentData || !svgRef?.current || !containerRef?.current) return;

    const container = containerRef?.current;
    const svg = d3?.select(svgRef?.current);
    
    // Clear previous content
    svg?.selectAll("*")?.remove();

    const width = container?.clientWidth;
    const height = container?.clientHeight;
    
    svg?.attr("width", width)?.attr("height", height);

    // Create zoom behavior
    const zoom = d3?.zoom()?.scaleExtent([0.1, 3])?.on("zoom", (event) => {
        g?.attr("transform", event?.transform);
        setZoomLevel(event?.transform?.k);
      });

    svg?.call(zoom);

    const g = svg?.append("g");

    // Create hierarchy
    const hierarchyData = createHierarchy(currentData?.nodes);
    const root = d3?.hierarchy({ children: hierarchyData });

    // Create tree layout
    const treeLayout = d3?.tree()?.size([height - 100, width - 200])?.separation((a, b) => (a?.parent === b?.parent ? 1 : 2) / a?.depth);

    treeLayout(root);

    // Create links
    const links = g?.selectAll(".link")?.data(root.links())?.enter()?.append("path")?.attr("class", "link")?.attr("d", d3?.linkHorizontal()?.x(d => d?.y + 100)?.y(d => d?.x + 50)
      )?.attr("fill", "none")?.attr("stroke", "var(--color-border)")?.attr("stroke-width", 2)?.attr("opacity", 0.6);

    // Create nodes
    const nodes = g?.selectAll(".node")?.data(root.descendants())?.enter()?.append("g")?.attr("class", "node")?.attr("transform", d => `translate(${d?.y + 100},${d?.x + 50})`)?.style("cursor", "pointer");

    // Add node circles
    nodes?.append("circle")?.attr("r", d => Math.max(15, (d?.data?.size || 20) / 2))?.attr("fill", d => {
        const type = d?.data?.type || 'function';
        return nodeConfig?.[type]?.color || nodeConfig?.function?.color;
      })?.attr("stroke", "var(--color-background)")?.attr("stroke-width", 2)?.style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))")?.on("mouseover", function(event, d) {
        d3?.select(this)?.transition()?.duration(200)?.attr("r", Math.max(18, (d?.data?.size || 20) / 2 + 3))?.style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.3))");
        
        // Highlight connected links
        links?.style("opacity", link => 
          link?.source === d || link?.target === d ? 1 : 0.2
        );
      })?.on("mouseout", function(event, d) {
        d3?.select(this)?.transition()?.duration(200)?.attr("r", Math.max(15, (d?.data?.size || 20) / 2))?.style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");
        
        links?.style("opacity", 0.6);
      })?.on("click", function(event, d) {
        setSelectedNode(d?.data);
      });

    // Add node labels
    nodes?.append("text")?.attr("dy", "0.35em")?.attr("x", d => d?.children ? -25 : 25)?.style("text-anchor", d => d?.children ? "end" : "start")?.style("font-size", "12px")?.style("font-weight", "500")?.style("fill", "var(--color-foreground)")?.style("pointer-events", "none")?.text(d => d?.data?.name || 'Unnamed');

    // Add type icons as text
    nodes?.append("text")?.attr("dy", "0.35em")?.attr("text-anchor", "middle")?.style("font-size", "10px")?.style("pointer-events", "none")?.style("fill", "white")?.text(d => {
        const type = d?.data?.type || 'function';
        return nodeConfig?.[type]?.icon || '⚡';
      });

    // Initial zoom to fit content
    const bounds = g?.node()?.getBBox();
    const fullWidth = width;
    const fullHeight = height;
    const widthScale = fullWidth / bounds?.width;
    const heightScale = fullHeight / bounds?.height;
    const scale = Math.min(widthScale, heightScale) * 0.8;
    
    const translate = [
      (fullWidth - bounds?.width * scale) / 2 - bounds?.x * scale,
      (fullHeight - bounds?.height * scale) / 2 - bounds?.y * scale
    ];

    svg?.call(zoom?.transform, d3?.zoomIdentity?.translate(translate?.[0], translate?.[1])?.scale(scale));

  }, [currentData, createHierarchy]);

  // Render visualization when data changes
  useEffect(() => {
    if (currentData && !isAnalyzing) {
      renderVisualization();
    }
  }, [currentData, isAnalyzing, renderVisualization]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (currentData && !isAnalyzing) {
        renderVisualization();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentData, isAnalyzing, renderVisualization]);

  const handleExport = (format) => {
    onExport({ format, data: currentData });
  };

  const handleZoomIn = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.scaleBy, 1.2
    );
  };

  const handleZoomOut = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.scaleBy, 0.8
    );
  };

  const handleResetZoom = () => {
    renderVisualization();
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Visualization Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center space-x-3">
          <Icon name="GitBranch" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="font-medium text-foreground">Kod Yapısı Haritası</h3>
            <p className="text-xs text-muted-foreground">
              İnteraktif AST görselleştirmesi
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ZoomIn"
            onClick={handleZoomIn}
            disabled={isAnalyzing}
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ZoomOut"
            onClick={handleZoomOut}
            disabled={isAnalyzing}
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={handleResetZoom}
            disabled={isAnalyzing}
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => handleExport('svg')}
            disabled={isAnalyzing || !currentData}
          >
            Dışa Aktar
          </Button>
        </div>
      </div>
      {/* Visualization Content */}
      <div className="flex-1 relative" ref={containerRef}>
        {isAnalyzing ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <Icon name="Loader2" size={32} color="var(--color-primary)" className="animate-spin" />
              <div className="text-center">
                <p className="text-foreground font-medium">Kod Analiz Ediliyor</p>
                <p className="text-sm text-muted-foreground">AST oluşturuluyor ve görselleştiriliyor...</p>
              </div>
            </div>
          </div>
        ) : !currentData ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Icon name="Code2" size={48} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-foreground font-medium">Görselleştirme Hazır</p>
                <p className="text-sm text-muted-foreground">
                  Kod analizi için sol panelden "Analiz Et" butonuna tıklayın
                </p>
              </div>
            </div>
          </div>
        ) : (
          <svg ref={svgRef} className="w-full h-full" />
        )}
      </div>
      {/* Legend and Stats */}
      {currentData && !isAnalyzing && (
        <div className="border-t border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            {/* Legend */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-medium text-muted-foreground">Gösterge:</span>
              {Object.entries(nodeConfig)?.map(([type, config]) => (
                <div key={type} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config?.color }}
                  />
                  <span className="text-xs text-muted-foreground">{config?.label}</span>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
              <span>Toplam: {currentData?.stats?.totalNodes || 0} düğüm</span>
              <span>Karmaşıklık: {currentData?.stats?.complexity || 0}</span>
            </div>
          </div>
        </div>
      )}
      {/* Selected Node Details */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">{selectedNode?.name}</h4>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={() => setSelectedNode(null)}
              className="w-6 h-6"
            />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tür:</span>
              <span className="text-foreground">
                {nodeConfig?.[selectedNode?.type]?.label || 'Bilinmeyen'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Satır:</span>
              <span className="text-foreground">{selectedNode?.line}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Karmaşıklık:</span>
              <span className="text-foreground">{selectedNode?.complexity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationPanel;