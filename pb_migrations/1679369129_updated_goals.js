migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tiuspf9d",
    "name": "description",
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
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // remove
  collection.schema.removeField("tiuspf9d")

  return dao.saveCollection(collection)
})
