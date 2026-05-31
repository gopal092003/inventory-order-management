from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# ==================================================
# Low Stock Product
# ==================================================

class LowStockProduct(BaseModel):
    id: int
    name: str
    sku: str
    stock_quantity: int
    price: Decimal

    model_config = ConfigDict(
        from_attributes=True,
    )


# ==================================================
# Dashboard Statistics
# ==================================================

class DashboardStats(BaseModel):
    total_products: int
    total_customers: int
    total_orders: int


# ==================================================
# Dashboard Response
# ==================================================

class DashboardResponse(BaseModel):
    stats: DashboardStats
    low_stock_products: list[LowStockProduct]

    model_config = ConfigDict(
        from_attributes=True,
    )