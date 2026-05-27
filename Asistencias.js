// Asistencias.js

// 1. Datos iniciales con registro de asistencias (State)
let alumnosAsistencias = [
    { id: 1, nombre: "Ana Martínez", asistencias: 14, faltas: 1, retardos: 1 },
    { id: 2, nombre: "Carlos Mendoza", asistencias: 10, faltas: 5, retardos: 1 }
];
let editandoAsistenciaId = null;
const TOTAL_CLASES = 16; // Total de sesiones del periodo para calcular el %

// 2. Función principal para inicializar la vista completa
function inicializarControlAsistencias(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="max-w-5xl mx-auto py-8 px-4">
            <header class="mb-8 text-center">
                <h1 class="text-3xl font-bold text-gray-900">Control de Asistencias</h1>
                <p class="text-sm text-gray-600 mt-2">Registro de pase de lista y porcentaje de permanencia (Total clases del periodo: ${TOTAL_CLASES})</p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                    <h2 id="form-title-asistencia" class="text-lg font-semibold text-gray-800 mb-4">Registrar Alumno</h2>
                    <form id="asistencias-form" class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-700 uppercase">Nombre del Alumno</label>
                            <input type="text" id="nombre-asistencia" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>
                        
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">Asistencias</label>
                                <input type="number" id="num-asistencias" min="0" max="${TOTAL_CLASES}" default="0" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">Faltas</label>
                                <input type="number" id="num-faltas" min="0" max="${TOTAL_CLASES}" default="0" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">Retardos</label>
                                <input type="number" id="num-retardos" min="0" max="${TOTAL_CLASES}" default="0" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                        </div>

                        <div class="pt-2 flex gap-2">
                            <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md text-sm transition-colors">Guardar Registro</button>
                            <button type="button" id="btn-cancelar-asistencia" class="hidden w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-md text-sm transition-colors">Cancelar</button>
                        </div>
                    </form>
                </div>

                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-800">Lista de Asistencias</h2>
                        <span id="contador-asistencias" class="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">0 Alumnos</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-200">
                                    <th class="p-4">Alumno</th>
                                    <th class="p-4 text-center">Asistencias</th>
                                    <th class="p-4 text-center">Faltas</th>
                                    <th class="p-4 text-center">Retardos</th>
                                    <th class="p-4 text-center">% Asistencia</th>
                                    <th class="p-4 text-center">Condición</th>
                                    <th class="p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-asistencias" class="divide-y divide-gray-100 text-sm text-gray-700"></tbody>
                        </table>
                    </div>
                    <div id="sin-datos-asistencias" class="p-8 text-center text-gray-400 text-sm hidden">No hay registros de asistencia.</div>
                </div>
            </div>
        </div>
    `;

    const form = document.getElementById('asistencias-form');
    const btnCancelar = document.getElementById('btn-cancelar-asistencia');

    form.addEventListener('submit', guardarAsistencia);
    btnCancelar.addEventListener('click', resetFormAsistencia);

    renderTablaAsistencias();
}

// 3. Renderizar filas calculando el porcentaje final
function renderTablaAsistencias() {
    const tablaBody = document.getElementById('tabla-asistencias');
    const sinDatosDiv = document.getElementById('sin-datos-asistencias');
    const contadorAsistencias = document.getElementById('contador-asistencias');
    
    if (!tablaBody) return;

    tablaBody.innerHTML = '';
    sinDatosDiv.classList.toggle('hidden', alumnosAsistencias.length > 0);
    contadorAsistencias.textContent = `${alumnosAsistencias.length} Alumno${alumnosAsistencias.length !== 1 ? 's' : ''}`;

    alumnosAsistencias.forEach(alumno => {
        // Regla académica común: Cada 3 retardos equivalen a 1 falta, o simplemente se calcula sobre asistencias puras.
        // Aquí calcularemos el % directo sobre las asistencias reales con respecto al total de clases.
        const porcentaje = Math.round((alumno.asistencias / TOTAL_CLASES) * 100);
        
        // Determinar condición por derecho a evaluación (mínimo 80%)
        const tieneDerecho = porcentaje >= 80;

        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="p-4 font-medium text-gray-900">${alumno.nombre}</td>
            <td class="p-4 text-center text-gray-600 font-medium">${alumno.asistencias}</td>
            <td class="p-4 text-center text-red-500">${alumno.faltas}</td>
            <td class="p-4 text-center text-amber-500">${alumno.retardos}</td>
            <td class="p-4 text-center font-bold ${tieneDerecho ? 'text-emerald-600' : 'text-red-600'}">${porcentaje}%</td>
            <td class="p-4 text-center">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${tieneDerecho ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                    ${tieneDerecho ? 'Regular' : 'Riesgo / Extra'}
                </span>
            </td>
            <td class="p-4 text-right space-x-2">
                <button onclick="cargarEditarAsistencia(${alumno.id})" class="text-emerald-600 hover:text-emerald-800 font-medium text-xs">Editar</button>
                <button onclick="eliminarAlumnoAsistencia(${alumno.id})" class="text-red-600 hover:text-red-800 font-medium text-xs">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(tr);
    });
}

// 4. Lógica de control
function guardarAsistencia(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre-asistencia').value;
    const asistencias = parseInt(document.getElementById('num-asistencias').value);
    const faltas = parseInt(document.getElementById('num-faltas').value);
    const retardos = parseInt(document.getElementById('num-retardos').value);

    // Validación simple para que la suma no supere el límite configurado si es necesario
    if ((asistencias + faltas) > TOTAL_CLASES) {
        alert(`¡Ojo! La suma de asistencias y faltas supera el total de clases programadas (${TOTAL_CLASES}).`);
        return;
    }

    if (editandoAsistenciaId) {
        alumnosAsistencias = alumnosAsistencias.map(al => al.id === editandoAsistenciaId ? { ...al, nombre, asistencias, faltas, retardos } : al);
        resetFormAsistencia();
    } else {
        alumnosAsistencias.push({ id: Date.now(), nombre, asistencias, faltas, retardos });
    }

    document.getElementById('asistencias-form').reset();
    renderTablaAsistencias();
}

function cargarEditarAsistencia(id) {
    const alumno = alumnosAsistencias.find(al => al.id === id);
    if (!alumno) return;

    editandoAsistenciaId = id;
    document.getElementById('nombre-asistencia').value = alumno.nombre;
    document.getElementById('num-asistencias').value = alumno.asistencias;
    document.getElementById('num-faltas').value = alumno.faltas;
    document.getElementById('num-retardos').value = alumno.retardos;

    document.getElementById('form-title-asistencia').textContent = "Editar Asistencia";
    document.getElementById('btn-cancelar-asistencia').classList.remove('hidden');
}

function eliminarAlumnoAsistencia(id) {
    if (confirm('¿Deseas eliminar este registro de asistencia?')) {
        alumnosAsistencias = alumnosAsistencias.filter(al => al.id !== id);
        if (editandoAsistenciaId === id) resetFormAsistencia();
        renderTablaAsistencias();
    }
}

function resetFormAsistencia() {
    editandoAsistenciaId = null;
    document.getElementById('asistencias-form').reset();
    document.getElementById('form-title-asistencia').textContent = "Registrar Alumno";
    document.getElementById('btn-cancelar-asistencia').classList.add('hidden');
}
