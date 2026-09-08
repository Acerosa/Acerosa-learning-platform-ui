import { useCallback, useEffect, useState } from "react";

export type PlacementMap = Record<string, string>;

function hasPlacements(value: PlacementMap | undefined): boolean {
  return Boolean(value && Object.keys(value).length);
}

export function usePlacement(initialPlacements: PlacementMap = {}) {
  const [placements, setPlacements] = useState<PlacementMap>({ ...initialPlacements });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPlacements(initialPlacements)) return;
    setPlacements({ ...initialPlacements });
  }, [initialPlacements]);

  const occupantOf = useCallback((targetId: string, current: PlacementMap = placements) => {
    return Object.keys(current).find((itemId) => current[itemId] === targetId) || null;
  }, [placements]);

  const selectItem = useCallback((itemId: string) => {
    setSelectedItemId((current) => (current === itemId ? null : itemId));
  }, []);

  const selectTarget = useCallback((targetId: string) => {
    if (!selectedItemId) {
      const occupant = occupantOf(targetId);
      if (occupant) setSelectedItemId(occupant);
      return;
    }
    const itemId = selectedItemId;
    setPlacements((current) => {
      const next = { ...current };
      const occupant = Object.keys(next).find((id) => next[id] === targetId);
      if (occupant) delete next[occupant];
      next[itemId] = targetId;
      return next;
    });
    setSelectedItemId(null);
  }, [occupantOf, selectedItemId]);

  const reset = useCallback(() => {
    setPlacements({});
    setSelectedItemId(null);
  }, []);

  return { placements, selectedItemId, selectItem, selectTarget, occupantOf, reset };
}
