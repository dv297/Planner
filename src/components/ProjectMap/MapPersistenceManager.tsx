import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';
import { Edge, Node, useEdges, useNodes } from 'react-flow-renderer';
import { z } from 'zod';

import { ProjectMapEdgesSetListSchema } from '../../schemas/ProjectMapEdgesSetSchemas';
import { ProjectMapPositionDataListSchema } from '../../schemas/ProjectMapPositionSchemas';
import ProjectMapEdgesSetService from '../../services/ProjectMapEdgesSetService';
import ProjectMapPositionService from '../../services/ProjectMapPositionService';

interface MapPersistanceManagerProps {
  projectMapPositionId: string;
  projectMapEdgesSetId: string;
}

const MapPersistenceManager = (props: MapPersistanceManagerProps) => {
  const {
    projectMapPositionId: monitoredProjectMapPositionId,
    projectMapEdgesSetId: monitoredProjectMapEdgesSetId,
  } = props;
  const monitoredNodes = useNodes();
  const monitoredEdges = useEdges();

  const debouncedNodeMovementHandler = useMemo(
    () =>
      debounce((nodes: Node[], projectMapPositionId: string) => {
        const mappedEntries: z.infer<typeof ProjectMapPositionDataListSchema> =
          nodes.map((node) => {
            return {
              issueId: node.id,
              position: node.position,
            };
          });

        ProjectMapPositionService.updateProjectMapPosition(
          projectMapPositionId,
          mappedEntries
        );
      }, 1000),
    []
  );

  const debouncedEdgeHandler = useMemo(
    () =>
      debounce((edges: Edge[], projectMapEdgesSetId: string) => {
        const mappedEntries: z.infer<typeof ProjectMapEdgesSetListSchema> =
          edges.map((edge) => {
            return {
              id: edge.id,
              source: edge.source,
              target: edge.target,
            };
          });

        ProjectMapEdgesSetService.updateProjectMapEdgesSet(
          projectMapEdgesSetId,
          mappedEntries
        );
      }, 1000),
    []
  );

  useEffect(() => {
    debouncedNodeMovementHandler(monitoredNodes, monitoredProjectMapPositionId);
  }, [
    debouncedNodeMovementHandler,
    monitoredNodes,
    monitoredProjectMapPositionId,
  ]);

  useEffect(() => {
    debouncedEdgeHandler(monitoredEdges, monitoredProjectMapEdgesSetId);
  }, [debouncedEdgeHandler, monitoredEdges, monitoredProjectMapEdgesSetId]);

  return null;
};

export default MapPersistenceManager;
