from infrastructure.models.product_model import ProductModel

from domain.models.product import Product

from infrastructure.databases.mssql import session

 

class ProductRepository:

    def __init__(self, db_session=session):

        self.session = db_session

 

    def add(self, prod: Product):

        try:

            db_prod = ProductModel(

                product_name=prod.product_name,

                owner_id=prod.owner_id,

                selling_price=prod.selling_price,

                stock_quantity=prod.stock_quantity

            )

            self.session.add(db_prod)

            self.session.commit()

            self.session.refresh(db_prod)

            return db_prod

        except Exception as e:

            self.session.rollback()

            raise e

 

    def get_all(self):

        return self.session.query(ProductModel).all()