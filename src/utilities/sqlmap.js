const responses = { tableName: 'users', howMany: 'some', constraints: [{ column: 'age', isEqual: 2, min: 1, max: 10 }, { column: 'weight', isEqual: null, min: 50, max: 80 }]}
 const generateSQLQuery = (responses) => {
    let SQL_QUERY;
    if (responses.howMany === 'all') {
        SQL_QUERY = 'SELECT * FROM ' + responses.tableName
    } else {
        if (responses.constraints.length > 1 ) {
            SQL_QUERY = 'SELECT * FROM ' + responses.tableName + ' WHERE ' 
            responses.constraints.forEach((constraint, idx) => {
                if (constraint.isEqual) {
                    SQL_QUERY += constraint.column + ' = ' + constraint.isEqual 
                } else {
                    if (constraint.min && constraint.max) {
                        SQL_QUERY += constraint.column + ' BETWEEN ' + constraint.min + ' AND ' + constraint.max
                    } else if (constraint.min) {
                        SQL_QUERY += constraint.column + ' > ' + constraint.min
                    } else if (constraint.max) {
                        SQL_QUERY += constraint.column + ' < ' + constraint.max
                    } else {
                    }
                }
                if (idx < responses.constraints.length - 1) {
                    SQL_QUERY += ' AND '
                }
            })
        }
    }
    return SQL_QUERY + ';'
}

const generateSequelizeQuery = (responses) => {
    let sequelizeQuery; 
    if (responses.howMany === 'all') {
        sequelizeQuery = `${responses.tableName}.findAll()` 
    } else {
        if (responses.constraints.length > 1) {
            sequelizeQuery = `${responses.tableName}.findAll({where: {` 
            responses.constraints.forEach((constraint, idx) => {
                if (constraint.isEqual) {
                    sequelizeQuery+= `${constraint.column} : ${constraint.isEqual}` 
                } else {
                    if (constraint.min && constraint.max) {
                        sequelizeQuery += `${constraint.column} : {Op.between: [${constraint.min}, ${constraint.max}]}`
                    } else if (constraint.min) {
                        sequelizeQuery += `${constraint.column} : {Op.gte: ${constraint.min}}`
                    } else if (constraint.max) {
                        sequelizeQuery += `${constraint.column} : {Op.lte: ${constraint.max}}`
                    } else {
                    }
                }
                if (idx < responses.constraints.length - 1) {
                    sequelizeQuery += `,`
                }
            })
        }
    }
    return sequelizeQuery + `}})`
}

console.log(generateSQLQuery(responses))
console.log(generateSequelizeQuery(responses))

