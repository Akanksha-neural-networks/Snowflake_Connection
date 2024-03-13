import { Injectable } from '@nestjs/common';
import * as snowflake from 'snowflake-sdk';

@Injectable()
export class SnowflakeService {
  private connection;

  constructor() {
    this.connection = snowflake.createConnection({
      account: 'hu87315.ap-southeast-1',
      username: 'AKANKSHACDK25',
      password: 'J#u9pL$2k@q8zR',
      warehouse: 'COMPUTE_WH',
      database: 'COLLEGE',
      schema: 'PUBLIC',
      role: 'ACCOUNTADMIN',
    });
    new Promise((resolve, reject) => {
      this.connection.connect((err, conn) => {
        if (err) {
          reject(err);
        } else {
          console.log('Successfully connected to Snowflake.');
          resolve('');
        }
      });
    });
  }

  //   async connect(): Promise<void> {
  //     return new Promise((resolve, reject) => {
  //       this.connection.connect((err, conn) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           console.log('Successfully connected to Snowflake.');
  //           resolve();
  //         }
  //       });
  //     });
  //}

  async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.connection) {
        this.connection.destroy((err) => {
          if (err) {
            console.error('Error disconnecting from Snowflake: ' + err.message);
          } else {
            console.log('Disconnected from Snowflake.');
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  async executeQuery(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.connection.execute({
        sqlText: query,
        complete: (err, stmt, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      });
    });
  }
}
function reject(err: any) {
  throw new Error('Function not implemented.');
}

function resolve() {
  throw new Error('Function not implemented.');
}
