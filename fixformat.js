const data = await fetch("modules/kingdoms-warfare/packs/saxton-units.json").then(r => r.json());
const pack = game.packs.get("kingdoms-warfare.saxton-units");

for (let item of data) {
  await pack.importDocument(new CONFIG.Item.documentClass(item));
}