from pydantic import BaseModel

class Item(BaseModel):
    sku: str
    qty: int
    price: float

class Order(BaseModel):
    order_id: str
    items: list[Item]
    total: float

def validate_order_rules(order: Order):
    errors = []

    # check at least one item
    if len(order.items) < 1:
        errors.append({"field": "items", "message": "Order must contain at least one item"})

    # check each item
    i = 0
    for item in order.items:
        if item.qty < 1:
            errors.append({"field": f"items[{i}].qty", "message": f"Quantity for SKU {item.sku} must be at least 1"})
        if item.price <= 0:
            errors.append({"field": f"items[{i}].price", "message": "Price must be greater than 0"})
        if item.sku.strip() == "":
            errors.append({"field": f"items[{i}].sku", "message": "SKU cannot be blank"})
        i += 1

    # check total matches sum of items
    expected = sum(item.qty * item.price for item in order.items)
    if abs(order.total - expected) > 0.01:
        errors.append({"field": "total", "message": "Total does not match items"})

    return errors