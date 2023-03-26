migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tc4nysu3",
    "name": "categories",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "a2o9ikr4vqft8vd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tc4nysu3",
    "name": "categorie_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "a2o9ikr4vqft8vd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
