vacation_schema = {
    'type': 'object',
    'properties': {
        'vacation_name': {'type': 'string'},
        'start_date': {'type': 'string'},
        'end_date': {'type': 'string'}
    },
    'required': ['vacation_name', 'start_date', 'end_date']
}

fetch_vacation_schema = {
    'type': 'object',
    'properties': {
        'vacation_name': {'type': 'string'},
        'start_date': {'type': 'string'},
        'end_date': {'type': 'string'}
    }
}