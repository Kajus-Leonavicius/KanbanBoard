from marshmallow import Schema, fields

class UserSchema(Schema):
    
    id = fields.Int(dump_only=True)
    name = fields.Str(required = True)
    surname = fields.Str(required=True)
    email = fields.Str(required= True)
    password = fields.Str(required=True)
    
class UserLoginSchema(Schema): 
    id = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    access_token = fields.Str()
    name = fields.Str()
    surname = fields.Str()
    