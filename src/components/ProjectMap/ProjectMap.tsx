import { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeChange,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import { z } from 'zod';

import type { IssueNodeData } from '@src/components/ProjectMap/IssueNode';
import IssueNode from '@src/components/ProjectMap/IssueNode';
import MapPersistenceManager from '@src/components/ProjectMap/MapPersistenceManager';
import ProjectMapControls from '@src/components/ProjectMap/ProjectMapControls';
import { IssueSchema, IssuesListSchema } from '@src/schemas/IssueSchema';
import { ProjectMapEdgesSetSchema } from '@src/schemas/ProjectMapEdgesSetSchemas';
import { ProjectMapPositionSchema } from '@src/schemas/ProjectMapPositionSchemas';
import { Position } from '@src/styles/ProjectMapPositionDataEntry';
import IssueStatusType from '@src/types/IssueStatusType';

const nodeTypes = {
  issue: IssueNode,
};

interface IssueMapProp {
  initialNodes: Node[];
  initialEdges: Edge[];
  projectMapPositionId: string;
  projectMapEdgesSetId: string;
}

const IssuesMap = (props: IssueMapProp) => {
  const {
    initialNodes,
    projectMapPositionId,
    initialEdges,
    projectMapEdgesSetId,
  } = props;

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        const parsedChanges = changes.reduce((res, change) => {
          const validChange =
            change.type !== 'remove' ||
            (change.type === 'remove' &&
              nodes.find((n) => n.id === change.id)?.data.deletable); // Could support deletable nodes in the future
          if (validChange) {
            res.push(change);
          }

          return res;
        }, [] as NodeChange[]);

        return applyNodeChanges(parsedChanges, nds);
      }),
    [setNodes, nodes]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection }, eds)),
    [setEdges]
  );

  const onEdgesDelete = useCallback(
    (nodeId) =>
      setEdges((updatedEdges) =>
        applyEdgeChanges(
          [
            { id: nodeId, type: 'remove' },
            { id: nodeId, type: 'select', selected: false },
          ],
          updatedEdges
        )
      ),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onEdgesDelete={onEdgesDelete}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
      <MapPersistenceManager
        projectMapPositionId={projectMapPositionId}
        projectMapEdgesSetId={projectMapEdgesSetId}
      />
      <ProjectMapControls />
    </ReactFlow>
  );
};

interface ProjectMapProps {
  issues: z.infer<typeof IssuesListSchema>;
  positions: z.infer<typeof ProjectMapPositionSchema>;
  edgesSet: z.infer<typeof ProjectMapEdgesSetSchema>;
}

const ProjectMap = (props: ProjectMapProps) => {
  const { issues, positions, edgesSet } = props;

  const issuesMap = issues.reduce((acc, issue) => {
    acc[issue.id] = issue;
    return acc;
  }, {} as Record<string, z.infer<typeof IssueSchema>>);

  const positionDataMap = positions.data.positions.reduce((acc, entry) => {
    acc.set(entry.issueId, entry.position);
    return acc;
  }, new Map<string, Position>());

  const initialNodes: Node<IssueNodeData>[] = issues.map((issue) => {
    return {
      id: issue.id,
      data: issue,
      position: positionDataMap.get(issue.id) ?? { x: -500, y: -500 },
      type: 'issue',
    };
  });

  const initialEdges: Edge[] = edgesSet.data.edges.map((edge) => {
    return {
      ...edge,
      animated: issuesMap[edge.source].issueStatus !== IssueStatusType.PLANNING,
    };
  });

  return (
    <IssuesMap
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      projectMapPositionId={positions.id}
      projectMapEdgesSetId={edgesSet.id}
    />
  );
};

export default ProjectMap;
