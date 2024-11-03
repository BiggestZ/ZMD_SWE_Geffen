# This will convert a MySQL dump file to a SQLite3 dump file


import pandas as pd
import sqlite3
from sqlalchemy import create_engine, inspect

# MySQL Connection (replace pw with your db password)
mysql_engine = create_engine('mysql+pymysql://root:pw@localhost/Geffen_db')

# SQLite Connection
sqlite_engine = create_engine("sqlite:///sqlite_database.db")

# Get MySQL tables using SQLAlchemy's inspector
inspector = inspect(mysql_engine)
tables = inspector.get_table_names()

# Loop through tables and transfer data
for table_name in tables:
    print(f"Transferring {table_name}...")
    
    # Read table from MySQL
    df = pd.read_sql_table(table_name, mysql_engine)
    
    # Write table to SQLite
    df.to_sql(table_name, sqlite_engine, index=False, if_exists='replace')

print("Data transfer complete!")

