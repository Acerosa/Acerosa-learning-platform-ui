import { useCallback, useEffect, useRef, useState } from "react";
import { useActivityDraftProtection } from "./activity-draft-protection";

export type PlacementMap = Record<string, string>;

function hasPlacements(value: PlacementMap | undefined): boolean {
  return Boolean(value && Object.keys(value).length);
}

function applyPlacement(current: PlacementMap, itemId: string, targetId: string): PlacementMap {
  const next = { ...current };
  const occupant = Object.keys(next).find((id) => next[id] === targetId);
  if (occupant) delete next[occupant];
  next[itemId] = targetId;
  return next;
}

export function usePlacement(initialPlacements: PlacementMap = {}) {
  const protection = useActivityDraftProtection();
  const [placements, setPlacements] = useState<PlacementMap>({ ...initialPlacements });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const hadPlacementsRef = useRef(hasPlacements(initialPlacements));

  useEffect(() => {
    if (protection.isDirty()) return;
    if (hasPlacements(initialPlacements)) {
      hadPlacementsRef.current = true;
      setPlacements({ ...initialPlacements });
      return;
    }
    if (hadPlacementsRef.current) {
      hadPlacementsRef.current = false;
      setPlacements({});
      setSelectedItemId(null);
    }
  }, [initialPlacements, protection]);

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
    const next = applyPlacement(placements, itemId, targetId);
    setPlacements(next);
    protection.recordResponse(next);
    setSelectedItemId(null);
  }, [occupantOf, placements, protection, selectedItemId]);

  const reset = useCallback(() => {
    setPlacements({});
    setSelectedItemId(null);
    protection.recordResponse({});
  }, [protection]);

  return { placements, selectedItemId, selectItem, selectTarget, occupantOf, reset };
}
