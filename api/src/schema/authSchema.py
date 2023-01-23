signup_schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string'},
        'password': {'type': 'string'},
        'role': {'type': 'number'}
    },
    'required': ['email', 'password', 'role']
}

signin_schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string'},
        'password': {'type': 'string'},
        'role': {'type': 'number'}
    },
    'required': ['email', 'password', 'role']
}
