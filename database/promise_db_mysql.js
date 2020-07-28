const connection = require('./db_mysql')

class MySQLDatabase{
    constructor(){
        this.con = connection
    }
    
    run(sql, params){
        return new Promise((resolve, reject)=>{
            this.con.query(sql,params, (err, result)=>{
                if (err){
                    return reject(err);
                }else if(result.insertId){
                    resolve(result.insertId);
                }else if(result.changedRows){
                    resolve(result.changedRows)
                }else{
                    resolve(result)
                }
            });
        });
    }

    get(sql, params){
        return new Promise((resolve, reject)=>{
            this.con.query(sql, params, (err, result)=>{
                if (err){                    
                    reject(err);
                }else{                                       
                    resolve(result);
                }                                    
            })
        })
    }
}

module.exports =  new MySQLDatabase();