# Kingdoms & Warfare Unit Extraction Summary

## Overview
This document summarizes all unit information extracted from the Kingdoms & Warfare PDF books for creation of a Foundry VTT compendium.

## Key Findings

### Units from Saxton's Army (Primary Example)

Saxton's regime begins with the following units, organized by tier:

#### Tier I Units (6 total, 3 different types)
1. **Human Infantry** (Quantity: 3)
   - Ancestry: Human
   - Type: Infantry
   - Equipment: Regular
   - Experience: Regular
   - Commander: Lord Saxton
   - Notes: Basic infantry troops, core of the army

2. **Human Artillery (Longbow)** (Quantity: 2)
   - Ancestry: Human
   - Type: Artillery
   - Equipment: Light
   - Experience: Regular
   - Commander: Magus Therin
   - Notes: Archers with longbows, standard ranged units

3. **Goblin Worg-riders** (Quantity: Some)
   - Ancestry: Goblinoid
   - Type: Cavalry
   - Equipment: Light/Medium
   - Experience: Regular
   - Commander: Sir Anglim
   - Notes: Mobile cavalry units mounted on worgs

#### Tier II Units (2 total, 2 different types)
1. **Bloodfangs**
   - Ancestry: Goblinoid
   - Type: Cavalry
   - Equipment: Medium/Heavy
   - Experience: Regular
   - Commander: Sir Anglim
   - Notes: "Quite nasty" cavalry unit, effective in battle

2. **Goblin Sappers**
   - Ancestry: Goblinoid
   - Type: Infantry
   - Equipment: Medium
   - Experience: Regular
   - Commander: Prelate Ellingwood
   - Notes: Can potentially take out hero fortifications, specialized siege troops

#### Tier III Units (1 total)
1. **Bugbear Heavy Claw**
   - Ancestry: Goblinoid
   - Type: Infantry (Heavy)
   - Equipment: Heavy
   - Experience: Regular
   - Commander: Lady Morgant
   - Notes: "Wreaks havoc against infantry", significant threat unit

#### Special Units
1. **Grim Front** (Tier III Special Unit)
   - Ancestry: Undead
   - Type: Special Unit
   - Commander: Lord Saxton
   - Availability: Only if Caliga Lifebane (necromancer) is not defeated
   - Notes: Mentioned but full details on page 87 of Domains & Intrigue chapter

### Saxton's Army Martial Advantages

All of Saxton's units use these three martial advantages:

1. **Skirmishers**
   - If any infantry or artillery unit moves before attacking, gains +2 to Attack tests
   - Can immediately move 1 space after attacking

2. **Death Commandos**
   - When infantry unit succeeds on Power test in attack, target must succeed on Morale test or suffer 1 additional casualty

3. **Patron's Curse**
   - When heavy or super-heavy unit makes successful Power test in attack, target unit is disoriented until end of next activation

## Unit Type System

### Infantry
- **Role**: Core troops, meat-and-potatoes of any domain
- **Strengths**: Higher Toughness than other units of same tier/ancestry
- **Weaknesses**: Cannot attack cavalry or aerial units
- **Attack Restrictions**: Can only attack adjacent units (in front, behind, left, right - not diagonal)
- **Deployment**: Can be deployed in vanguard, center, reserve, or rear ranks
- **Special Maneuvers**: Follow Up (free movement after adjacent unit breaks), Set for Charge
- **Movement**: 1 space per activation

### Artillery (Archers & Siege Engines)
- **Role**: Ranged firepower, critical for anti-air defense
- **Archers**:
  - Low Defense and Toughness (squishy)
  - Can attack any unit
  - Good for forcing morale tests and finishing weakened units
  - Deployment: Center rank
- **Siege Engines**:
  - Usually Tier II units
  - Can attack any unit AND damage fortifications (automatically hit)
  - Require full round between attacks (loading/winding time)
  - Deployment: Center rank
- **Movement**: 1 space per activation

### Cavalry
- **Role**: Fast, hard-hitting mobile strike force
- **Strengths**: High Power (one of few Tier I units dealing 2 damage per casualty), highly mobile
- **Attack Rights**: Can attack other cavalry, exposed infantry, exposed artillery
- **Weaknesses**: Dependent on finding exposed targets
- **Deployment**: Mobile across entire battlefield (no rank restrictions)
- **Movement**: 1 space per activation
- **Special Note**: Often both sides begin battle trying to eliminate opposing cavalry

### Aerial Units
- **Role**: Rare but powerful, mostly psychological impact
- **Strengths**: Can attack any unit, few units can retaliate (only artillery and other aerial)
- **Weaknesses**: Very low Defense and Toughness, rare (mostly Tier III with Tier II stats)
- **Attack Rights**: Can attack any unit
- **Deployment**: Mobile across entire battlefield (no rank restrictions)
- **Movement**: 1 space per activation
- **Notes**: An army without aerial units facing one with them often feels defensive even if militarily equal

