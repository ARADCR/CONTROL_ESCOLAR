// Calificacionesfinales.js

// 1. Datos iniciales orientados a fin de curso (State)
let alumnosFinales = [
    { id: 1, nombre: "Ana Martínez", promedioParciales: 8.7, examenFinal: 9.0 },
    { id: 2, nombre: "Carlos Mendoza", promedioParciales: 5.8, examenFinal: 6.0 }
];
let editandoFinalId = null;

// 2. Función principal para inicializar la vista completa
function inicializarControlFinales(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="max-w-5xl mx-auto py-8 px-4">
            <header class="mb-8 text-center">
                <h1 class="text-3xl font-bold text-gray-900">Control de Calificaciones Finales</h1>
                <p class="text-sm text-gray-600 mt-2">Cierre de actas, evaluación final y estatus de acreditación</p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                    <h2 id="form-title-final" class="text-lg font-semibold text-gray-800 mb-4">Registrar Evaluación Final</h2>
                    <form id="finales-form" class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-700 uppercase">Nombre del Alumno</label>
                            <input type="text" id="nombre-final" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">Prom. Parciales</label>
                                <input type="number" id="prom-parciales" min="0" max="10" step="0.1" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">Examen Final</label>
                                <input type="number" id="examen-final" min="0" max="10" step="0.1" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                        </div>

                        <div class="pt-2 flex gap-2">
                            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md text-sm transition-colors">Guardar Acta</button>
                            <button type="button" id="btn-cancelar-final" class="hidden w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-md text-sm transition-colors">Cancelar</button>
                        </div>
                    </form>
                </div>

                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-800">Actas de Calificación</h2>
                        <span id="contador-finales" class="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">0 Alumnos</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-200">
                                    <th class="p-4">Alumno</th>
                                    <th class="p-4 text-center">Prom. Parcial</th>
                                    <th class="p-4 text-center">Examen Final</th>
                                    <th class="p-4 text-center">Nota Definitiva</th>
                                    <th class="p-4 text-center">Estatus</th>
                                    <th class="p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-finales" class="divide-y divide-gray-100 text-sm text-gray-700"></tbody>
                        </table>
                    </div>
                    <div id="sin-datos-finales" class="p-8 text-center text-gray-400 text-sm hidden">No hay actas finales registradas.</div>
                </div>
            </div>
        </div>
    `;

    const form = document.getElementById('finales-form');
    const btnCancelar = document.getElementById('btn-cancelar-final');

    form.addEventListener('submit', guardarCalificacionFinal);
    btnCancelar.addEventListener('click', resetFormFinal);

    renderTablaFinales();
}

// 3. Renderizar filas calculando la nota definitiva
function renderTablaFinales() {
    const tablaBody = document.getElementById('tabla-finales');
    const sinDatosDiv = document.getElementById('sin-datos-finales');
    const contadorFinales = document.getElementById('contador-finales');
    
    if (!tablaBody) return;

    tablaBody.innerHTML = '';
    sinDatosDiv.classList.toggle('hidden', alumnosFinales.length > 0);
    contadorFinales.textContent = `${alumnosFinales.length} Alumno${alumnosFinales.length !== 1 ? 's' : ''}`;

    alumnosFinales.forEach(alumno => {
        // Ponderación de ejemplo: 60% promedio de parciales y 40% examen final
        const notaDefinitiva = ((alumno.promedioParciales * 0.6) + (alumno.examenFinal * 0.4)).toFixed(1);
        
        // Reglas de negocio académicas comunes
        let estatus = "";
        let colorEstatus = "";

        if (alumno.promedioParciales >= 9.0) {
            estatus = "Exentado";
            colorEstatus = "bg-purple-100 text-purple-800";
        } else if (notaDefinitiva >= 6.0) {
            estatus = "Acreditado";
            colorEstatus = "bg-green-100 text-green-800";
        } else {
            estatus = "Extraordinario";
            colorEstatus = "bg-amber-100 text-amber-800";
        }

        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="p-4 font-medium text-gray-900">${alumno.nombre}</td>
            <td class="p-4 text-center text-gray-600">${alumno.promedioParciales.toFixed(1)}</td>
            <td class="p-4 text-center text-gray-600">${alumno.examenFinal.toFixed(1)}</td>
            <td class="p-4 text-center font-bold ${notaDefinitiva >= 6.0 ? 'text-indigo-600' : 'text-red-600'}">${notaDefinitiva}</td>
            <td class="p-4 text-center">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${colorEstatus}">
                    ${estatus}
                </span>
            </td>
            <td class="p-4 text-right space-x-2">
                <button onclick="cargarEditarFinal(${alumno.id})" class="text-indigo-600 hover:text-indigo-800 font-medium text-xs">Editar</button>
                <button onclick="eliminarAlumnoFinal(${alumno.id})" class="text-red-600 hover:text-red-800 font-medium text-xs">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(tr);
    });
}

// 4. Lógica de control
function guardarCalificacionFinal(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre-final').value;
    const promedioParciales = parseFloat(document.getElementById('prom-parciales').value);
    const examenFinal = parseFloat(document.getElementById('examen-final').value);

    if (editandoFinalId) {
        alumnosFinales = alumnosFinales.map(al => al.id === editandoFinalId ? { ...al, nombre, promedioParciales, examenFinal } : al);
        resetFormFinal();
    } else {
        alumnosFinales.push({ id: Date.now(), nombre, promedioParciales, examenFinal });
    }

    document.getElementById('finales-form').reset();
    renderTablaFinales();
}

function cargarEditarFinal(id) {
    const alumno = alumnosFinales.find(al => al.id === id);
    if (!alumno) return;

    editandoFinalId = id;
    document.getElementById('nombre-final').value = alumno.nombre;
    document.getElementById('prom-parciales').value = alumno.promedioParciales;
    document.getElementById('examen-final').value = alumno.examenFinal;

    document.getElementById('form-title-final').textContent = "Editar Acta Final";
    document.getElementById('btn-cancelar-final').classList.remove('hidden');
}

function eliminarAlumnoFinal(id) {
    if (confirm('¿Deseas eliminar este registro final?')) {
        alumnosFinales = alumnosFinales.filter(al => al.id !== id);
        if (editandoFinalId === id) resetFormFinal();
        renderTablaFinales();
    }
}

function resetFormFinal() {
    editandoFinalId = null;
    document.getElementById('finales-form').reset();
    document.getElementById('form-title-final').textContent = "Registrar Evaluación Final";
    document.getElementById('btn-cancelar-final').classList.add('hidden');
}
