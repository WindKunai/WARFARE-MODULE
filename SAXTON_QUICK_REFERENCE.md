# Saxton's Army - Quick Reference

## Army Composition (9 Total Units)

### ⚔️ TIER I - Core Forces (6 Units)

| Unit | ATK | DEF | POW | TOU | MOR | COM | Size | Commander |
|------|-----|-----|-----|-----|-----|-----|------|-----------|
| Human Infantry (3×) | 4 | 10 | 6 | 6 | 8 | 4 | 12 | Lord Saxton |
| Human Archers (2×) | 5 | 8 | 4 | 4 | 7 | 3 | 8 | Magus Therin |
| Worg-riders | 5 | 9 | 7 | 5 | 6 | 3 | 6 | Sir Anglim |

### 🛡️ TIER II - Specialized Forces (2 Units)

| Unit | ATK | DEF | POW | TOU | MOR | COM | Size | Commander |
|------|-----|-----|-----|-----|-----|-----|------|-----------|
| Bloodfangs (Cavalry) | 6 | 11 | 8 | 7 | 7 | 4 | 8 | Sir Anglim |
| Goblin Sappers | 5 | 11 | 8 | 8 | 7 | 4 | 8 | Prelate Ellingwood |

### ⚔️⚔️ TIER III - Elite Assault (2 Units)

| Unit | ATK | DEF | POW | TOU | MOR | COM | Size | Commander |
|------|-----|-----|-----|-----|-----|-----|------|-----------|
| Bugbear Heavy Claw | 7 | 12 | 10 | 10 | 8 | 4 | 6 | Lady Morgant |
| Grim Front (Special) | 6 | 11 | 9 | 11 | 10 | 5 | 8 | Lord Saxton |

---

## Traits Summary

### Shared by all units:
- **Skirmishers:** +2 ATK if move first
- **Death Commandos:** +1 casualty on POW success (infantry)
- **Patron's Curse:** Disorientation on POW success (heavy units)

### Unit-Specific Traits:

**Infantry:** Skirmishers, Death Commandos, Follow Up, Set for Charge
**Archers:** Skirmishers, Volley Fire, Covering Fire
**Cavalry:** Charge, Skirmish, Withdraw, Maneuver
**Sappers:** Fortification Breaker, Engineering Expertise
**Heavy Units:** Patron's Curse bonus effect
**Undead (Grim Front):** Unholy Resilience, immunity to morale effects

---

## Committing the Module

Changes ready to commit:
- `packs/saxton-units.json` - NEW (9 units)
- `templates/unit-sheet.hbs` - NEW (HTML template)
- `templates/commander-sheet.hbs` - NEW (HTML template)
- `templates/combat-tracker.hbs` - NEW (HTML template)
- `scripts/main.js` - MODIFIED (added `eq` helper)
- `COMPENDIUM_GUIDE.md` - NEW (documentation)
- `SAXTON_QUICK_REFERENCE.md` - NEW (this file)

Commit message suggestion:
```
Add Saxton's Army compendium with 9 pre-made warfare units and HTML sheet templates

- Create packs/saxton-units.json with Tier I/II/III units
- Add unit-sheet.hbs, commander-sheet.hbs, and combat-tracker.hbs templates
- Add eq Handlebars helper for template conditionals
- Include comprehensive compendium guide and quick reference
- All units from The Regent of Bedegar adventure
```
