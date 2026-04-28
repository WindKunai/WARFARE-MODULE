# Kingdoms & Warfare Module - HTML Templates Complete ✅

## What's Been Created

### 1. **Unit Sheet Template** (`templates/unit-sheet.hbs`)
   - Displays unit stats (ATK, DEF, POW, TOU, MOR, COM)
   - Unit type and tier selection dropdowns
   - Roll buttons for Attack, Power, Morale, and Command tests
   - Commander assignment field
   - Unit size and casualties tracking
   - Disorganized status toggle
   - Traits list with add/remove functionality
   - Notes field for additional details

### 2. **Commander/Domain Sheet Template** (`templates/commander-sheet.hbs`)
   - Commander name and title fields
   - Power Pool tracking display (visual circle with current/max)
   - Power Die selector (d4-d12)
   - Domain skills (Diplomacy, Espionage, Lore, Operations) with inline roll buttons
   - Domain defenses (Size, Communications, Resolve, Resources)
   - Officer Reactions tracking (4 pips for reaction uses)
   - Domain Powers list with add/remove functionality
   - Commanded Units table (drag & drop support)
   - Notes field for commander details

### 3. **Combat Tracker Template** (`templates/combat-tracker.hbs`)
   - Shows combatants with initiative order
   - Displays Power Pool badges for commanders
   - Warfare-specific combatant controls
   - Unit count/stat badges for easy reference at a glance

### 4. **Updated Components**
   - Added `eq` Handlebars helper to main.js (needed for templates)
   - Updated module.json with template configuration
   - Organized proper directory structure:
     - `scripts/main.js`
     - `styles/warfare.css`
     - `lang/en.json`
     - `templates/` (all sheet templates)

## Directory Structure
```
kingdoms-warfare/
├── scripts/
│   └── main.js              (Module core logic + hooks)
├── styles/
│   └── warfare.css          (Theme styling - medieval fantasy)
├── lang/
│   └── en.json              (Language strings)
├── templates/
│   ├── unit-sheet.hbs       (Warfare Unit item sheet)
│   ├── commander-sheet.hbs  (Commander actor sheet)
│   └── combat-tracker.hbs   (Combat tracker display)
├── packs/                   (Ready for compendium packs)
├── warfare split/           (Original Warfare PDFs)
├── module.json              (Manifest)
└── README.md
```

## Key Features Implemented ✨

✅ Tabbed interface for organized information display
✅ Professional medieval fantasy styling (Palatino Linotype font)
✅ Inline roll buttons for all test types
✅ Dynamic lists (traits, powers, units) with add/remove
✅ Drag-and-drop unit management
✅ Officer reactions tracking system
✅ Power Pool visual indicator
✅ Casualty tracking
✅ Chat message integration hooks
✅ Handlebars templating with custom helpers

## Next Steps

### Option 1: Create Unit Compendium
Extract units from the Warfare PDFs and populate `packs/saxton-units.json` with pre-made unit templates (e.g., Saxton's army units)

### Option 2: Implement Advanced Rules
Add mechanics like:
- Morale thresholds and effects
- Casualty escalation rules
- Special unit abilities/traits
- Domain power effects

### Option 3: Testing & Polish
- Test the module in Foundry VTT
- Fine-tune CSS styling
- Add example compendium entries
- Create sample commanders and units

### Option 4: Documentation
- Create user guide with example scenarios
- Document all mechanics
- Add video tutorials or walkthroughs

## Module Files Status

| File | Status | Notes |
|------|--------|-------|
| main.js | ✅ Complete | Core logic + hooks |
| unit-sheet.hbs | ✅ Complete | Tabbed UI, 4 tabs |
| commander-sheet.hbs | ✅ Complete | Tabbed UI, 4 tabs |
| combat-tracker.hbs | ✅ Complete | Shows init order + badges |
| warfare.css | ✅ Complete | Professional theming |
| en.json | ✅ Complete | Localization strings |
| module.json | ✅ Updated | Proper paths configured |

The HTML/Handlebars templates are now complete and integrated with your module! 🎉
