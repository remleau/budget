migrate((db) => {
  const collection = new Collection({
    "id": "wygbodbsev131eh",
    "created": "2023-03-21 03:24:17.320Z",
    "updated": "2023-03-21 03:24:17.320Z",
    "name": "goals",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9hpjvpcu",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
            "name",
            "icon"
          ]
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wygbodbsev131eh");

  return dao.deleteCollection(collection);
})
