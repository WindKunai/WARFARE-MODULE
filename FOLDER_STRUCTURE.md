# Kingdoms & Warfare - Folder Structure Guide

## Module Organization

```
kingdoms-warfare/
│
├── [Core Module Files]
├── scripts/
│   └── main.js                      ✅ Main module code (33 KB)
├── styles/
│   └── warfare.css                  ✅ Professional theming
├── lang/
│   └── en.json                      ✅ Localization strings
├── templates/
│   ├── unit-sheet.hbs              ✅ Unit item UI (6.4 KB)
│   ├── commander-sheet.hbs         ✅ Commander actor UI (9.6 KB)
│   └── combat-tracker.hbs          ✅ Combat tracker UI (3 KB)
│
├── [Compendium & Data]
├── packs/
│   └── saxton-units.json           ✅ 9 Saxton's Army units (ready to use)
│
├── [Development & Research]
├── warfareSplit/                    📁 All extracted data & PDFs organized here
│   ├── [Source PDFs]
│   ├── warfare1.pdf                 (26 MB) Core Warfare rules
│   ├── warfare2a.pdf                (14 MB) Unit types, experience, equipment
│   ├── warfare2b.pdf                (27 MB) Martial advantages
│   ├── warfare3.pdf                 (27 MB) Additional rules
│   ├── warfare4.pdf                 (13 MB) Campaign framework
│   ├── warfare5.pdf                 (7.7 MB) The Regent of Bedegar adventure
│   ├── warfareResources.pdf         (25 MB) ✅ MAIN UNIT RESOURCE
│   │
│   ├── [Reference Data]
│   ├── reference/                   📁 Extracted reference materials
│   │   ├── warfare_units_complete.json      ✅ Full unit data (Foundry format)
│   │   ├── warfare_units_reference.md       ✅ Formatted unit descriptions
│   │   └── warfare_units_table.csv          ✅ Quick comparison table
│   │
│   ├── [Individual Page Extracts]
│   ├── page_extracts/               📁 Individual page text files
│   │   ├── warfare2a_page_24.txt    (Unit stat blocks)
│   │   ├── warfare2a_page_25.txt
│   │   ├── warfare2a_page_26.txt    (Experience bonuses)
│   │   ├── warfare2a_page_27.txt
│   │   ├── warfare2a_page_28.txt
│   │   ├── warfare2a_page_29.txt
│   │   ├── warfare2a_page_30.txt
│   │   ├── warfare2a_page_31.txt
│   │   ├── warfare2a_page_32.txt
│   │   ├── warfare2a_page_33.txt
│   │   ├── warfare2a_page_34.txt
│   │   ├── warfare2a_page_35.txt
│   │   ├── warfare2a_page_36.txt
│   │   ├── warfare2a_page_37.txt
│   │   ├── warfare2a_page_38.txt
│   │   ├── warfare2a_page_39.txt
│   │   └── warfare2a_page_40.txt
│   │
│   ├── [Working Files]
│   ├── extraction_working/          📁 Temporary extraction files
│   │   ├── extracted_text.json      (Raw text from all PDFs)
│   │   ├── all_units_found.json     (Search results)
│   │   └── units_*.json             (Various extraction attempts)
│   │
│   ├── [Legacy Folders]
│   ├── warefarePages/               📁 (Old folder - can be deleted)
│   └── extracted_data/              📁 (Empty - combined with reference/)
│
├── [Documentation]
├── COMPENDIUM_GUIDE.md              ✅ How to use the compendium
├── SAXTON_QUICK_REFERENCE.md        ✅ Quick stat lookup table
├── MODULE_COMPLETION_SUMMARY.md     ✅ Project overview
├── MODULE_STATUS.txt                ✅ Visual status report
├── TEMPLATES_COMPLETE.md            ✅ Template documentation
├── EXTRACTION_SUMMARY.md            ✅ System mechanics explanation
├── README_EXTRACTION.md             ✅ Data extraction report
├── module.json                      ✅ Foundry manifest
└── README.md                        (Project readme)
```

## Folder Purposes

### Core Module (`/` root)
- **scripts/** - JavaScript module code
- **styles/** - CSS theming
- **lang/** - Localization files
- **templates/** - Handlebars HTML templates
- **packs/** - Compendium data packs (units)
- **module.json** - Foundry VTT manifest

### Data Organization (`warfareSplit/`)

#### `reference/` - **USE THIS FOLDER**
Contains the extracted and processed unit data ready for use:
- `warfare_units_complete.json` - Complete unit data in Foundry VTT format (10 units)
- `warfare_units_reference.md` - Formatted descriptions and tactical notes
- `warfare_units_table.csv` - Spreadsheet-ready format

**Why separate:** These are clean, processed documents useful for reference and implementation.

#### `page_extracts/` - Individual extracted pages
Raw text extracted from specific PDF pages:
- Pages 24-40 from warfare2a.pdf
- Contains unit stat blocks, experience/equipment tables
- Useful if you need to verify or check specific mechanics

**Why keep:** Reference material in case you need to trace data back to source

#### `extraction_working/` - Temporary/working files
Files created during extraction process that helped find units:
- Raw JSON from all PDF text
- Search result files
- Intermediate processing files

**Why keep:** Shows the extraction process, helps with debugging/verification

#### `warefarePages/` & `extracted_data/` - Legacy
These folders are now empty/consolidated and can be deleted once you're sure you don't need them.

## What's Actually Used

### For Foundry VTT Module:
```
✅ kingdoms-warfare/packs/saxton-units.json
   └─ This is the ACTIVE compendium pack
      Copied from warfareSplit/reference/warfare_units_complete.json
```

### For Reference/Development:
```
✅ warfareSplit/reference/
   ├── warfare_units_reference.md     (Read this for unit descriptions)
   ├── warfare_units_table.csv         (Quick stats comparison)
   └── warfare_units_complete.json     (Data source)
```

### Source Material:
```
✅ warfareSplit/warfareResources.pdf   (Main unit resource)
   ✅ warfareSplit/warfare*.pdf        (Rules supplements)
```

## Recommended Cleanup

You can safely delete:
- `warfareSplit/extraction_working/` (temporary files)
- `warfareSplit/warefarePages/` (old duplicate folder)
- `warfareSplit/extracted_data/` (empty, consolidated)
- Root-level temporary files like `extracted_text.json`, etc.

These folders took up space but the important data is now:
- In `packs/saxton-units.json` (for actual use)
- In `warfareSplit/reference/` (for reference)

## To Use the Units

1. **In Foundry VTT:**
   - The module automatically loads `packs/saxton-units.json`
   - Units appear in "Saxton's Army Units" compendium
   - Drag units to create instances

2. **For Reference:**
   - Read `warfareSplit/reference/warfare_units_reference.md`
   - Use `warfareSplit/reference/warfare_units_table.csv` for quick lookups
   - Check `SAXTON_QUICK_REFERENCE.md` for unit stats

3. **For Adding More Units:**
   - Extract from `warfareSplit/warfare*.pdf` files
   - Organize extracted data in `reference/`
   - Convert to Foundry format
   - Add to `packs/`

---

**Summary:** Everything is properly organized. The module is ready to use!
- ✅ Active compendium: `packs/saxton-units.json`
- ✅ Reference material: `warfareSplit/reference/`
- ✅ Source PDFs: `warfareSplit/*.pdf`
- ✅ Page data: `warfareSplit/page_extracts/`
