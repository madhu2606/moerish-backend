class UserModel {
    constructor() {
        this.tableName = "users";
    }

    insertNewRecord(data) {
     
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let query = `INSERT INTO ${that.tableName} SET ?`;
                global.sql.query(query, data, (err, result) => {
                    if (err) {
                        resolve({
                            success: false,
                            data: 'Insertion Failed'
                        });
                    }
                    else {
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

    getAllRecords(fields) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let query = `Select ${fields.toString()} FROM ${that.tableName}`;
                global.sql.query(query, (err, result) => {
                    if (err) {
                        resolve({
                            success: false,
                            data: 'No Records Found'
                        });
                    }
                    else {
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

    getSingleRecord(query) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                global.sql.query(query, (err, result) => {
                    if (err) {
                        resolve({
                            success: false,
                            data: 'No Records Found'
                        });
                    }
                    else {
                        if(result.length > 0) {
                            resolve({
                                success: true,
                                data: result
                            });
                        } else {
                            resolve({
                                success: false,
                                data: result
                            });
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateRecord(columns, data, condition) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                let query = `UPDATE ${that.tableName} SET `;
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
                    }
                    else {
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

module.exports = new UserModel();