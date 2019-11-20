const responses = { tableName: 'users', howMany: 'some', constraints: [{ column: 'age', min: '1', max: '10' }, { column: 'weight', min: '50', max: '80' }]}
export const generateQuery = (responses) => {
    let SQL_QUERY;
    if (responses.howMany === 'all') {
        SQL_QUERY = 'SELECT * FROM ' + responses.tableName
    } else {
        if (responses.constraints > 1 ) {
            SQL_QUERY = 'SELECT * FROM ' + responses.tableName + ' WHERE ' 
            responses.constraints.forEach((constraint, idx) => {
                if (constraint.min && constraint.max) {
                    SQL_QUERY += constraint.column + ' BETWEEN ' + constraint.min + ' AND ' + constraint.max
                } else if (constraint.min) {
                    SQL_QUERY += constraint.column + ' > ' + constraint.min
                } else if (constraint.max) {
                    SQL_QUERY += constraint.column + ' < ' + constraint.max
                } else {

                }
                
                if (idx < responses.constraints.length - 1) {
                    SQL_QUERY += ' AND '
                }
            })
        }
    }
}


