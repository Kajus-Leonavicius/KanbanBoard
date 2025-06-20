from marshmallow import fields, Schema

class ColumnSchema(Schema):
    
    id = fields.Int(dump_only=True)
    name = fields.String(required=True)