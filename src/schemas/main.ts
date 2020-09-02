export default {
    "findAll": {
        "req": {
            "additionalProperties": false,
            "properties": {
            },
            "required": []
        },
        "res": {
            "additionalProperties": true,
                "properties": {
                "status": {
                    "type": "boolean"
                },
                "message": {
                    "type": "string"
                },
                "error": {
                    "type": "object"
                },
                "data": {
                    "additionalProperties": false,
                    "type": "array",
                    "items": {
                        "additionalProperties": false,
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "number"
                            },
                            "name": {
                                "type": "string"
                            }
                        },
                    }
                }
            },
            "required": ["status", "message", "error", "data"]
        }
    },     
    "getDetail": {
        "req": {
            "additionalProperties": false,
            "properties": {
                "id":{
                    "type":"string"
                }
            },
            "required": ["id"]
        },
        "res": {
            "additionalProperties": false,
                "properties": {
                "status": {
                    "type": "boolean"
                },
                "message": {
                    "type": "string"
                },
                "error": {
                    "type": "object"
                },
                "data": {
                    "additionalProperties": false,
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "required":["id","name"]                  
                }
            },
            "required": ["status", "message", "error", "data"]
        }
    },     
}