### Levies
- **Description**: Untrained laborers and townfolk pressed into service
- **Cannot**: Have equipment improved, have experience improved
- **Auto-Disband**: Automatically disband after every battle
- **Best Use**: Defend domain's rear rank against enemy cavalry
- **Cost**: Can muster 2 levies instead of any other Tier I unit
- **Stats**: Poor compared to other infantry units

### Siege Engines (Special)
- **Type**: Usually Tier II units
- **Unique**: Only unit type that can damage fortifications
- **Attack**: Can attack any unit, automatically hits fortifications
- **Limitation**: Requires entire round between attacks (loading catapult, winding ballista, etc.)
- **Use Case**: Only typically mustered when fighting fortifications

## Unit Ancestry System

Six ancestries are available in the system, each with 9 different units:

1. **Human** - Standard humanoid warriors
2. **Elf** - Graceful warriors, skilled archers
3. **Dwarf** - Sturdy, strong warriors, good with engineering
4. **Orc** - Powerful, aggressive warriors
5. **Goblinoid** - Diverse troops including goblins, bugbears, hobgoblins
6. **Undead** - Skeleton and zombie-like troops

**Important**: The warfare rules bonuses for ancestry have little to do with combat creature stats and everything to do with organization, morale, and unit cohesion.

## Unit Statistics Explained

### Base Statistics (Found on Unit Cards)
- **ATK (Attack)**: Measure of tactical effectiveness and ability to execute attack orders
- **DEF (Defense)**: Ability to maneuver and avoid/minimize attacks; used as DC for opposed Attack tests
- **POW (Power)**: Physical prowess in battle; second part of attack sequence, inflicts additional casualties
- **TOU (Toughness)**: Physical hardiness and ability to withstand attacks; opposed to POW tests
- **MOR (Morale)**: Ability to maintain discipline against overwhelming odds, magic, exotic enemies, and death
- **COM (Command)**: Ability to correctly interpret complex orders and execute them successfully

### Size
- Determines casualty die (size 6 unit starts with d6)
- Represents ability to maintain morale and unit cohesion
- Determines how much damage unit can take

### Casualty Tracking
- Each unit has a casualty die equal to its Size
- When unit takes casualties, casualty die is decremented (6→5→4, etc.)
- When casualty die reaches 0, unit is broken and removed from battle
- Broken units can potentially be rallied to return with a Morale test

## Experience and Equipment System

### Experience Levels (Infantry Example)
| Level | Additional Attacks | Attack | Defense | Morale | Command |
|-------|-------------------|--------|---------|--------|---------|
| Levies | 0 | -1 | -2 | -2 | -1 |
| Regular | 0 | 0 | 0 | 0 | 1 |
| Veteran | 0 | +1 | +2 | +2 | +2 |
| Elite | +1 | +2 | +4 | +4 | +2 |
| Super-Elite | +1 | +3 | +6 | +6 | +3 |

**How Units Improve**:
- Regular → Veteran: Survive first battle
- Veteran → Elite: Survive 3 more battles (4 total)
- Elite → Super-Elite: Survive 4 more battles (8 total)
- Levies CANNOT be improved and disband after every battle

### Equipment Levels (Infantry Example)
| Level | Power | Toughness | Damage |
|-------|-------|-----------|--------|
| Light | 0 | 0 | 0 |
| Medium | +2 | +2 | 0 |
| Heavy | +4 | +4 | 0 |
| Super-Heavy | +6 | +6 | +1 |

**Equipment Improvement Cost**: Domain pays gold per unit per tier to upgrade equipment levels
- Light → Medium: 500 gp × Tier
- Medium → Heavy: 1,000 gp × Tier
- Heavy → Super-Heavy: 2,000 gp × Tier

### Cavalry & Aerial Equipment Bonuses (Lighter than Infantry)
| Level | Power | Toughness | Damage |
|-------|-------|-----------|--------|
| Light | 0 | 0 | 0 |
| Medium | +1 | +1 | 0 |
| Heavy | +2 | +2 | 0 |
| Super-Heavy | +3 | +3 | +1 |

### Artillery Equipment Bonuses
| Level | Power | Toughness |
|-------|-------|-----------|
| Light | 0 | 0 |
| Medium | +1 | +1 |
| Heavy | +2 | +2 |
| Super-Heavy | +3 | +3 |

## Unit Tier System

### Tier I (Least Powerful)
- Easiest to field, lowest cost
- No unit dependency - can field unlimited numbers
- Most common unit type

