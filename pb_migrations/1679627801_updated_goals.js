migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jmisdhcf",
    "name": "due_time",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // remove
  collection.schema.removeField("jmisdhcf")

  return dao.saveCollection(collection)
})