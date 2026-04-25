/* ==========================================
   LADYKERNEL // PORTFOLIO SYSTEM v2.6
   ========================================== */

// 1. BOOT SEQUENCE
function runBootSequence() {
    const linesEl = document.getElementById('boot-lines');
    const barFill = document.getElementById('boot-bar-fill');
    let i = 0;

    const BOOT_LINES_DEFAULT = [
        {text: "Initializing system...", type: "info"},
        {text: "Loading kernel...", type: "success"},
        {text: "Connecting to GitHub API...", type: "warning"}
    ];
    
    const lines = (typeof BOOT_LINES !== 'undefined') ? BOOT_LINES : BOOT_LINES_DEFAULT;

    function nextLine() {
        if (i >= lines.length) {
            setTimeout(() => {
                const screen = document.getElementById('boot-screen');
                if(screen) screen.classList.add('fade-out');
                setTimeout(() => {
                    if(screen) screen.style.display = 'none';
                    initSite();
                }, 800);
            }, 400);
            return;
        }

        const { text, type } = lines[i];
        const p = document.createElement('p');
        p.className = 'boot-line' + (type ? ` ${type}` : '');
        p.textContent = '> ' + text;
        if(linesEl) linesEl.appendChild(p);
        if(barFill) barFill.style.width = Math.round(((i + 1) / lines.length) * 100) + '%';

        i++;
        setTimeout(nextLine, 220);
    }
    setTimeout(nextLine, 350);
}

// 2. MATRIX RAIN
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CHARS = 'アイウエオカキクケコサシスセソ0101ABCDEF<>{}[]#$%&/\\';
    const FS = 14;
    let cols, drops;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.floor(canvas.width / FS);
        drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.fillStyle = 'rgba(5, 8, 16, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#003d00';
        ctx.font = `${FS}px monospace`;
        drops.forEach((y, i) => {
            ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y * FS);
            if (y * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(draw, 65);
}

// 3. UPTIME (Añadida para que no falle)
function initUptime() {
    const el = document.getElementById('uptime-counter');
    if (!el) return;
    const start = new Date('2019-03-01T00:00:00');
    setInterval(() => {
        const ms = Date.now() - start;
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);
        el.textContent = `${d}d ${h % 24}h ${m % 60}m ${s % 60}s // RUNNING_STABLE`;
    }, 1000);
}

// 4. TYPEWRITER (Añadida para que no falle)
function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    const text = "Perfil técnico enfocado en la administración de entornos Linux y resolución de incidencias...";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    type();
}

// 5. SCROLL REVEAL
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.barra-progreso').forEach(bar => {
                const w = bar.getAttribute('data-width') || 0;
                setTimeout(() => { bar.style.width = w + '%'; }, 200);
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.panel-glass.reveal').forEach(el => observer.observe(el));
}

// 6. NAV SCROLL
function initNavScroll() {
    const IDS = ['about', 'skills', 'experience', 'projects', 'contact'];
    const links = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        });
    }, { threshold: 0.4 });
    IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(id);
    });
}

// 7. GITHUB PROJECTS
function cargarProyectosDestacados() {
    const contenedor = document.getElementById('github-repos');
    if (!contenedor) return;
    const proyectos = [
        {
            nombre: "VPN_TUNNEL_SECURE",
			desc: "T\u00fanel VPN privado desplegado en servidor con 1 GB RAM. WireGuard con hardening completo: firewall, certificados, kill-switch y reducci\u00f3n de superficie de ataque. Funcional en producci\u00f3n personal 24/7.",            tech: 'WireGuard \u2022 #Networking \u2022 #Security \u2022 #Hardening',
            url: "https://github.com/LadyKernel/MyIronGuard"
        },
        {
            nombre: "GCLOUD_COST_MONITOR",
			desc: "Script de monitorizaci\u00f3n de gasto en Google Cloud. Calcula el coste acumulado en tiempo real y genera proyecci\u00f3n del gasto total del mes para evitar sorpresas en factura.",
            tech: "Bash #Automation \u2022 #GCloud \u2022 #FinOps \u2022 #Monitoring",
            url: "https://github.com/LadyKernel/MyIronGuard/tree/main/network-monitor"
        },
    ];

    let htmlFinal = '';
    proyectos.forEach(p => {
        htmlFinal += `
            <div class="proyecto-card" style="border: 1px solid #00d4ff; padding: 20px; margin-bottom: 15px; background: rgba(0,0,0,0.3); border-radius: 4px;">
                <h3 style="color: #00d4ff; font-family: monospace;">> ${p.nombre}</h3>
                <p style="color: #ccc; font-size: 0.9em;">${p.desc}</p>
                <small style="color: #00d4ff;"># ${p.tech}</small>
                <br><br>
                <a href="${p.url}" target="_blank" style="color: #00d4ff; text-decoration: none; border: 1px solid #00d4ff; padding: 4px 8px;">[ ENTRAR AL REPO ]</a>
            </div>
        `;
    });
    contenedor.innerHTML = htmlFinal;
}

// 8. MODAL CV
function abrirCV() {
    const modal = document.getElementById("modalCV");
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; 
    }
}

function cerrarCV() {
    const modal = document.getElementById("modalCV");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById("modalCV");
    if (event.target === modal) {
        cerrarCV();
    }
});

// 9. INIT SYSTEM
function initSite() {
    console.log("Sistema iniciado...");
	cargarProyectosDestacados(); 
    initMatrix();
    initUptime();
    initTypewriter();
    cargarProyectosDestacados();
    initScrollAnimations();
    initNavScroll();
}

document.addEventListener('DOMContentLoaded', runBootSequence);
