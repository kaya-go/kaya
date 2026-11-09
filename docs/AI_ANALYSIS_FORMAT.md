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
    /** Move coordinate (e.g., "Q16") */
    m: string;

    /** Probability (Policy) - 0.0 to 1.0 */
    p: number;

    /** Win Rate for this move (Optional) */
    w?: number;

    /** Score Lead for this move (Optional) */
    s?: number;

    /** Visits for this move (Optional). 0: the search never tried it, and w/s are absent */
    v?: number;
  }>;

  /** Ownership (Optional: Compressed string) */
  o?: string;
}
```

### Example

```sgf
(;GM[1]FF[4]CA[UTF-8]AP[Kaya:0.1.0]KM[7.5]SZ[19]
;B[pd]KA[{"w":0.55,"s":1.5,"v":1000,"m":[{"m":"dp","p":0.54},{"m":"pp","p":0.45}]}]
;W[dp]KA[{"w":0.54,"s":1.4,"v":1200,"m":[{"m":"pp","p":0.6}]}]
)
```

## Configuration

This feature can be enabled/disabled in the AI Settings:

- **Option**: `saveAnalysisToSgf`
- **Default**: `true`

## Implementation Details

- **Serialization**: When saving an SGF, Kaya traverses the game tree. For each node, it reconstructs the board state, generates a cache key, and looks up analysis results in the `analysisCache`. If found, the `KA` property is injected into the node.
- **Deserialization**: When loading an SGF, Kaya parses the `KA` properties, reconstructs the board state for each node to generate cache keys, and populates the `analysisCache`. This allows instant access to analysis results without re-running the engine.
