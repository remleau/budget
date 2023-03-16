migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0pshhunq",
    "name": "background_image",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": [
        "www.unsplash.com"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0pshhunq",
    "name": "background_image",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": [
        "unsplash.com"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
