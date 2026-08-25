export type PlacementMap = Record<string, string>;
export declare function usePlacement(): {
    placements: PlacementMap;
    selectedItemId: string | null;
    selectItem: (itemId: string) => void;
    selectTarget: (targetId: string) => void;
    occupantOf: (targetId: string, current?: PlacementMap) => string | null;
    reset: () => void;
};
