/**
 * Kingdoms & Warfare – FoundryVTT Module
 * MCDM Kingdoms & Warfare ruleset integration
 *
 * Warfare unit stats: ATK, DEF, POW, TOU, MOR, COM
 * Unit types: Infantry, Artillery, Cavalry, Aerial, Levies, Siege Engine
 * Tiers: I, II, III
 * Domain: Power Pool, Skills (Diplomacy/Espionage/Lore/Operations),
 *         Defenses (Size, Power Die, Communications, Resolve, Resources)
 */

// ─────────────────────────────────────────────────────────────────────────────
// DATA MODELS
// ─────────────────────────────────────────────────────────────────────────────

class WarfareUnitData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      unitType: new fields.StringField({ initial: "infantry", choices: ["infantry","artillery","cavalry","aerial","levies","siegeEngine"] }),
      tier:     new fields.StringField({ initial: "I", choices: ["I","II","III"] }),
      commander: new fields.StringField({ initial: "" }),
      size:     new fields.NumberField({ integer: true, initial: 10, min: 0 }),
      stats: new fields.SchemaField({
        atk: new fields.NumberField({ integer: true, initial: 0 }),
        def: new fields.NumberField({ integer: true, initial: 0 }),
        pow: new fields.NumberField({ integer: true, initial: 0 }),
        tou: new fields.NumberField({ integer: true, initial: 0 }),
        mor: new fields.NumberField({ integer: true, initial: 0 }),
        com: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      casualties:    new fields.NumberField({ integer: true, initial: 0, min: 0 }),
      maxCasualties: new fields.NumberField({ integer: true, initial: 5, min: 0 }),
      disorganized:  new fields.BooleanField({ initial: false }),
      traits: new fields.ArrayField(new fields.SchemaField({
        name:        new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
      })),
      notes: new fields.StringField({ initial: "" }),
    };
  }
}

