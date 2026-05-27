
const renderReporteBecas = () => {
    const app = document.getElementById('app') || document.body;
    
    app.innerHTML = `
        <style>
            body { background-color: #1a1a2e; color: #e0e0e0; font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #ff00ff; text-shadow: 0 0 10px #ff00ff; border-bottom: 1px solid #ff00ff; padding-bottom: 10px; }
            .card { background: #16213e; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 5px solid #ff00ff; }
        </style>

        <h2>Reporte General de Becas</h2>
        <div class="card">
            <h3>Beca de Excelencia</h3>
            <p>Total de alumnos beneficiados: 120</p>
            <p>Porcentaje de aprovechamiento requerido: 9.5</p>
        </div>
        <div class="card">
            <h3>Beca de Apoyo Económico</h3>
            <p>Total de alumnos beneficiados: 350</p>
            <p>Estado del presupuesto: Aprobado</p>
        </div>
    `;
    console.log("Vista de Reporte de Becas cargada.");
};
