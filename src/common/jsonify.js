export const jsonify = (rows) => {
    let array = [];

    rows.forEach(columns => {
        let object = {};
        columns.forEach(column => object[column.metadata.colName] = column.value);
        array.push(object);
    })

    return array;
};