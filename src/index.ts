import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import * as db from 'mysql';
import {Sequelize, Model} from 'sequelize';
import { users } from "./model/users";
import uuid = require('uuid');

const sequelize = new Sequelize('exams', 'root', 'sharni9905', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

// const connection = db.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sharni9905',
//     database: 'hapidb'
// });

const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
            // connection.query('SELECT * FROM users limit 1', (error, results, fields) => {
            //     if (error) throw error;
            //     console.log(results);
            // });
            sequelize.authenticate().then(() => {
                    console.log('Connection has been established successfully.');
            }).catch(err => {
                    console.error('Unable to connect to the database:', err);
            });

            users.create(
                {
                    user_id: 12,
                    email: 'omShivaya'
                }
            ).then((res: any) => {
                console.log(JSON.parse(JSON.stringify(res)))
                users.findAll(
                    {
                        attributes: ['email']
                    }
                ).then((users: any) => {
                    console.log(JSON.parse(JSON.stringify(users)));
                });
            }).catch((err: any) => {
                console.log(err);
            });
            return("Success");
        }
    });
    await server.start();
    console.log('Server running ');

};

try {
    init();
} catch(error) {
    console.log("Error:", error);
    process.exit(1);
}
