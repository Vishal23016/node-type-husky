export default {
    "addTodo": {
        "req": {
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string"
                }
            },
            "required": ["name"]
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
                    "type": ["object", "array", "null"]
                },
                "data": {
                    "type": ["object", "array", "null"]
                }
            },
            "required": ["status", "message", "error", "data"]
        }
    },
    "getTodoList": {
        "req": {
            "additionalProperties": false,
            "properties": {
                "pageNo": {
                    "type": "string"
                },
                "limit": {
                    "type": "string"
                },
                "search": {
                    "type": "string"
                }
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
                    "type": ["object", "array", "null"]
                },
                "data": {
                    "type": ["object", "array", "null"]
                },
                "totalLength": {
                    "type": "number"
                }
            },
            "required": ["status", "message", "error", "data"]
        }
    }
}