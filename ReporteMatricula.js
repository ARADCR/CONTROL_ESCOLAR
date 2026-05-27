
const renderReporteMatricula = () => {
    const app = document.getElementById('app') || document.body;
    
    app.innerHTML = `
        <style>
            body { background-color: #1a1a2e; color: #fff; font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #00ffcc; text-shadow: 0 0 8px #00ffcc; border-bottom: 1px solid #00ffcc; padding-bottom: 10px; }
            .table-container { margin-top: 20px; width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #444; padding: 10px; text-align: left; }
            th { background-color: #16213e; color: #00ffcc; }
        </style>

        <h2>Reporte de Matrícula Activa</h2>
        <table class="table-container">
            <thead>
                <tr>
                    <th>ID Alumno</th>
                    <th>Nombre</th>
                    <th>Carrera</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2026001</td>
                    <td>Juan Pérez</td>
                    <td>Ingeniería de Software</td>
                    <td>Inscrito</td>
                </tr>
            </tbody>
        </table>
    `;
    console.log("Módulo de Reporte de Matrícula inicializado.");
};
