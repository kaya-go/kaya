# Kaya User Guide

## Getting Started

### Running the Application

**Desktop (macOS/Linux/Windows):**

Download from [GitHub Releases](https://github.com/kaya-go/kaya/releases) or build from source:

```bash
bun run dev
```

**Web (Browser):**

Visit [kayago.app](https://kayago.app) or run locally:

```bash
bun run dev:web
# Open http://localhost:3000
```

## Features

### 1. Playing a Game

**Starting a New Game:**

1. Click **📄 New** button in the toolbar
2. Confirm the dialog (unsaved changes will be lost)
3. An empty 19×19 board appears

**Playing Moves:**

- Click any intersection on the board to place a stone
- Stones automatically alternate: Black (first), White, Black...
- Invalid moves (ko, suicide) are silently ignored
- Captures trigger a sound effect

### 2. Working with SGF Files

#### Opening Files

**Drag & Drop** (Recommended):

- Drag any `.sgf` file and drop it in the Kaya window

**File Picker**:

1. Click **📂 Open** button
2. Select an `.sgf` file

**Paste OGS URL**:

1. Copy an Online-Go.com game URL (e.g., `https://online-go.com/game/81344851`)
2. Paste it anywhere in the Kaya window (Ctrl+V / Cmd+V)
3. The SGF is automatically downloaded and loaded

#### Saving Files

1. Click **💾 Save** button
2. File downloads with the current filename or `game.sgf`

### 3. Library Panel

The Library Panel organizes your game files:

**Adding Files:**

- Drag & drop SGF files into the Library panel
- Files are stored in your browser's local storage

**Organizing:**

- Create folders to organize games
- Drag files between folders
- Right-click for context menu: Rename, Duplicate, Delete

**Loading:**

- Click any file to load it
- The currently loaded file is highlighted

### 4. Navigation

#### Keyboard Shortcuts

| Key         | Action             |
| ----------- | ------------------ |
| `←`         | Previous move      |
| `→`         | Next move          |
| `Home`      | Go to start        |
| `End`       | Go to last move    |
| `↑`         | Previous variation |
| `↓`         | Next variation     |
| `Shift+←/→` | Jump 10 moves      |

#### Navigation Controls

Located at the bottom of the board:

- **⏮️** First move
- **◀️** Previous move
- **Move counter** Shows current position
- **▶️** Next move
- **⏭️** Last move

#### Next Move Preview

Toggle the **👁️** icon in the toolbar to show a ghost stone indicating the next move. Useful for reviewing games without spoilers.

### 5. Sidebar Panels

The left sidebar contains collapsible panels:

**Game Tree** - Visual tree navigation with variations

**Game Info** - Player names, komi, result, analyzed positions count

**Comment** - Shows SGF comments for the current position

**Analysis** - AI analysis graph showing win rate over the game

Click panel headers to expand/collapse.

### 6. Variations

**Creating Variations:**

1. Navigate to any position
2. Click a different intersection than the existing next move
3. A new variation is created

**Navigating Variations:**

- Use ↑/↓ arrow keys to switch between variations
- Click nodes in the Game Tree panel
- Variation buttons appear in the navigation bar when branches exist

### 7. AI Analysis

**Enabling Analysis:**

1. Click the **🧠** button in the toolbar
2. First time: The AI model downloads (~13MB)
3. Move suggestions appear on the board

**Live Analysis:**

- **Win Rate**: Probability of Black/White winning
- **Score Lead**: Estimated point advantage
- **Move Suggestions**: Colored circles showing best moves

**Move Color Guide:**

- 🟢 **Green**: Best move (≥ 70%)
- 🟦 **Blue**: Great move (60-70%)
- 🟩 **Light Green**: Good move (40-60%)
- 🟨 **Yellow**: Okay move (10-40%)
- 🟥 **Red**: Poor move (< 10%)

**Full Game Analysis:**

1. Click the **▶️ Run** button in the Analysis panel
2. Progress shows completed/total positions with ETA
3. Click **■ Stop** to abort
4. Results are saved and restored on page reload

**Ownership Heatmap:**

Toggle with the heatmap button to see territory control visualization.

**Analysis Graph:**

The Analysis panel shows a win rate graph across all analyzed positions. Click any point to navigate to that position.

### 8. Score Estimation

**Activating:**

1. Click the **Ⓢ** button in the toolbar
2. The panel switches to Score Estimation mode

**Marking Dead Stones:**

- Click stones to toggle dead/alive status
- Dead stones show an **×** overlay
- Score updates automatically

**Score Display:**

- Territory + Captures + Dead stones
- Komi included for White
- Winner and margin shown

### 9. Edit Mode

Edit mode allows you to modify the board position and add annotations.

**Activating:**

1. Click the **✏️** button in the toolbar, or press `E`
2. The edit toolbar appears with available tools

**Stone Placement:**

- **Black Stone** - Place black stones (doesn't follow game rules)
- **White Stone** - Place white stones
- Click an existing stone to remove it

**Markers:**

Add visual markers to highlight positions:

- **Circle** - Mark with a circle
- **Cross** - Mark with an X
- **Triangle** - Mark with a triangle
- **Square** - Mark with a square

**Drag-to-Paint:** Hold and drag to paint multiple markers at once. Click a marked intersection again to remove the marker.

**Labels:**

- **Letter Labels** - Add A, B, C... labels to positions
- **Number Labels** - Add 1, 2, 3... labels to positions

**Hotspot:**

Mark the current position as a hotspot (important position). Hotspots are highlighted in the game tree.

### 10. Appearance Settings

**Theme:**
Click the sun/moon icon in the header to toggle dark/light mode. Theme persists across sessions.

**Board Theme:**
Open Settings (⚙️ or `Cmd/Ctrl+,`) and go to the **Board** tab to choose from multiple board and stone styles:

- **Hikaru** (Default) - Clean SVG stones with modern look
- **Shell-Slate** - Traditional Japanese clamshell and slate stones
- **Yunzi** - Chinese Yunzi biconvex stones
- **Happy Stones** - Playful, friendly stone design
- **Kifu** - Minimalist black and white style
- **BadukTV** - Broadcast-style appearance

**Board Coordinates:**
Toggle coordinates display in Settings > Board or via the toolbar toggle. Useful for cleaner screenshots or personal preference.

**Board Controls:**
The captures display and navigation buttons below the board can be collapsed via Settings > Board if you prefer a more minimalist view.

### 11. Gamepad Support

Connect a gamepad for controller navigation:

- **D-pad**: Navigate moves
- **A/B**: Place stone
- **Shoulders**: Switch variations
- **Triggers**: Jump to start/end

Supports standard gamepads and 8BitDo Lite 2.

## Keyboard Reference

All keyboard shortcuts can be customized in Settings > Shortcuts.

### Navigation

| Key    | Action             |
| ------ | ------------------ |
| `←`    | Previous move      |
| `→`    | Next move          |
| `↑`    | Previous variation |
| `↓`    | Next variation     |
| `Home` | First move         |
| `End`  | Last move          |

### Board Modes

| Key | Action                 |
| --- | ---------------------- |
| `E` | Toggle edit mode       |
| `N` | Toggle navigation mode |
| `S` | Toggle score mode      |
| `A` | Toggle AI analysis     |
| `M` | Toggle sound           |

### AI Analysis

| Key | Action           |
| --- | ---------------- |
| `G` | Suggest move     |
| `T` | Toggle top moves |
| `O` | Toggle ownership |

### View

| Key          | Action            |
| ------------ | ----------------- |
| `F`          | Toggle fullscreen |
| `Cmd/Ctrl+B` | Toggle sidebar    |
| `Cmd/Ctrl+L` | Toggle library    |
| `Cmd/Ctrl+,` | Open settings     |

### File

| Key          | Action    |
| ------------ | --------- |
| `Cmd/Ctrl+S` | Save      |
| `Cmd/Ctrl+V` | Paste SGF |

### Edit

| Key          | Action |
| ------------ | ------ |
| `Cmd/Ctrl+Z` | Undo   |
| `Cmd/Ctrl+Y` | Redo   |

### Customizing Shortcuts

1. Open Settings with **⚙️** or `Cmd/Ctrl+,`
2. Go to the **Shortcuts** tab
3. Click on any shortcut to record a new key binding
4. Conflicts are detected and highlighted
5. Click **Reset** to restore default bindings

## Troubleshooting

### File won't open

- Verify the file has `.sgf` extension
- Check that it's valid SGF format
- Try opening in a text editor to verify syntax

### AI Analysis not working

- Ensure you have a stable internet connection (model download)
- Try WebGL backend if WebGPU fails
- Check browser console for errors

### Performance issues

- Large games (300+ moves) are optimized
- Close other browser tabs
- Try disabling AI analysis

---

**Enjoy playing Go with Kaya!** 🎋
