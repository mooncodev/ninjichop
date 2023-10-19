//https://stripe.com/docs/api/subscriptions/object
const o = {
  "id": "sub_1MUdmoD1nNXXpxulj0Xybjf4",
  "object": "subscription",
  "application": null,
  "application_fee_percent": null,
  "automatic_tax": {
    "enabled": false
  },
  "billing_cycle_anchor": 1674771554,
  "billing_thresholds": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": null,
  "collection_method": "charge_automatically",
  "created": 1674771554,
  "currency": "usd",
  "current_period_end": 1677449954,
  "current_period_start": 1674771554,
  "customer": "cus_NEVap82sQScdLo",
  "days_until_due": null,
  "default_payment_method": "pm_1MUdnPD1nNXXpxul1ivaytWl",
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discount": null,
  "ended_at": null,
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_NF82CsKWgai4dL",
        "object": "subscription_item",
        "billing_thresholds": null,
        "created": 1674771555,
        "metadata": {},
        "price": {
          "id": "price_1MRALPD1nNXXpxulIVWwszk9",
          "object": "price",
          "active": true,
          "billing_scheme": "per_unit",
          "created": 1673943395,
          "currency": "usd",
          "custom_unit_amount": null,
          "livemode": false,
          "lookup_key": "premium",
          "metadata": {},
          "nickname": null,
          "product": "prod_NBXQq5XpkJzHkQ",
          "recurring": {
            "aggregate_usage": null,
            "interval": "month",
            "interval_count": 1,
            "usage_type": "licensed"
          },
          "tax_behavior": "inclusive",
          "tiers_mode": null,
          "transform_quantity": null,
          "type": "recurring",
          "unit_amount": 3999,
          "unit_amount_decimal": "3999"
        },
        "quantity": 1,
        "subscription": "sub_1MUdmoD1nNXXpxulj0Xybjf4",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "url": "/v1/subscription_items?subscription=sub_1MUdmoD1nNXXpxulj0Xybjf4"
  },
  "latest_invoice": "in_1MUdmoD1nNXXpxulx4Y1kvR0",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "on_behalf_of": null,
  "pause_collection": null,
  "payment_settings": {
    "payment_method_options": null,
    "payment_method_types": null,
    "save_default_payment_method": "on_subscription"
  },
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "schedule": null,
  "start_date": 1674771554,
  "status": "active",
  "test_clock": null,
  "transfer_data": null,
  "trial_end": null,
  "trial_start": null
}