### Tier II
- Can field one less Tier II than current Tier I units
- Example: If 6 Tier I units, can have up to 5 Tier II units

### Tier III
- Can field one less Tier III than current Tier II units
- More powerful, harder to muster

### Tier IV
- Can field one less Tier IV than current Tier III units

### Tier V
- Most powerful, rare
- Can field one less Tier V than current Tier IV units

**Special Units** (from diplomacy or domain features) ignore these dependencies and don't count toward the limit.

## Unit Command and Control

- **Command Limit**: An officer can command a number of units equal to their proficiency bonus
- **Required**: Every unit must have a commander
- **Types of Commanders**: Domain officers, NPC leaders, NPC allies
- **Player Characters**: Each player character acts as a commander in warfare

## Unit Traits and Maneuvers

### Infantry Maneuvers
- **Follow Up**: Free movement after adjacent unit breaks
- **Set for Charge**: Defensive maneuver against cavalry/aerial charge

### General Maneuvers (Require Command Tests)
Various maneuvers available to units, each with specific requirements and effects (detailed on page 109 of Warfare chapter)

## Army Composition Examples

### Example: Army with Tier V Leader Unit
Would look like:
```
Tier V: 1 unit
Tier IV: Up to 1 unit
Tier III: Up to 2 units
Tier II: Up to 3 units
Tier I: Up to 5 units
Total: 12-15 units
```

## Saxton's Army Summary

**Leader**: Lord Saxton (CR 8, proficiency +3 = commands 3 units)

**Officers**:
- Lord Saxton
- Magus Extraordinary Delicara Therin
- Prelate of Ajax Kiril Ellingwood
- Lady Morgant
- Sir Anglim (if alive)
- Sir Pelliton (if alive)

**Initial Force**: 6 Tier I units, 2 Tier II units, 1 Tier III unit
**Possible Expansion**: Could add 3 more Tier II units to reach maximum limit
**Advantage**: Versatile mix with sappers, cavalry, and heavy assault units

**Martial Advantages**: All units share Skirmishers, Death Commandos, and Patron's Curse abilities

## Unit Card Format

Unit cards contain:
- Unit name and tier (Roman numeral)
- Unit type symbol (Infantry, Artillery, Cavalry, Aerial, Siege, Levy)
- Ancestry symbol
- Experience stars (0 = Regular/Levy, 1 = Veteran, 2 = Elite, 3 = Super-Elite)
- Base statistics: ATK, DEF, POW, TOU, MOR, COM
- Size (casualty die)
- Number of attacks
- Damage value
- Equipment level
- Traits (referenced to full descriptions on page 126)
- Movement value (usually 1, doesn't appear on card)

## PDF References

- **Unit Card Stat Blocks**: Referenced as available on page 314 as printer-friendly cards
- **Unit Traits Descriptions**: Page 126 in Warfare chapter
- **Martial Advantages by Class**: Pages 111-120 in Warfare chapter
- **General Maneuvers**: Page 109 in Warfare chapter
- **Saxton's Army**: Page 229-230 in The Regent of Bedegar adventure (warfare5.pdf)
- **Grim Front Details**: Page 87 in Domains & Intrigue chapter

## Compendium Status

**Units Successfully Extracted**:
- Human Infantry (Saxton's army)
- Human Artillery Longbow (Saxton's army)
- Bloodfangs (Saxton's army)
- Goblin Sappers (Saxton's army)
- Goblin Worg-riders (Saxton's army)
- Bugbear Heavy Claw (Saxton's army)
- Grim Front (Saxton's army special unit)
- System descriptions for all unit types (Infantry, Artillery, Cavalry, Aerial, Levies, Siege)

**Information Available**:
- Complete unit type definitions and capabilities
- Saxton's Army composition and martial advantages
- Experience and equipment bonus tables
- Unit tier relationships and dependencies
- Commander system and control mechanics
- Trait and maneuver system structure

**Limitations**:
- Base statistics for standard ancestral units require accessing printer-friendly card pages (page 314)
- Full trait descriptions need page 126 reference
- Some unit variants and special units only referenced in main narrative
- Complete equipment cost and domain feature interactions best seen in full PDF context

## Recommendations for Foundry Implementation

1. Create unit card sheets with toggle buttons for experience/equipment levels
2. Implement the unit dependency system in the domain tracker
3. Create martial advantage feature cards that can be applied to units
4. Build encounter builders that track unit command limits
5. Create casualty tracking tokens with updateable casualty dice
6. Implement the Tier system with validation rules
7. Create character sheets for commanders that show unit command limits
8. Build automation for experience gain when units survive battles
9. Create equipment upgrade cost calculator
10. Implement battlefield grid with rank system for deployment

