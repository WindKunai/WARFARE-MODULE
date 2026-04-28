#!/usr/bin/env python3
import pdfplumber
from pathlib import Path
import json
import re

pdf_dir = Path("warfareSplit")

# Dictionary to store all units found
all_units = {}

# Known unit types to look for
unit_type_keywords = ['Infantry', 'Cavalry', 'Artillery', 'Aerial', 'Levies', 'Siege']
tier_patterns = ['Tier I', 'Tier II', 'Tier III', 'Tier IV', 'Tier V']

print("Extracting all unit information from PDFs...")

for pdf_file in sorted(pdf_dir.glob("*.pdf")):
    print(f"\nProcessing {pdf_file.name}...")

    with pdfplumber.open(str(pdf_file)) as pdf:
        full_text = ""

        # Extract text from all pages
        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            full_text += f"\n--- PAGE {page_num + 1} ---\n" + text

        # Now parse the text to find units
        lines = full_text.split('\n')

        for i, line in enumerate(lines):
            # Look for unit definitions
            for unit_type in unit_type_keywords:
                if unit_type in line:
                    for tier in tier_patterns:
                        if tier in line:
                            # Found a potential unit line
                            unit_name = line.strip()

                            # Try to get the next few lines for stats
                            context_end = min(len(lines), i + 10)
                            context_lines = lines[i:context_end]

                            all_units[unit_name] = {
                                'pdf': pdf_file.name,
                                'page_snippet': '\n'.join(context_lines[:5])
                            }

# Also specifically look for Saxton's army units
saxton_units = ['Human Infantry', 'Human Artillery', 'Bloodfangs', 'Goblin Sappers', 'Goblin Worg-riders', 'Bugbear Heavy Claw', 'Grim Front']

for unit_name in saxton_units:
    all_units[f"SAXTON: {unit_name}"] = {
        'pdf': 'warfare5.pdf',
        'source': 'Saxton\'s Army'
    }

# Save results
with open("all_units_found.json", "w", encoding="utf-8") as f:
    json.dump(all_units, f, indent=2, ensure_ascii=False)

print(f"\n\nFound {len(all_units)} units total")
print("\nSample units found:")
for unit_name in list(all_units.keys())[:10]:
    print(f"  - {unit_name}")

if len(all_units) > 10:
    print(f"  ... and {len(all_units) - 10} more")
