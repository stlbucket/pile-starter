exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS leaf.inventory_type_rule;
DROP TYPE IF EXISTS leaf.intermediate_type CASCADE;
DROP TYPE IF EXISTS leaf.lf_product_stage CASCADE;
`

const upScript = `
CREATE TYPE leaf.intermediate_type AS ENUM (
  'marijuana_mix',
  'non_solvent_based_concentrate',
  'hydrocarbon_concentrate',
  'CO2_concentrate',
  'ethanol_concentrate',
  'food_grade_solvent_concentrate',
  'infused_cooking_medium',
  'liquid_edible',
  'solid_edible',
  'concentrate_for_inhalation',
  'topical',
  'infused_mix',
  'packaged_marijuana_mix',
  'sample_jar',
  'usable_marijuana',
  'capsules',
  'tinctures',
  'transdermal_patches',
  'suppository',
  'seeds',
  'clones',
  'plant_tissue',
  'mature_plant',
  'non_mandatory_plant_sample',
  'flower',
  'flower_lots',
  'other_material',
  'other_material_lots',
  'waste'
);

CREATE TYPE leaf.lf_product_stage AS ENUM (
  'intermediate_product',
  'end_product',
  'immature_plant',
  'mature_plant',
  'harvest_materials',
  'waste'
);

CREATE TABLE leaf.inventory_type_rule (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  product_stage leaf.lf_product_stage NOT NULL,
  intermediate_type leaf.intermediate_type NOT NULL,
  im_key text,
  soro_inventory_type_id uuid,
  CONSTRAINT pk_inventory_type_rule PRIMARY KEY (id)
);

INSERT INTO leaf.inventory_type_rule(
  product_stage,
  intermediate_type,
  im_key
)
VALUES
  ('intermediate_product', 'marijuana_mix', 'marijuanaMix'),
  ('intermediate_product', 'non_solvent_based_concentrate', 'infusedButter'),
  ('intermediate_product', 'hydrocarbon_concentrate', 'hydrocarbonWax'),
  ('intermediate_product', 'CO2_concentrate', 'co2HashOil'),
  ('intermediate_product', 'food_grade_solvent_concentrate', 'extractSolvent'),
  ('intermediate_product', 'infused_cooking_medium', 'infusedCookingOil'),
  ('intermediate_product', 'flower_lots', 'flowerLot'),
  ('intermediate_product', 'other_material_lots', 'otherPlantMaterialLot'),
  ('intermediate_product', 'ethanol_concentrate', 'bubbleHash'),
  
  ('end_product', 'liquid_edible', 'liquidInfusedEdible'),
  ('end_product', 'solid_edible', 'solidInfusedEdible'),
  ('end_product', 'concentrate_for_inhalation', 'extractForInhalation'),
  ('end_product', 'topical', 'infusedTopical'),
  ('end_product', 'infused_mix', 'marijuanaMixInfused'),
  ('end_product', 'packaged_marijuana_mix', 'marijuanaMixPackaged'),
  ('end_product', 'sample_jar', 'sampleJar'),
  ('end_product', 'usable_marijuana', 'usableMarijuana'),
  ('end_product', 'capsules', 'capsule'),
  ('end_product', 'tinctures', 'tincture'),
  ('end_product', 'transdermal_patches', 'transdermalPatch'),
  ('end_product', 'suppository', 'suppository'),

  ('immature_plant', 'seeds', 'seed'),
  ('immature_plant', 'clones', 'clone'),
  ('immature_plant', 'plant_tissue', 'plantTissue'),

  ('mature_plant', 'mature_plant', 'maturePlant'),
  ('mature_plant', 'non_mandatory_plant_sample', 'nonMandatoryQASample'),

  ('harvest_materials', 'flower', 'flower_raw'),
  ('harvest_materials', 'other_material', 'otherPlantMaterial'),

  ('waste', 'waste', 'waste')
;

UPDATE leaf.inventory_type_rule itr
SET soro_inventory_type_id = (
  SELECT id
  FROM soro.inventory_type it
  WHERE it.im_key = itr.im_key
);
`
