from marshmallow import Schema, fields

class BoardSchema(Schema):
    
    id = fields.Int(dump_only=True)
    name = fields.Str(required= True)
    created_at = fields.DateTime(dump_only = True)
    owner = fields.Int(dump_only=True)