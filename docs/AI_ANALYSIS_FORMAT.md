# AI Analysis SGF Format

Kaya stores AI analysis data in SGF files using a custom property `KA` (Kaya Analysis). This allows analysis results (win rate, score lead, variations) to be persisted and shared while maintaining compatibility with other SGF editors (which will simply ignore the property).

## Format Specification

- **Property**: `KA`
- **Value**: A compressed JSON string containing the analysis data.
- **Location**: The property is attached to the node for which the analysis was performed.

### JSON Structure

To minimize file size, the JSON keys are shortened:

```typescript
interface KayaAnalysisData {
  /** Win Rate (0.0 to 1.0) */
  w: number;

  /** Score Lead (points, + for Black, - for White) */
  s: number;

  /** Visits (total simulations) - Optional */
  v?: number;

  /** Moves (Suggestions) */
  m: Array<{
    /**
     * Move coordinate (e.g., "Q16"), rows numbered on a square of the board's
     * longer side (row = side - y): on SZ[13:9] the bottom row is 5.
     */
    m: string;

    /**
     * Probability (Policy) - 0.0 to 1.0. The network's prior, also for a
     * searched move: the search's own say is `v`. Files saved before
     * 2026-11-20 hold the visit share here for a move with visits.
     */
    p: number;

    /** Win Rate for this move (Optional) */
    w?: number;

    /** Score Lead for this move (Optional) */
    s?: number;

    /** Visits for this move (Optional). 0: the search never tried it, and w/s are absent */
    v?: number;
  }>;

  /** Ownership (Optional: Compressed string), indexed y * side + x on that square */
  o?: string;

  /**
   * Engine version that computed the values (`ANALYSIS_ENGINE_VERSION`).
   * Absent: 1, every KA saved before 0.4.19.
   */
  e?: number;
}
```

### Example

```sgf
(;GM[1]FF[4]CA[UTF-8]AP[Kaya:0.1.0]KM[7.5]SZ[19]
;B[pd]KA[{"w":0.55,"s":1.5,"v":1000,"m":[{"m":"D4","p":0.54},{"m":"Q4","p":0.45}\],"e":2}]
;W[dp]KA[{"w":0.54,"s":1.4,"v":1200,"m":[{"m":"Q4","p":0.6}\],"e":2}]
)
```

## Configuration

This feature can be enabled/disabled in the AI Settings:

- **Option**: `saveAnalysisToSgf`
- **Default**: `true`

## Implementation Details

- **Serialization**: When saving an SGF, Kaya traverses the game tree. For each node, it rebuilds the analysis position through the position cache (`analysisCacheKeyAt`), the way live and full-game analysis build theirs, and looks up the result in the `analysisCache`. If found, the `KA` property is injected into the node.
- **Deserialization**: When loading an SGF, Kaya builds the game tree, rebuilds the position of each node carrying `KA` the same way, and populates the `analysisCache` under that key. This allows instant access to analysis results without re-running the engine.
- **Older values**: a saved result is what the engine said when it ran. `e` records which engine version that was, and `ANALYSIS_ENGINE_VERSION` is bumped when a change to the network inputs or the search makes earlier results wrong. Analysis from another version loads and shows in the graph and the report, but never answers a request: live analysis of its position and "Analyse full game" run it again and replace it. Until then, saving the game writes it back with its own `e`, so it is never passed off as current. Version 2 (0.4.19) added KataGo's komi parity input: analysis saved before it (no `e`) shows older win rates for a half-integer komi (7.5, 6.5), most visibly on 9x9.
