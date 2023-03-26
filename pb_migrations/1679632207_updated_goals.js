migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2ju8qmxi",
    "name": "money_goal",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2ju8qmxi",
    "name": "money_goal",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 1700
    }
  }))

  return dao.saveCollection(collection)
})
