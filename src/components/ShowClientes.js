//Trabajo realizado por  YURI VIVIANA ARTUNDUAGA HUERTAS Y EDWAR STEVEN TRIANA DE LA FICHA 2675859

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowClientes.css';

const ShowClientes = () => {
  // Estado para almacenar los datos de los clientes
  const [clientes, setClientes] = useState([]);
  // Estado para determinar el tipo de formulario a mostrar
  const [formType, setFormType] = useState('');
  // Estado para almacenar los datos de la nueva entrada (cliente, empleado o proveedor)
  const [newEntry, setNewEntry] = useState({
    name: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  // Efecto para cargar los clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Función para obtener los clientes desde el servidor
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  // Función para agregar una nueva entrada
  const addEntry = async () => {
    if (newEntry.name && newEntry.apellido && newEntry.direccion && newEntry.telefono && newEntry.email) {
      try {
        const response = await axios.post('http://localhost:5000/clientes', newEntry);
        setClientes([...clientes, response.data]);
        resetForm(); // Restablecer el formulario
      } catch (error) {
        console.error('Error adding entry:', error);
      }
    }
  };

  // Función para actualizar una entrada existente
  const updateEntry = async () => {
    if (newEntry.id && newEntry.name && newEntry.apellido && newEntry.direccion && newEntry.telefono && newEntry.email) {
      try {
        await axios.put(`http://localhost:5000/clientes/${newEntry.id}`, newEntry);
        fetchClientes(); // Volver a cargar los clientes después de la actualización
        resetForm(); // Restablecer el formulario
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    }
  };

  // Función para eliminar una entrada existente
  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/clientes/${id}`);
      fetchClientes(); // Volver a cargar los clientes después de la eliminación
      resetForm(); // Restablecer el formulario
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // Función para restablecer el formulario y el tipo de formulario
  const resetForm = () => {
    setNewEntry({
      name: '',
      apellido: '',
      direccion: '',
      telefono: '',
      email: ''
    });
    setFormType('');
  };

  // Función para manejar el envío del formulario según el tipo de formulario
  const handleSubmit = () => {
    if (formType.includes('Crear')) {
      addEntry();
    } else if (formType.includes('Actualizar')) {
      updateEntry();
    } else if (formType.includes('Eliminar')) {
      deleteEntry(newEntry.id);
    }
  };

  // Función para mostrar el formulario correspondiente y gestionar la acción de consultar/eliminar
  const handleFormDisplay = (type) => {
    setFormType(type);
    if (type.includes('Consultar') || type.includes('Eliminar')) {
      const id = prompt("Ingrese el ID del registro que desea consultar/eliminar");
      if (id) {
        const entry = clientes.find(c => c.id === parseInt(id));
        if (entry) {
          setNewEntry(entry);
        } else {
          alert("ID no encontrado");
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleFormDisplay('Crear Cliente')}>Crear Cliente</li>
          <li onClick={() => handleFormDisplay('Crear Empleado')}>Crear Empleado</li>
          <li onClick={() => handleFormDisplay('Crear Proveedor')}>Crear Proveedor</li>
          <li onClick={() => handleFormDisplay('Actualizar Cliente')}>Actualizar Cliente</li>
          <li onClick={() => handleFormDisplay('Actualizar Empleado')}>Actualizar Empleado</li>
          <li onClick={() => handleFormDisplay('Actualizar Proveedor')}>Actualizar Proveedor</li>
          <li onClick={() => handleFormDisplay('Consultar Cliente')}>Consultar Cliente</li>
          <li onClick={() => handleFormDisplay('Consultar Empleado')}>Consultar Empleado</li>
          <li onClick={() => handleFormDisplay('Consultar Proveedor')}>Consultar Proveedor</li>
          <li onClick={() => handleFormDisplay('Eliminar Cliente')}>Eliminar Cliente</li>
          <li onClick={() => handleFormDisplay('Eliminar Empleado')}>Eliminar Empleado</li>
          <li onClick={() => handleFormDisplay('Eliminar Proveedor')}>Eliminar Proveedor</li>
        </ul>
      </div>
      <div className="main-content">
        <h2>Lista de Clientes</h2>
        <ul>
          {clientes.map(client => (
            <li key={client.id}>
              {client.name} {client.apellido} ({client.email}) - {client.telefono}
            </li>
          ))}
        </ul>
        {formType && (
          <div className="form-container">
            <h2>{formType}</h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newEntry.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={newEntry.apellido}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={newEntry.direccion}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={newEntry.telefono}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={newEntry.email}
              onChange={handleInputChange}
            />
            {formType.includes('Eliminar') ? (
              <button onClick={() => deleteEntry(newEntry.id)}>Eliminar</button>
            ) : (
              <button onClick={handleSubmit}>{formType.split(' ')[0]}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowClientes;
