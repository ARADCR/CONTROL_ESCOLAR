
const renderHome = () => {
    const app = document.getElementById('app') || document.body;
    
    app.innerHTML = `
        <style>
            body { background-color: #1a1a2e; color: #fff; font-family: 'Courier New', Courier, monospace; text-align: center; }
            h1 { color: #f9a826; text-shadow: 0 0 10px #f9a826; margin-top: 50px; }
            .menu-container { display: flex; flex-direction: column; align-items: center; gap: 15px; margin-top: 30px; }
            .menu-btn { 
                background-color: #16213e; color: #0f3460; 
                border: 1px solid #e94560; color: #e94560;
                padding: 15px 30px; width: 300px; border-radius: 5px; 
                font-size: 16px; cursor: pointer; transition: 0.3s;
            }
            .menu-btn:hover { background-color: #e94560; color: #fff; box-shadow: 0 0 15px #e94560; }
        </style>

        <h1>Control Escolar - Dashboard</h1>
        <div class="menu-container">
            <button class="menu-btn">Módulo Alumnos</button>
            <button class="menu-btn">Módulo Profesores</button>
            <button class="menu-btn">Módulo Administrativos A</button>
            <button class="menu-btn">Módulo Administrativos B</button>
            <button class="menu-btn">Módulo Director de Carrera</button>
            <button class="menu-btn">Secretaría Académica</button>
        </div>
    `;
    console.log("Vista HOME cargada exitosamente.");
};

renderHome();