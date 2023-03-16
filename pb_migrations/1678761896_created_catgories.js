migrate((db) => {
  const collection = new Collection({
    "id": "a2o9ikr4vqft8vd",
    "created": "2023-03-14 02:44:56.784Z",
    "updated": "2023-03-14 02:44:56.784Z",
    "name": "catgories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "buucvpc9",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("a2o9ikr4vqft8vd");

  return dao.deleteCollection(collection);
})
