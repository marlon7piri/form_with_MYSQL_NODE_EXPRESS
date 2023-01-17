const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const PUERTO = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
  user: "root",
  password: "marlon7piri",
  host: "localhost",
  database: "bartenders",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const cargo = req.body.cargo;
  const email = req.body.email;
  const edad = req.body.edad;

  db.query(
    `INSERT INTO tabla_bartenders(nombre,cargo,email,edad) VALUES(?,?,?,?)`,
    [nombre, cargo, email, edad],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Registro exitoso");
      }
    }
  );
});

app.get("/", (req, res) => {
  db.query(`SELECT * FROM tabla_bartenders`, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM tabla_bartenders WHERE id=?`, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const cargo = req.body.cargo;
  const id = req.body.id;

  db.query(
    "UPDATE tabla_bartenders SET cargo = ? WHERE id = ?",
    [ cargo, id ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});



app.listen(PUERTO, () => {
  console.log(`the server is listening in the port ${PUERTO}`);
});
