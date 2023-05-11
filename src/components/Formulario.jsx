import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
   const [nombre, setNombre] = useState('');
   const [propietario, setPropietario] = useState('');
   const [email, setEmail] = useState('');
   const [fecha, setFecha] = useState('');
   const [sintomas, setSintomas] = useState('');
   const [error, setError] = useState(false);

   useEffect(() => {
      if (Object.keys(paciente).length > 0) {
         const { nombre, propietario, email, fecha, sintomas } = paciente;
         setNombre(nombre);
         setPropietario(propietario);
         setEmail(email);
         setFecha(fecha);
         setSintomas(sintomas);
      }
   }, [paciente])

   const handleSubmit = (e) => {
      e.preventDefault();
      if ([nombre, propietario, email, fecha, sintomas].includes('')) {
         setError(true);
         return;
      }
      setError(false);
      const objetoPaciente = { nombre, propietario, email, fecha, sintomas }

      if (paciente.id) {
         objetoPaciente.id = paciente.id;
         const pacientesAcrualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
         setPacientes(pacientesAcrualizados);
         setPaciente({})
      } else {
         objetoPaciente.id = generarId();
         setPacientes([...pacientes, objetoPaciente]);
      }
      resetForm();

   }

   const generarId = () => {
      const random = Math.random().toString(36).substr(2);
      const fecha = Date.now().toString(36);
      return fecha + random;
   }

   const resetForm = () => {
      setNombre('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
   }

   return (
      <div className="md:w-1/2 lg:w-2/5">
         <h2 className="font-black text-center text-3xl">Seguimiento pacientes</h2>
         <p className="text-lg mt-5 text-center mb-10">
            Añade pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
         </p>
         <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
            {error && <Error><p>Todos los campos son requeridos.</p></Error>}
            <div className="mb-5">
               <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre mascota</label>
               <input id="mascota" type="text" placeholder="Nombre de la mascota"
                  className="placeholder-gray-400 rounded-md border-2 w-full p-2 mt-2 "
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
               />
            </div>

            <div className="mb-5">
               <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
               <input id="propietario" type="text" placeholder="Nombre del propietario"
                  className="placeholder-gray-400 rounded-md border-2 w-full p-2 mt-2 "
                  value={propietario}
                  onChange={(e) => setPropietario(e.target.value)}
               />
            </div>

            <div className="mb-5">
               <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
               <input id="email" type="email" placeholder="Email del propietario"
                  className="placeholder-gray-400 rounded-md border-2 w-full p-2 mt-2 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>

            <div className="mb-5">
               <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
               <input id="alta" type="date" className="placeholder-gray-400 rounded-md border-2 w-full p-2 mt-2 "
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
               />
            </div>

            <div className="mb-5">
               <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
               <textarea id="sintomas" placeholder="Escriba los sintomas" cols="30" rows="3"
                  className="placeholder-gray-400 rounded-md border-2 w-full p-2 mt-2 "
                  value={sintomas}
                  onChange={(e) => setSintomas(e.target.value)}
               ></textarea>
            </div>

            <input type="submit" value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
               className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" />
         </form>
      </div>
   )
}

export default Formulario
