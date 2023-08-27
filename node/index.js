const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

async function createApp() {

  const query = async (sql) => {
    const config = {
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'nodedb'
    };

    const connection = mysql.createConnection(config);

    const results = await new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    connection.end();
    return results;
  };

  await query("CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");

  const insertPeople = async (people) => {
    const sql = `INSERT INTO people(name) values('${people}');`;
    return await query(sql);
  };

  const listPeople = async () => {
    const sql = `SELECT * FROM nodedb.people;`;
    return await query(sql);
  };

  app.get('/', async (req, res) => {
    await insertPeople("Vinicius");
    const people = await listPeople();
    const html = `
      <h1>Full Cycle Rocks!</h1>
      <br />
      <ul>
        ${people.map((p) => (
          `<li>${p.name}</li>`
        )).join("")}
      </ul>
    `;

    res.send(html);
  })
}

createApp().then(() => {
  app.listen(port, () => {
    console.log("Rodando na porta: " + port);
  });
});
