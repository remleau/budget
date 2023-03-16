migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd")

  collection.name = "categories"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd")

  collection.name = "catgories"

  return dao.saveCollection(collection)
})
