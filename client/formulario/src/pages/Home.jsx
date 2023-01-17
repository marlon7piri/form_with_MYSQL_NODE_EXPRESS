import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");

  const [equipo, setEquipo] = useState([]);
  const [newCargo, setNewCargo] = useState("salonero");

  //funcion para agragar los usuarios
  const agregarBartenders = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/create", {
        nombre: nombre,
        cargo: cargo,
        email: email,
        edad: edad,
      })
      .then(() => {
        setEquipo([
          ...equipo,
          {
            nombre: nombre,
            cargo: cargo,
            email: email,
            edad: edad,
          },
        ]);
      });
  };

  //funcion para obtener los usuarios
  const getUsers = () => {
    axios.get("http://localhost:3000").then((response) => {
      setEquipo(response.data);
    });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
      const newEquipo = equipo.filter((item) => item.id != id);
      setEquipo(newEquipo);
    });
  };
  const updateUser = async(id) => {
    await axios.put("http://localhost:3000/update", { id: id,cargo: newCargo })
    .then((response) => {
      setEquipo(
        equipo.map((user) => {
          return user.id == id
            ? {
            id:user.id,
              nombre: user.nombre, 
              cargo:newCargo, 
              email: user.email,
               edad: user.edad }
            : user;
        })
      );
    });
  };

  return (
    <div className="App">
      <h1>Formulario de Bartenders</h1>

      <form className="formulario">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            value={nombre}
          />
        </div>
        <div className="form-group">
          <label>Cargo:</label>
          <input
            type="text"
            onChange={(e) => {
              setCargo(e.target.value);
            }}
            value={cargo}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Edad:</label>
          <input
            type="number"
            onChange={(e) => {
              setEdad(e.target.value);
            }}
            value={edad}
          />
        </div>
        <button onClick={agregarBartenders} className="btn btn-primary">
          Agregar
        </button>
      </form>

      <button onClick={getUsers} className="btn btn-primary">
        Ver Usuarios
      </button>

      {equipo.length == 0 ? <h1> No hay usuarios</h1> : ``}

      <div className="">
        {equipo.map((e) => {
          return (
            <table key={e.id} className="table table-dark">
              <thead className="thead-dark">
                <tr>
                  <th>id</th>
                  <th>Nombre</th>
                  <th>Cargo</th>
                  <th>Email</th>
                  <th>Edad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{e.id}</td>
                  <td>{e.nombre}</td>
                  <td>{e.cargo}</td>
                  <td>{e.email} </td>
                  <td>{e.edad}</td>
                  <div>
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => deleteUser(e.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateUser(e.id)}
                    >
                      Update
                    </button>
                  </div>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}
