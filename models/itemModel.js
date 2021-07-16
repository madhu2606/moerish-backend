class ItemModel {
    constructor() {
     
    }

    saveitemDetails(data,table) {
        let that = this;
        
        return new Promise(async (resolve, reject) => {
            try {
                let query = `INSERT INTO ${table} SET ?`;
                global.sql.query(query, data, (err, result) => {
                    if (err) {
                        console.log(err)
                        resolve({
                            success: false,
                            data: 'Insertion Failed'
                        });
                    } else {
                        resolve({
                            success: true,
                            data: result
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateitemDetails(columns, data, condition,table) {

        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let query = `UPDATE ${table} SET `;
                let len = columns.length - 1;
                for (let col in columns) {
                    if (len == col)
                        query += columns[col] + ' = ? ';
                    else
                        query += columns[col] + ' = ?, ';
                }
                if (condition)
                    query += 'WHERE ' + condition;
                // console.log(query);
                global.sql.query(query, data, (err, result) => {
                    if (err) {
                        console.log(err);
                        resolve({
                            success: false,
                            data: 'No Records Found'
                        });
                    } else {
                        resolve({
                            success: true,
                            data: result
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteItem(condition,table) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let query = `DELETE FROM ${table} WHERE ${condition}`;
                global.sql.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        resolve({
                            success: false,
                            data: 'No Records Found'
                        });
                    } else {
                        resolve({
                            success: true,
                            data: result
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    selectItem(columns,condition,table) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let query = `SELECT ${columns} FROM ${table}`;
                if (condition)
                    query += 'WHERE ' + condition;
                global.sql.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        resolve({
                            success: false,
                            data: 'No Records Found'
                        });
                    } else {
                        resolve({
                            success: true,
                            data: result
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }


}


module.exports = new ItemModel();