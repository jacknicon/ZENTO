import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, ZoomIn, ZoomOut, RefreshCw, Layers } from 'lucide-react';
import cytoscape from 'cytoscape';
import type { Course, ManualEdge, PlanItem } from '../types/syllabus';

interface NetworkGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  plan: PlanItem[];
  manualEdges: ManualEdge[];
}

export const NetworkGraphModal: React.FC<NetworkGraphModalProps> = ({
  isOpen,
  onClose,
  courses,
  plan,
  manualEdges,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  const [displayMode, setDisplayMode] = useState<'all' | 'default' | 'planned'>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [layoutName, setLayoutName] = useState<string>('cose');

  const [hoveredInfo, setHoveredInfo] = useState<{
    title: string;
    subText: string;
    isLocked: boolean;
  } | null>(null);

  const isLockedRef = useRef(false);
  const lockedTargetIdRef = useRef<string | null>(null);

  const displayModeOptions = [
    { label: '全科目 (全279科目)', value: 'all' },
    { label: '履修・前提・後継科目', value: 'default' },
    { label: '履修登録科目のみ', value: 'planned' },
  ];

  const domainOptions = [
    { label: '全分野 (すべて)', value: 'all' },
    { label: '導入', value: '導入' },
    { label: '数理', value: '数理' },
    { label: '情報', value: '情報' },
    { label: '文化・思想', value: '文化' },
    { label: '社会・ネットワーク', value: '社会' },
    { label: '経済・マーケット', value: '経済' },
    { label: 'デジタル産業', value: 'デジタル産業' },
    { label: '社会接続', value: '社会接続' },
    { label: '卒業プロジェクト', value: '卒業' },
    { label: '自由', value: '自由' },
  ];

  const layoutOptions = [
    { label: 'Cose (力学モデル)', value: 'cose' },
    { label: 'Breadthfirst (階層構造)', value: 'breadthfirst' },
    { label: 'Circle (円状配置)', value: 'circle' },
    { label: 'Concentric (同心円状)', value: 'concentric' },
    { label: 'Grid (格子配置)', value: 'grid' },
  ];

  const plannedNames = useMemo(() => new Set(plan.map((p) => p.subjectName)), [plan]);

  const coursesMap = useMemo(() => {
    const map = new Map<string, Course>();
    courses.forEach((c) => map.set(c.科目名, c));
    return map;
  }, [courses]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    isLockedRef.current = false;
    lockedTargetIdRef.current = null;
    setHoveredInfo(null);

    // 1. Determine active node names based on displayMode
    let targetCourseNames = new Set<string>();

    if (displayMode === 'all') {
      courses.forEach((c) => targetCourseNames.add(c.科目名));
    } else if (displayMode === 'planned') {
      courses.forEach((c) => {
        if (plannedNames.has(c.科目名)) {
          targetCourseNames.add(c.科目名);
        }
      });
    } else {
      // 'default': Planned courses + their prerequisites & successors
      plannedNames.forEach((name) => targetCourseNames.add(name));

      courses.forEach((c) => {
        const isPlanned = plannedNames.has(c.科目名);
        let isRelated = isPlanned;

        if (!isRelated) {
          // Check if c is prerequisite or successor of any planned course
          const prereqs = [...(c.前提必須科目 || []), ...(c.前提推奨科目 || [])];
          if (prereqs.some((p) => plannedNames.has(p))) {
            isRelated = true;
          }
          const succs = c.後継推奨科目 || [];
          if (succs.some((s) => plannedNames.has(s))) {
            isRelated = true;
          }

          // Check if any planned course has c as prerequisite or successor
          if (!isRelated) {
            courses.forEach((other) => {
              if (plannedNames.has(other.科目名)) {
                const otherPrereqs = [...(other.前提必須科目 || []), ...(other.前提推奨科目 || [])];
                if (otherPrereqs.includes(c.科目名)) isRelated = true;
                if (other.後継推奨科目?.includes(c.科目名)) isRelated = true;
              }
            });
          }
        }

        if (isRelated) {
          targetCourseNames.add(c.科目名);
        }
      });
    }

    // 2. Filter targetCourseNames by selectedDomain if not 'all'
    if (selectedDomain !== 'all') {
      const filtered = new Set<string>();
      targetCourseNames.forEach((name) => {
        const c = coursesMap.get(name);
        if (c) {
          const domainStr = [c.学問分野名, c.科目分類, c.科目区分].filter(Boolean).join(' ');
          if (domainStr.includes(selectedDomain)) {
            filtered.add(name);
          }
        }
      });
      targetCourseNames = filtered;
    }

    // 3. Build Cytoscape elements
    const elements: cytoscape.ElementDefinition[] = [];
    const addedNodes = new Set<string>();

    courses.forEach((c) => {
      if (targetCourseNames.has(c.科目名)) {
        elements.push({
          data: {
            id: c.科目名,
            label: c.科目名,
            isPlanned: plannedNames.has(c.科目名),
            isRequired: c.科目属性 === '必修',
            domain: c.学問分野名 || '教養',
          },
        });
        addedNodes.add(c.科目名);
      }
    });

    // 4. Build edges
    courses.forEach((c) => {
      if (!addedNodes.has(c.科目名)) return;

      // 前提必須科目
      (c.前提必須科目 || []).forEach((reqRaw) => {
        if (!reqRaw || reqRaw === 'なし') return;
        const reqList = reqRaw.includes('、') ? reqRaw.split('、') : reqRaw.includes(',') ? reqRaw.split(',') : [reqRaw];
        reqList.forEach((reqItem) => {
          const req = reqItem.trim();
          if (req && req !== 'なし' && addedNodes.has(req)) {
            elements.push({
              data: {
                id: `edge-must-${req}-${c.科目名}`,
                source: req,
                target: c.科目名,
                type: 'prereq_must',
              },
            });
          }
        });
      });

      // 前提推奨科目
      (c.前提推奨科目 || []).forEach((reqRaw) => {
        if (!reqRaw || reqRaw === 'なし') return;
        const reqList = reqRaw.includes('、') ? reqRaw.split('、') : reqRaw.includes(',') ? reqRaw.split(',') : [reqRaw];
        reqList.forEach((reqItem) => {
          const req = reqItem.trim();
          if (req && req !== 'なし' && addedNodes.has(req)) {
            elements.push({
              data: {
                id: `edge-rec-${req}-${c.科目名}`,
                source: req,
                target: c.科目名,
                type: 'prereq_rec',
              },
            });
          }
        });
      });

      // 後継推奨科目
      (c.後継推奨科目 || []).forEach((succRaw) => {
        if (!succRaw || succRaw === 'なし') return;
        const succList = succRaw.includes('、') ? succRaw.split('、') : succRaw.includes(',') ? succRaw.split(',') : [succRaw];
        succList.forEach((succItem) => {
          const succ = succItem.trim();
          if (succ && succ !== 'なし' && addedNodes.has(succ)) {
            elements.push({
              data: {
                id: `edge-succ-${c.科目名}-${succ}`,
                source: c.科目名,
                target: succ,
                type: 'succ_rec',
              },
            });
          }
        });
      });
    });

    // Manual edges
    manualEdges.forEach((mEdge, idx) => {
      if (addedNodes.has(mEdge.source) && addedNodes.has(mEdge.target)) {
        elements.push({
          data: {
            id: `manual-edge-${idx}`,
            source: mEdge.source,
            target: mEdge.target,
            type: 'manual',
          },
        });
      }
    });

    // 5. Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'font-size': '11px',
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': '#ffffff',
            'border-width': 2,
            'border-color': '#64748b',
            width: 'label',
            height: 'label',
            padding: '8px',
            color: '#0f172a',
            'font-weight': 'bold',
            shape: 'round-rectangle',
          },
        },
        {
          selector: 'node[?isPlanned]',
          style: {
            'background-color': '#e0e7ff',
            'border-color': '#4f46e5',
            'border-width': 2.5,
            color: '#3730a3',
          },
        },
        {
          selector: 'node[?isRequired]',
          style: {
            'border-color': '#ef4444',
            'border-width': 2.5,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#94a3b8',
            'target-arrow-color': '#94a3b8',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
        {
          selector: 'edge[type = "prereq_must"]',
          style: {
            width: 2.5,
            'line-color': '#4f46e5',
            'target-arrow-color': '#4f46e5',
          },
        },
        {
          selector: 'edge[type = "prereq_rec"]',
          style: {
            width: 1.5,
            'line-style': 'dashed',
            'line-color': '#818cf8',
            'target-arrow-color': '#818cf8',
          },
        },
        {
          selector: 'edge[type = "succ_rec"]',
          style: {
            width: 1.5,
            'line-style': 'dashed',
            'line-color': '#a855f7',
            'target-arrow-color': '#a855f7',
          },
        },
        {
          selector: 'edge[type = "manual"]',
          style: {
            width: 1,
            'line-style': 'dotted',
            'line-color': '#cbd5e1',
            'target-arrow-color': '#94a3b8',
          },
        },
        {
          selector: '.dimmed',
          style: {
            opacity: 0.15,
          },
        },
        {
          selector: 'node.highlighted',
          style: {
            opacity: 1,
            'border-width': 3,
            'border-color': '#4f46e5',
            'background-color': '#c7d2fe',
            'font-size': '12px',
            color: '#1e1b4b',
            'z-index': 999,
          },
        },
        {
          selector: 'edge.highlighted',
          style: {
            opacity: 1,
            width: 3.5,
            'line-color': '#4f46e5',
            'target-arrow-color': '#4f46e5',
            'z-index': 999,
          },
        },
      ],
      layout: {
        name: layoutName,
        animate: false,
        refresh: 20,
        fit: true,
        padding: 50,
        nodeOverlap: 20,
        componentSpacing: 80,
        nodeRepulsion: () => 400000,
        edgeElasticity: () => 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
      } as any,
    });

    const applyNodeHighlight = (node: cytoscape.NodeSingular, isLocked: boolean) => {
      const neighborhood = node.neighborhood().add(node);
      cy.elements().removeClass('highlighted dimmed');
      cy.elements().not(neighborhood).addClass('dimmed');
      neighborhood.addClass('highlighted');

      setHoveredInfo({
        title: node.data('label'),
        subText: `接続科目数: ${node.degree()}件 ${isLocked ? '📌 [固定中]' : '(クリックで固定)'}`,
        isLocked,
      });
    };

    const applyEdgeHighlight = (edge: cytoscape.EdgeSingular, isLocked: boolean) => {
      const sourceNode = edge.source();
      const targetNode = edge.target();
      const edgeGroup = edge.add(sourceNode).add(targetNode);

      cy.elements().removeClass('highlighted dimmed');
      cy.elements().not(edgeGroup).addClass('dimmed');
      edgeGroup.addClass('highlighted');

      setHoveredInfo({
        title: `【${sourceNode.data('label')}】 ➔ 【${targetNode.data('label')}】`,
        subText: `関連接続 ${isLocked ? '📌 [固定中]' : '(クリックで固定)'}`,
        isLocked,
      });
    };

    const clearHighlight = () => {
      if (isLockedRef.current) return;
      cy.elements().removeClass('highlighted dimmed');
      setHoveredInfo(null);
    };

    cy.on('mouseover', 'node', (evt) => {
      if (isLockedRef.current) return;
      applyNodeHighlight(evt.target, false);
    });

    cy.on('mouseout', 'node', () => {
      clearHighlight();
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (isLockedRef.current && lockedTargetIdRef.current === node.id()) {
        isLockedRef.current = false;
        lockedTargetIdRef.current = null;
        cy.elements().removeClass('highlighted dimmed');
        setHoveredInfo(null);
      } else {
        isLockedRef.current = true;
        lockedTargetIdRef.current = node.id();
        applyNodeHighlight(node, true);
      }
    });

    cy.on('mouseover', 'edge', (evt) => {
      if (isLockedRef.current) return;
      applyEdgeHighlight(evt.target, false);
    });

    cy.on('mouseout', 'edge', () => {
      clearHighlight();
    });

    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target;
      if (isLockedRef.current && lockedTargetIdRef.current === edge.id()) {
        isLockedRef.current = false;
        lockedTargetIdRef.current = null;
        cy.elements().removeClass('highlighted dimmed');
        setHoveredInfo(null);
      } else {
        isLockedRef.current = true;
        lockedTargetIdRef.current = edge.id();
        applyEdgeHighlight(edge, true);
      }
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        isLockedRef.current = false;
        lockedTargetIdRef.current = null;
        cy.elements().removeClass('highlighted dimmed');
        setHoveredInfo(null);
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [isOpen, courses, plan, manualEdges, displayMode, selectedDomain, layoutName, plannedNames, coursesMap]);

  if (!isOpen) return null;

  return (
    <div
      className="flex-center"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 110,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex-col"
        style={{
          width: '1180px',
          maxWidth: '96vw',
          height: '88vh',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
        }}
      >
        <div
          className="flex-between"
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #e2e8f0',
            background: '#0f172a',
            color: '#ffffff',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Layers size={18} color="#818cf8" />
              ネットワーク関係図 (全科目・力学/構造表示)
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              ノードやエッジをホバー/クリックでハイライト固定表示。表示モードで「全科目」を選択すると大学の全279科目が表示されます。
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value as any)}
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.76rem',
                fontWeight: 700,
              }}
            >
              {displayModeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.76rem',
                fontWeight: 600,
              }}
            >
              {domainOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.76rem',
                fontWeight: 600,
              }}
            >
              {layoutOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
              className="btn-zento btn-secondary"
              style={{ padding: '5px 8px' }}
              title="拡大"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.2)}
              className="btn-zento btn-secondary"
              style={{ padding: '5px 8px' }}
              title="縮小"
            >
              <ZoomOut size={15} />
            </button>
            <button
              onClick={() => cyRef.current?.fit()}
              className="btn-zento btn-secondary"
              style={{ padding: '5px 8px' }}
              title="全ノードに合わせる"
            >
              <RefreshCw size={15} />
            </button>

            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: '#334155',
                color: '#ffffff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '4px',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {hoveredInfo && (
          <div
            style={{
              background: hoveredInfo.isLocked ? '#e0e7ff' : '#f1f5f9',
              padding: '6px 20px',
              fontSize: '0.76rem',
              fontWeight: 700,
              color: hoveredInfo.isLocked ? '#3730a3' : '#475569',
              borderBottom: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>🎯 選択中: {hoveredInfo.title} ({hoveredInfo.subText})</span>
            {hoveredInfo.isLocked && (
              <button
                onClick={() => {
                  isLockedRef.current = false;
                  lockedTargetIdRef.current = null;
                  cyRef.current?.elements().removeClass('highlighted dimmed');
                  setHoveredInfo(null);
                }}
                style={{
                  border: '1px solid #818cf8',
                  background: '#ffffff',
                  color: '#4338ca',
                  borderRadius: '12px',
                  padding: '1px 8px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                🔓 固定解除
              </button>
            )}
          </div>
        )}

        <div ref={containerRef} style={{ flex: 1, background: '#f8fafc', width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

