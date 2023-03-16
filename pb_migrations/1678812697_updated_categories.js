migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oob4tjpo",
    "name": "icon",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd")

  // remove
  collection.schema.removeField("oob4tjpo")

  return dao.saveCollection(collection)
})