class CommanderData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      title: new fields.StringField({ initial: "" }),
      powerPool: new fields.SchemaField({
        current: new fields.NumberField({ integer: true, initial: 3, min: 0 }),
        max:     new fields.NumberField({ integer: true, initial: 3, min: 0 }),
      }),
      powerDie: new fields.NumberField({ integer: true, initial: 6, choices: [4,6,8,10,12] }),
      skills: new fields.SchemaField({
        diplomacy:  new fields.NumberField({ integer: true, initial: 0 }),
        espionage:  new fields.NumberField({ integer: true, initial: 0 }),
        lore:       new fields.NumberField({ integer: true, initial: 0 }),
        operations: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      defenses: new fields.SchemaField({
        size:           new fields.NumberField({ integer: true, initial: 1, min: 1 }),
        communications: new fields.NumberField({ integer: true, initial: 10 }),
        resolve:        new fields.NumberField({ integer: true, initial: 10 }),
        resources:      new fields.NumberField({ integer: true, initial: 10 }),
      }),
      reactionsUsed: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
      powers: new fields.ArrayField(new fields.SchemaField({
        name:        new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
      })),
      units: new fields.ArrayField(new fields.SchemaField({
        name:     new fields.StringField({ initial: "" }),
        unitType: new fields.StringField({ initial: "infantry" }),
        tier:     new fields.StringField({ initial: "I" }),
        atk:      new fields.NumberField({ integer: true, initial: 0 }),
        def:      new fields.NumberField({ integer: true, initial: 0 }),
      })),
      notes: new fields.StringField({ initial: "" }),
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ITEM SHEET – Warfare Unit
// ─────────────────────────────────────────────────────────────────────────────

class WarfareUnitSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["kingdoms-warfare", "sheet", "item", "warfare-unit"],
      template: "modules/kingdoms-warfare/templates/unit-sheet.hbs",
      width: 520,
      height: 480,
      tabs: [],
    });
  }

  get title() {
    return `${this.item.name} [${this.item.system.tier} ${this.item.system.unitType}]`;
  }

  async getData() {
    const ctx = await super.getData();
    ctx.system = this.item.system;
    return ctx;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Tab switching
    html.find(".kw-sheet-tabs .tab-item").on("click", ev => {
      const tab = ev.currentTarget.dataset.tab;
      html.find(".tab-item").removeClass("active");
      html.find(".kw-tab-content").removeClass("active");
      ev.currentTarget.classList.add("active");
      html.find(`.kw-tab-content[data-tab="${tab}"]`).addClass("active");
    });

    if (!this.isEditable) return;

    // Roll buttons
    html.find(".kw-roll-btn[data-roll-type]").on("click", ev => {
      const type = ev.currentTarget.dataset.rollType;
      this._onRoll(type);
    });

    // Add trait
    html.find(".kw-add-trait").on("click", async () => {
      const traits = foundry.utils.deepClone(this.item.system.traits ?? []);
      traits.push({ name: "", description: "" });
      await this.item.update({ "system.traits": traits });
    });

    // Remove trait
    html.find(".kw-remove-trait").on("click", async ev => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const traits = foundry.utils.deepClone(this.item.system.traits ?? []);
      traits.splice(idx, 1);
      await this.item.update({ "system.traits": traits });
    });
  }

  async _onRoll(type) {
    const sys = this.item.system;
    const statMap = {
      attack: { stat: sys.stats.atk, label: "Attack Test", statName: "ATK" },
      power:  { stat: sys.stats.pow, label: "Power Test",  statName: "POW" },
      morale: { stat: sys.stats.mor, label: "Morale Test", statName: "MOR" },
      command:{ stat: sys.stats.com, label: "Command Test",statName: "COM" },
    };
    const entry = statMap[type];
    if (!entry) return;

    const roll = await new Roll("1d20 + @bonus", { bonus: entry.stat }).evaluate();
    const dc   = 10; // Standard Warfare DC
    const success = roll.total >= dc;

    const flavor = `
      <div class="kw-chat-card">
        <div class="card-header">
          <i class="fas fa-chess-rook"></i>
          ${this.item.name} — ${entry.label} (${entry.statName} +${entry.stat})
        </div>
        <div class="card-body">
          <div class="kw-chat-roll-result ${success ? "success" : "failure"}">
            ${roll.total} ${success ? "✓ SUCCESS" : "✗ FAILURE"}
          </div>
          <div class="kw-outcome-text">
            ${success
              ? (type === "attack"  ? "Unit attacks successfully!"
               : type === "power"  ? "Power test passed — apply effect."
               : type === "morale" ? "Unit holds firm."
               : "Command executed.")
              : (type === "attack"  ? "Attack fails — no effect."
               : type === "power"  ? "Power test failed."
               : type === "morale" ? "Unit is disorganized!"
               : "Command fails.")}
          </div>
          <div style="font-size:0.75em; color:#888; text-align:center; margin-top:4px">
            Roll: ${roll.result} = ${roll.total} vs DC ${dc}
          </div>
        </div>
      </div>`;

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.item.parent }),
      flavor,
      rollMode: game.settings.get("core", "rollMode"),
    });

    // Auto-mark disorganized on morale failure
    if (type === "morale" && !success) {
      await this.item.update({ "system.disorganized": true });
      ui.notifications.warn(`${this.item.name} is disorganized!`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTOR SHEET – Commander / Domain
// ─────────────────────────────────────────────────────────────────────────────

class CommanderSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["kingdoms-warfare", "sheet", "actor", "commander"],
      template: "modules/kingdoms-warfare/templates/commander-sheet.hbs",
      width: 560,
      height: 600,
    });
  }

  async getData() {
    const ctx = await super.getData();
    ctx.system = this.actor.system;
    // Handlebars helpers aren't auto-registered; pass convenience values
    ctx.powerDieLabel = `d${this.actor.system.powerDie}`;
    return ctx;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Tab switching
    html.find(".kw-sheet-tabs .tab-item").on("click", ev => {
      const tab = ev.currentTarget.dataset.tab;
      html.find(".tab-item").removeClass("active");
      html.find(".kw-tab-content").removeClass("active");
      ev.currentTarget.classList.add("active");
      html.find(`.kw-tab-content[data-tab="${tab}"]`).addClass("active");
    });

    if (!this.isEditable) return;

    // Roll buttons
    html.find(".kw-roll-btn[data-roll-type]").on("click", ev => {
      const type = ev.currentTarget.dataset.rollType;
      const skill = ev.currentTarget.dataset.skill;
      this._onRoll(type, skill);
    });

    // Reaction pips
    html.find(".pip-avail").on("click", ev => {
      const idx = parseInt(ev.currentTarget.dataset.pipIdx);
      const used = this.actor.system.reactionsUsed;
      // Toggle: if clicking on a used pip, set used = idx (unreact all after)
      const newUsed = idx < used ? idx : idx + 1;
      this.actor.update({ "system.reactionsUsed": newUsed });
    });

    // Add / remove powers
    html.find(".kw-add-power").on("click", async () => {
      const powers = foundry.utils.deepClone(this.actor.system.powers ?? []);
      powers.push({ name: "", description: "" });
      await this.actor.update({ "system.powers": powers });
    });
    html.find(".kw-remove-power").on("click", async ev => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const powers = foundry.utils.deepClone(this.actor.system.powers ?? []);
      powers.splice(idx, 1);
      await this.actor.update({ "system.powers": powers });
    });

    // Remove unit entry
    html.find(".kw-remove-unit").on("click", async ev => {
      const idx = parseInt(ev.currentTarget.dataset.idx);
      const units = foundry.utils.deepClone(this.actor.system.units ?? []);
      units.splice(idx, 1);
      await this.actor.update({ "system.units": units });
    });
  }

  async _onDrop(event) {
    const data = TextEditor.getDragEventData(event);
    if (data.type === "Item") {
      const item = await Item.implementation.fromDropData(data);
      if (item?.type === "warfareUnit") {
        const units = foundry.utils.deepClone(this.actor.system.units ?? []);
        units.push({
          name:     item.name,
          unitType: item.system.unitType,
          tier:     item.system.tier,
          atk:      item.system.stats.atk,
          def:      item.system.stats.def,
        });
        await this.actor.update({ "system.units": units });
        return;
      }
    }
    return super._onDrop(event);
  }

  async _onRoll(type, skill) {
    const sys = this.actor.system;

    if (type === "powerRoll") {
      const roll = await new Roll(`1d${sys.powerDie}`).evaluate();
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `<strong>${this.actor.name}</strong> rolls Power Die (d${sys.powerDie}): <strong>${roll.total}</strong>`,
      });
      return;
    }

    if (type === "resetReactions") {
      await this.actor.update({ "system.reactionsUsed": 0 });
      ui.notifications.info(`${this.actor.name}: Reactions reset.`);
      return;
    }

    if (type === "skill" && skill) {
      const bonus = sys.skills[skill] ?? 0;
      const roll = await new Roll("1d20 + @b", { b: bonus }).evaluate();
      const dc = 10;
      const success = roll.total >= dc;
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `
          <div class="kw-chat-card">
            <div class="card-header"><i class="fas fa-scroll"></i> ${this.actor.name} — ${skill.charAt(0).toUpperCase() + skill.slice(1)} (+${bonus})</div>
            <div class="card-body">
              <div class="kw-chat-roll-result ${success ? "success" : "failure"}">${roll.total} ${success ? "✓" : "✗"}</div>
            </div>
          </div>`,
      });
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// BATTLEFIELD SCENE TOOL
// ─────────────────────────────────────────────────────────────────────────────

