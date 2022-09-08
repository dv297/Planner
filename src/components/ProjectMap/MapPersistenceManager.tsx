import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';
import { Edge, Node, useEdges, useNodes } from 'react-flow-renderer';
import { z } from 'zod';

import { ProjectMapPositionDataListSchema } from '../../schemas/ProjectMapPositionSchemas';
import ProjectMapPositionService from '../../services/ProjectMapPositionService';

interface MapPersistanceManagerProps {
  projectMapPositionId: string;
}

const MapPersistenceManager = (props: MapPersistanceManagerProps) => {
  const { projectMapPositionId: monitoredProjectMapPositionId } = props;
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
      debounce((edges: Edge[]) => {
        console.log(edges);
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
    debouncedEdgeHandler(monitoredEdges);
  }, [debouncedEdgeHandler, monitoredEdges]);

  return null;
};

export default MapPersistenceManager;
