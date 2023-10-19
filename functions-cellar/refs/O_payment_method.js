//https://stripe.com/docs/api/payment_methods/object
const o = {
  "id": "pm_1MUzn3D1nNXXpxul3biTdLq3",
  "object": "payment_method",
  "billing_details": {
    "address": {
      "city": "San Francisco",
      "country": "US",
      "line1": "510 Townsend St",
      "line2": null,
      "postal_code": "94103",
      "state": "CA"
    },
    "email": "jenny@example.com",
    "name": null,
    "phone": "+15555555555"
  },
  "card": {
    "brand": "visa",
    "checks": {
      "address_line1_check": null,
      "address_postal_code_check": null,
      "cvc_check": "pass"
    },
    "country": "US",
    "exp_month": 8,
    "exp_year": 2024,
    "fingerprint": "CGehHVeb6Nc939Co",
    "funding": "credit",
    "generated_from": null,
    "last4": "4242",
    "networks": {
      "available": [
        "visa"
      ],
      "preferred": null
    },
    "three_d_secure_usage": {
      "supported": true
    },
    "wallet": null
  },
  "created": 123456789,
  "customer": null,
  "livemode": false,
  "metadata": {
    "order_id": "123456789"
  },
  "type": "card"
}