class WarfareBattlefieldTool {
  /**
   * Create a new Scene pre-configured for the standard Kingdoms & Warfare
   * battlefield: 2 sides × 4 rows (Vanguard/Reserve/Center/Rear) × 5 columns.
   */
  static async createBattlefieldScene() {
    const GRID = 100; // pixels per cell
    const COLS = 5;
    const ROWS = 4;   // per side
    const SIDES = 2;
    const W = COLS * GRID;
    const H = ROWS * SIDES * GRID;

    const name = await Dialog.prompt({
      title: "Warfare Battlefield",
      content: `<label>Scene name: <input type="text" name="name" value="Warfare Battlefield" style="width:200px"></label>`,
      callback: html => html.find("[name=name]").val(),
    });

    const sceneData = {
      name: name || "Warfare Battlefield",
      width: W,
      height: H,
      grid: { type: 1, size: GRID },
      backgroundColor: "#3a2a10",
      notes: [],
      drawings: [],
    };

    const scene = await Scene.create(sceneData);

    // Draw row labels as tiles (represented as notes since we can't draw shapes without canvas)
    const rowLabels = ["VANGUARD","RESERVE","CENTER","REAR"];
    const noteData = [];

    // Heroes' side (bottom half) row labels
    for (let r = 0; r < ROWS; r++) {
      noteData.push({
        x: -80,
        y: (ROWS + r) * GRID + GRID / 2,
        text: rowLabels[r],
        fontSize: 18,
        fontFamily: "Palatino Linotype",
        textColor: "#f5e8c8",
      });
      // Enemy side (top half, reversed)
      noteData.push({
        x: -80,
        y: (ROWS - 1 - r) * GRID + GRID / 2,
        text: rowLabels[r],
        fontSize: 18,
        fontFamily: "Palatino Linotype",
        textColor: "#c85050",
      });
    }

    ui.notifications.info(`Battlefield scene "${scene.name}" created! Activate it to begin warfare.`);
    scene.activate();
    return scene;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WARFARE COMBAT TRACKER (extends core CombatTracker)
// ─────────────────────────────────────────────────────────────────────────────

class WarfareCombatTracker extends CombatTracker {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "modules/kingdoms-warfare/templates/combat-tracker.hbs",
    });
  }

  /** Warfare initiative: roll 1d10, add COM bonus from the actor's units. */
  async _onCombatantControl(event) {
    return super._onCombatantControl(event);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HANDLEBARS HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function registerHelpers() {
  Handlebars.registerHelper("times", function(n, block) {
    let accum = "";
    for (let i = 0; i < n; i++) accum += block.fn({ ...this, "@index": i });
    return accum;
  });

  Handlebars.registerHelper("add", (a, b) => a + b);

  Handlebars.registerHelper("lt", (a, b) => a < b);

  Handlebars.registerHelper("eq", (a, b) => a === b);

  Handlebars.registerHelper("select", function(value, options) {
    const wrapper = $(`<select>${options.fn(this)}</select>`);
    wrapper.find(`[value="${value}"]`).attr("selected", true);
    return wrapper.html();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE SETTINGS
// ─────────────────────────────────────────────────────────────────────────────

function registerSettings() {
  game.settings.register("kingdoms-warfare", "defaultDC", {
    name: "Default Warfare DC",
    hint: "The target number for all warfare test rolls (default 10).",
    scope: "world",
    config: true,
    type: Number,
    default: 10,
  });

  game.settings.register("kingdoms-warfare", "autoDisorganize", {
    name: "Auto-mark Disorganized on Morale Failure",
    hint: "Automatically marks units as disorganized when they fail a Morale test.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MACRO / API HELPERS (accessible via game.warfareModule)
// ─────────────────────────────────────────────────────────────────────────────

const WarfareAPI = {
  /** Roll an attack for a unit item by name or ID */
  async rollAttack(unitNameOrId) {
    const item = game.items.get(unitNameOrId)
      ?? game.items.find(i => i.name === unitNameOrId && i.type === "warfareUnit");
    if (!item) return ui.notifications.error(`Unit "${unitNameOrId}" not found.`);
    const sheet = item.sheet;
    await sheet._onRoll("attack");
  },

  /** Create the standard battlefield scene */
  createBattlefield: () => WarfareBattlefieldTool.createBattlefieldScene(),

  /** Summarize all units in the world */
  listUnits() {
    const units = game.items.filter(i => i.type === "warfareUnit");
    console.table(units.map(u => ({
      name:      u.name,
      tier:      u.system.tier,
      type:      u.system.unitType,
      commander: u.system.commander,
      ATK: u.system.stats.atk,
      DEF: u.system.stats.def,
      POW: u.system.stats.pow,
      TOU: u.system.stats.tou,
      MOR: u.system.stats.mor,
      COM: u.system.stats.com,
      casualties: u.system.casualties,
    })));
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CHAT MESSAGE HOOKS
// ─────────────────────────────────────────────────────────────────────────────

Hooks.on("renderChatMessage", (message, html) => {
  // Add the kw-chat-card class rendering to chat cards if not already styled
  html.find(".kw-chat-card").css("font-family", "Palatino Linotype, serif");
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENE CONTROLS (add "Create Battlefield" button)
// ─────────────────────────────────────────────────────────────────────────────

Hooks.on("getSceneControlButtons", controls => {
  const tokenControls = controls.find(c => c.name === "token");
  if (tokenControls) {
    tokenControls.tools.push({
      name: "createBattlefield",
      title: "Create Warfare Battlefield",
      icon: "fas fa-chess-rook",
      button: true,
      onClick: () => WarfareBattlefieldTool.createBattlefieldScene(),
      visible: game.user.isGM,
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// WARFARE INITIATIVE
// Units roll 1d10 + their COM bonus. Commanders use their highest-COM unit.
// ─────────────────────────────────────────────────────────────────────────────

Hooks.on("createCombatant", async (combatant) => {
  // Auto-roll initiative for warfare units on entry
  const actor = combatant.actor;
  if (!actor) return;
  if (actor.type === "commander") {
    // Commander initiative: 1d10 + Operations skill
    const ops = actor.system?.skills?.operations ?? 0;
    const roll = await new Roll("1d10 + @ops", { ops }).evaluate();
    await combatant.update({ initiative: roll.total });
  }
});

/** Enrich combat tracker turns with warfare unit data for the template */
Hooks.on("renderCombatTracker", async (app, html, data) => {
  if (!data.turns) return;
  for (const turn of data.turns) {
    const actor = game.actors.get(turn.actorId);
    if (!actor) continue;
    if (actor.type === "commander") {
      turn.isWarfareUnit = false;
      // Show power pool in tracker
      const pp = actor.system?.powerPool;
      if (pp) {
        const badge = html.find(`.combatant[data-combatant-id="${turn.id}"] .token-name h4`);
        badge.append(`<span class="kw-combatant-badge" style="background:#3a5a20">PP ${pp.current}/${pp.max}</span>`);
      }
    }
  }
  // For items used as tokens (via linked actors of type warfareUnit), inject stat badges
  html.find(".combatant").each((i, el) => {
    const id = el.dataset.combatantId;
    const combatant = game.combat?.combatants.get(id);
    const actor = combatant?.actor;
    if (!actor) return;
    // If actor has warfareUnit items, show a quick summary
    const units = actor.items?.filter(i => i.type === "warfareUnit") ?? [];
    if (units.length > 0) {
      const totalATK = units.reduce((s, u) => s + (u.system.stats?.atk ?? 0), 0);
      const nameEl = el.querySelector(".token-name h4");
      if (nameEl) {
        const badge = document.createElement("span");
        badge.className = "kw-combatant-badge";
        badge.title = `${units.length} unit(s) commanded`;
        badge.textContent = `${units.length}u`;
        nameEl.appendChild(badge);
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DRAG-AND-DROP UNIT CARDS IN CHAT
// Players can drag a unit item from the sidebar to chat to post its stat block
// ─────────────────────────────────────────────────────────────────────────────

Hooks.on("hotbarDrop", (bar, data, slot) => {
  if (data.type !== "Item") return;
  const item = game.items.get(data.id ?? data.uuid?.split(".").pop());
  if (!item || item.type !== "warfareUnit") return;
  const sys = item.system;
  const macro = `
// Post ${item.name} stat block to chat
const item = game.items.get("${item.id}");
const s = item.system.stats;
ChatMessage.create({
  content: \`<div class="kw-chat-card">
    <div class="card-header"><i class="fas fa-chess-rook"></i> \${item.name} [Tier \${item.system.tier} \${item.system.unitType}]</div>
    <div class="card-body">
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;text-align:center;font-family:serif">
        <div><strong>ATK</strong><br>\${s.atk}</div>
        <div><strong>DEF</strong><br>\${s.def}</div>
        <div><strong>POW</strong><br>\${s.pow}</div>
        <div><strong>TOU</strong><br>\${s.tou}</div>
        <div><strong>MOR</strong><br>\${s.mor}</div>
        <div><strong>COM</strong><br>\${s.com}</div>
      </div>
      <div style="margin-top:4px;font-size:0.8em;color:#5a3a10">Commander: \${item.system.commander||"—"} | Casualties: \${item.system.casualties}/\${item.system.maxCasualties}</div>
    </div>
  </div>\`
});`;
  Macro.create({ name: `Post: ${item.name}`, type: "script", command: macro, img: item.img })
    .then(m => { bar.assignHotbarMacro(m, slot); });
  return false;
});

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT MENU on Items sidebar — quick-post stat block
// ─────────────────────────────────────────────────────────────────────────────

Hooks.on("getItemDirectoryEntryContext", (html, options) => {
  options.push({
    name: "Post Warfare Stat Block",
    icon: '<i class="fas fa-chess-rook"></i>',
    condition: li => {
      const item = game.items.get(li.data("documentId"));
      return item?.type === "warfareUnit";
    },
    callback: li => {
      const item = game.items.get(li.data("documentId"));
      if (!item) return;
      const s = item.system.stats;
      const traits = (item.system.traits ?? []).map(t =>
        `<div style="margin-top:3px"><strong>${t.name}.</strong> <span style="font-size:0.85em">${t.description}</span></div>`
      ).join("");
      ChatMessage.create({
        content: `
          <div class="kw-chat-card">
            <div class="card-header">
              <i class="fas fa-chess-rook"></i>
              ${item.name}
              <span style="font-size:0.8em; opacity:0.8">Tier ${item.system.tier} ${item.system.unitType}</span>
            </div>
            <div class="card-body">
              <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;text-align:center;font-family:serif;margin-bottom:6px">
                <div style="background:#fff8e8;border:1px solid #c8a050;border-radius:2px;padding:2px">
                  <div style="font-size:0.65em;color:#7a2020;font-weight:bold">ATK</div><strong>${s.atk}</strong></div>
                <div style="background:#fff8e8;border:1px solid #c8a050;border-radius:2px;padding:2px">
                  <div style="font-size:0.65em;color:#7a2020;font-weight:bold">DEF</div><strong>${s.def}</strong></div>
                <div style="background:#fff8e8;border:1px solid #c8a050;border-radius:2px;padding:2px">
                  <div style="font-size:0.65em;color:#7a2020;font-weight:bold">POW</div><strong>${s.pow}</strong></div>
                <div style="background:#fff8e8;border:1px solid #c8a050;border-radius:2px;padding:2px">
                  <div style="font-size:0.65em;color:#7a2020;font-weight:bold">TOU</div><strong>${s.tou}</strong></div>
                <div style="background:#fff8e8;border:1px solid #c8a050;border-radius:2px;padding:2px">
                  <div style="font-size:0.65em;color:#7a2020;font-weight:bold">MOR</div><strong>${s.mor}</strong></div>
                <div style="background:#fff8e8;border:1px solid #c8a050;border-radius:2px;padding:2px">
                  <div style="font-size:0.65em;color:#7a2020;font-weight:bold">COM</div><strong>${s.com}</strong></div>
              </div>
              <div style="font-size:0.8em;color:#5a3a10;margin-bottom:4px">
                Commander: <strong>${item.system.commander || "—"}</strong> &nbsp;|&nbsp;
                Size: ${item.system.size} &nbsp;|&nbsp;
                Casualties: ${item.system.casualties}/${item.system.maxCasualties}
                ${item.system.disorganized ? '<span style="color:#c85050"> ⚠ Disorganized</span>' : ""}
              </div>
              ${traits ? `<div style="border-top:1px solid #c8a050;padding-top:4px">${traits}</div>` : ""}
            </div>
          </div>`,
        speaker: ChatMessage.getSpeaker(),
      });
    },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// INIT HOOK
// ─────────────────────────────────────────────────────────────────────────────

Hooks.once("init", () => {
  console.log("Kingdoms & Warfare | Initializing module");

  // Register data models
  CONFIG.Item.dataModels  = CONFIG.Item.dataModels  ?? {};
  CONFIG.Actor.dataModels = CONFIG.Actor.dataModels ?? {};
  CONFIG.Item.dataModels["warfareUnit"]  = WarfareUnitData;
  CONFIG.Actor.dataModels["commander"]   = CommanderData;

  // Register sheets
  Items.registerSheet("kingdoms-warfare", WarfareUnitSheet, {
    types: ["warfareUnit"],
    makeDefault: true,
    label: "Warfare Unit Sheet",
  });
  Actors.registerSheet("kingdoms-warfare", CommanderSheet, {
    types: ["commander"],
    makeDefault: true,
    label: "Commander / Domain Sheet",
  });

  // Register item/actor type labels
  CONFIG.Item.typeLabels  = CONFIG.Item.typeLabels  ?? {};
  CONFIG.Actor.typeLabels = CONFIG.Actor.typeLabels ?? {};
  CONFIG.Item.typeLabels["warfareUnit"] = "Warfare Unit";
  CONFIG.Actor.typeLabels["commander"]  = "Commander";

  registerHelpers();
  registerSettings();

  // Expose API
  game.warfareModule = WarfareAPI;

  console.log("Kingdoms & Warfare | Ready. Access API via game.warfareModule");
});

Hooks.once("ready", () => {
  // Friendly startup message to GMs
  if (game.user.isGM) {
    ui.notifications.info(
      "Kingdoms & Warfare module loaded. Create 'Warfare Unit' items and 'Commander' actors to get started!",
      { permanent: false }
    );
  }
});