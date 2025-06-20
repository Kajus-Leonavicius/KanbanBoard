from marshmallow import fields, Schema

class TaskSchema(Schema):
    
    id = fields.Int(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required= True)
    status = fields.String(required= True)
    created_at = fields.DateTime(dump_only = True)
    created_by = fields.Int(required=True)
    column_id = fields.Int(required=True)
    

class TaskUpdateSchema(Schema):
    title = fields.String()
    description = fields.String()
    status = fields.String()
    created_by = fields.Int()
    column_id = fields.Int()