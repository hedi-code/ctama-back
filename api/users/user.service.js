const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(firstname, lastname, email, role, password) 
                values(?,?,?,?,?)`,
      [data.first_name, data.last_name, data.email, data.role, data.password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstname,lastname,email,role from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `select id,firstname,lastname,email,role from users`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set firstname=?, lastname=?, email=?, role=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.role,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUserPassword: (data, callBack) => {
    pool.query(
      `update users set password=? where id = ?`,
      [

        data.password,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  /* deleteUser: (data, callBack) => {
     pool.query(
       `delete from users where id = ?`,
       [data.id],
       (error, results, fields) => {
         if (error) {
           callBack(error);
         }
         return callBack(null, results[0]);
       }
     );
     console.log(data.id);
 
   },*/
  deleteUser: (id, callBack) => {
    pool.query(
      `delete from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
    console.log(id);

  }
};
