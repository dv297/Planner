import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';
import { Edge, Node, useEdges, useNodes } from 'react-flow-renderer';

const MapPersistenceManager = () => {
  const monitoredNodes = useNodes();
  const monitoredEdges = useEdges();

  const debouncedNodeMovementHandler = useMemo(
    () =>
      debounce((nodes: Node[]) => {
        console.log(nodes);
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
    debouncedNodeMovementHandler(monitoredNodes);
  }, [debouncedNodeMovementHandler, monitoredNodes]);

  useEffect(() => {
    debouncedEdgeHandler(monitoredEdges);
  }, [debouncedEdgeHandler, monitoredEdges]);

  return null;
};

export default MapPersistenceManager;
