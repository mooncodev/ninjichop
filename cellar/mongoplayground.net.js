const dataset = [
  {
    "key": 1
  },
  {
    "_id": {
      "$oid": "63d060efca516f36df62d146"
    },
    "apiKeyHash": "BBBBB",
    "email": "mooncodev@gmail.com",
    "uid": "uid_1111",
    "customerId": "cus_1111",
    "subscriptions": [
      {
        "subscriptionId": "sub_AAAA",
        "clientSecret": "pi_AAAA",
        "status": "created"
      },
      {
        "subscriptionId": "sub_BBBB",
        "clientSecret": "pi_BBBB",
        "status": "incomplete"
      },

    ]
  }
]

db.collection.update(
  { "uid": "uid_1111", },
  {
    "$pull": {
      "subscriptions": {
        subscriptionId: "sub_AAAA"
      }
    }
  },
  { "multi": false, "upsert": false }
)

db.collection.update(
  { "uid": "uid_1111", },
  {
    "$set": {
      "apiKeyHash": "GGGGGGGG"
    }
  },
  { "multi": false, "upsert": true }
)
