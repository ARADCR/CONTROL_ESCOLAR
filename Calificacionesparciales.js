// 1. Datos iniciales (State)
let alumnos = [
    { id: 1, nombre: "Ana Martínez", p1: 8.5, p2: 9.0, p3: 9.5 },
    { id: 2, nombre: "Carlos Mendoza", p1: 6.0, p2: 5.5, p3: 7.0 }
];
let editandoId = null;

// 2. Función principal para inicializar la vista completa
function inicializarControlCalificaciones(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Inyectamos toda la estructura HTML de la vista
    contenedor.innerHTML = `
        <div class="max-w-5xl mx-auto py-8 px-4">
            <header class="mb-8 text-center">
                <h1 class="text-3xl font-bold text-gray-900">Panel de Control de Calificaciones</h1>
                <p class="text-sm text-gray-600 mt-2">Gestión de alumnos, parciales y promedios finales</p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                    <h2 id="form-title" class="text-lg font-semibold text-gray-800 mb-4">Registrar Alumno</h2>
                    <form id="calificaciones-form" class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-700 uppercase">Nombre del Alumno</label>
                            <input type="text" id="nombre" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">P1</label>
                                <input type="number" id="p1" min="0" max="10" step="0.1" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">P2</label>
                                <input type="number" id="p2" min="0" max="10" step="0.1" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 uppercase">P3</label>
                                <input type="number" id="p3" min="0" max="10" step="0.1" required class="mt-1 block w-full rounded-md p-2 bg-gray-50 border text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            </div>
                        </div>
                        <div class="pt-2 flex gap-2">
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm transition-colors">Guardar</button>
                            <button type="button" id="btn-cancelar" class="hidden w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-md text-sm transition-colors">Cancelar</button>
                        </div>
                    </form>
                </div>

                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-800">Lista de Alumnos</h2>
                        <span id="contador-alumnos" class="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">0 Alumnos</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-200">
                                    <th class="p-4">Alumno</th>
                                    <th class="p-4 text-center">P1</th>
                                    <th class="p-4 text-center">P2</th>
                                    <th class="p-4 text-center">P3</th>
                                    <th class="p-4 text-center">Promedio</th>
                                    <th class="p-4 text-center">Estado</th>
                                    <th class="p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-alumnos" class="divide-y divide-gray-100 text-sm text-gray-700"></tbody>
                        </table>
                    </div>
                    <div id="sin-datos" class="p-8 text-center text-gray-400 text-sm hidden">No hay alumnos registrados.</div>
                </div>
            </div>
        </div>
    `;

    // Mapear elementos del DOM ya creados
    const form = document.getElementById('calificaciones-form');
    const btnCancelar = document.getElementById('btn-cancelar');

    // Escuchar eventos del formulario
    form.addEventListener('submit', guardarAlumno);
    btnCancelar.addEventListener('click', resetForm);

    // Primera renderización de la tabla
    renderTabla();
}

// 3. Renderizar filas de la tabla dinámicamente
function renderTabla() {
    const tablaBody = document.getElementById('tabla-alumnos');
    const sinDatosDiv = document.getElementById('sin-datos');
    const contadorAlumnos = document.getElementById('contador-alumnos');
    
    if (!tablaBody) return;

    tablaBody.innerHTML = '';
    sinDatosDiv.classList.toggle('hidden', alumnos.length > 0);
    contadorAlumnos.textContent = `${alumnos.length} Alumno${alumnos.length !== 1 ? 's' : ''}`;

    alumnos.forEach(alumno => {
        const promedio = ((alumno.p1 + alumno.p2 + alumno.p3) / 3).toFixed(1);
        const aprobado = promedio >= 6.0;

        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors";
        tr.innerHTML = `
            <td class="p-4 font-medium text-gray-900">${alumno.nombre}</td>
            <td class="p-4 text-center text-gray-600">${alumno.p1.toFixed(1)}</td>
            <td class="p-4 text-center text-gray-600">${alumno.p2.toFixed(1)}</td>
            <td class="p-4 text-center text-gray-600">${alumno.p3.toFixed(1)}</td>
            <td class="p-4 text-center font-bold ${aprobado ? 'text-green-600' : 'text-red-600'}">${promedio}</td>
            <td class="p-4 text-center">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${aprobado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${aprobado ? 'Aprobado' : 'Reprobado'}
                </span>
            </td>
            <td class="p-4 text-right space-x-2">
                <button onclick="cargarEditar(${alumno.id})" class="text-blue-600 hover:text-blue-800 font-medium text-xs">Editar</button>
                <button onclick="eliminarAlumno(${alumno.id})" class="text-red-600 hover:text-red-800 font-medium text-xs">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(tr);
    });
}

// 4. Lógica de negocio (Funciones de control)
function guardarAlumno(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const p1 = parseFloat(document.getElementById('p1').value);
    const p2 = parseFloat(document.getElementById('p2').value);
    const p3 = parseFloat(document.getElementById('p3').value);

    if (editandoId) {
        alumnos = alumnos.map(al => al.id === editandoId ? { ...al, nombre, p1, p2, p3 } : al);
        resetForm();
    } else {
        alumnos.push({ id: Date.now(), nombre, p1, p2, p3 });
    }

    document.getElementById('calificaciones-form').reset();
    renderTabla();
}

function cargarEditar(id) {
    const alumno = alumnos.find(al => al.id === id);
    if (!alumno) return;

    editandoId = id;
    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('p1').value = alumno.p1;
    document.getElementById('p2').value = alumno.p2;
    document.getElementById('p3').value = alumno.p3;

    document.getElementById('form-title').textContent = "Editar Calificaciones";
    document.getElementById('btn-cancelar').classList.remove('hidden');
}

function eliminarAlumno(id) {
    if (confirm('¿Eliminar este registro?')) {
        alumnos = alumnos.filter(al => al.id !== id);
        if (editandoId === id) resetForm();
        renderTabla();
    }
}

function resetForm() {
    editandoId = null;
    document.getElementById('calificaciones-form').reset();
    document.getElementById('form-title').textContent = "Registrar Alumno";
    document.getElementById('btn-cancelar').classList.add('hidden');
}
