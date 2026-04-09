/* ==========================================
   1. GITHUB API INTEGRATION (Conexión Real)
   ========================================== */
// 👇 PON AQUÍ TU USUARIO REAL DE GITHUB 👇
const GITHUB_USERNAME = 'LadyKernel'; 
function cargarProyectosDestacados() {
    const contenedor = document.getElementById('github-repos');
    if (!contenedor) return;

    const proyectos = [
        {
            nombre: "VPN_TUNNEL_SECURE",
            desc: "Configuración de túnel privado cifrado para acceso remoto seguro. Hardening de red y gestión de certificados.",
            tech: "OpenVPN #Networking #Security",
            url: "https://github.com/LadyKernel/MyIronGuard"
        },
        {
            nombre: "NETWORK_MONITOR_TOOL",
            desc: "Script de automatización para monitorización de tráfico, latencia y estados de interfaz en tiempo real.",
            tech: "Bash #Automation #NetOps",
            url: "https://github.com/LadyKernel/MyIronGuard/tree/main/network-monitor"
        },
    ];

    let htmlFinal = '';
    proyectos.forEach(p => {
        htmlFinal += `
            <div class="proyecto-card" style="border: 1px solid rgba(0, 212, 255, 0.2); padding: 25px; background: rgba(0, 212, 255, 0.05); border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; transition: 0.3s;">
                <div>
                    <h3 style="color: #00d4ff; font-family: monospace; margin-top: 0;">> ${p.nombre}</h3>
                    <p style="font-size: 0.95em; color: #ccc; line-height: 1.5;">${p.desc}</p>
                </div>
                <div>
                    <div style="margin: 15px 0; font-family: monospace; font-size: 0.85em; color: #888;">
                        <span style="color: #00d4ff;">#</span> ${p.tech}
                    </div>
                    <a href="${p.url}" target="_blank" class="btn-cibernetico" style="text-decoration: none; display: inline-block;">
                        [ ENTRAR AL REPO ]
                    </a>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = htmlFinal;
}

/* ==========================================
   2. CONTROL DEL VISOR DE CV (MODAL)
   ========================================== */
function abrirCV() {
    const modal = document.getElementById("modalCV");
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Bloquea el scroll de fondo
    }
}

function cerrarCV() {
    const modal = document.getElementById("modalCV");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restaura el scroll
    }
}

// Cerrar si el usuario hace clic fuera de la ventana del CV
window.addEventListener('click', function(event) {
    const modal = document.getElementById("modalCV");
    if (event.target === modal) {
        cerrarCV();
    }
});

/* ==========================================
   3. INICIALIZACIÓN DE SISTEMA
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    cargarProyectosDestacados();
});
/* ==========================================
   3. INICIALIZACIÓN DE SISTEMA
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    cargarProyectosDestacados();
});
