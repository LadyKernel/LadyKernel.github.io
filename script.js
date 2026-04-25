/* ==========================================
   LADYKERNEL // PORTFOLIO SYSTEM v2.6
   ========================================== */

/* ==========================================
   1. BOOT SEQUENCE
   ========================================== */
const BOOT_LINES = [
    { text: 'BIOS v2.6.0 — LADYKERNEL SYSTEMS',                     type: '' },
    { text: 'CPU: Linux Core @ Professional Hz',                      type: 'ok' },
    { text: 'RAM: 15+ años de experiencia operativa',                 type: 'ok' },
    { text: 'STACK: Linux · JBoss/WildFly · Nagios · Control-M',     type: 'ok' },
    { text: 'DEPLOY: PROD/NON-PROD environments — READY',             type: 'ok' },
    { text: 'SLA: Protocolo de incidencias (P1-P3) — ACTIVE',        type: 'ok' },
    { text: 'NET: GitHub API — CONNECTED',                            type: 'ok' },
    { text: 'SEC: Módulo de seguridad — ACTIVE',                      type: 'ok' },
    { text: 'SYS: Nerea GF — Lista para producción',                  type: 'ok' },
];

function runBootSequence() {
    const linesEl  = document.getElementById('boot-lines');
    const barFill  = document.getElementById('boot-bar-fill');
    let i = 0;

    function nextLine() {
        if (i >= BOOT_LINES.length) {
            setTimeout(() => {
                const screen = document.getElementById('boot-screen');
                screen.classList.add('fade-out');
                setTimeout(() => {
                    screen.style.display = 'none';
                    initSite();
                }, 800);
            }, 400);
            return;
        }

        const { text, type } = BOOT_LINES[i];
        const p = document.createElement('p');
        p.className = 'boot-line' + (type ? ` ${type}` : '');
        p.textContent = '> ' + text;
        linesEl.appendChild(p);

        barFill.style.width = Math.round(((i + 1) / BOOT_LINES.length) * 100) + '%';

        i++;
        setTimeout(nextLine, 220);
    }

    setTimeout(nextLine, 350);
}

/* ==========================================
   2. MATRIX RAIN
   ========================================== */
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx    = canvas.getContext('2d');
    const CHARS  = 'アイウエオカキクケコサシスセソ0101ABCDEF<>{}[]#$%&/\\';
    const FS     = 14;
    let cols, drops;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        cols  = Math.floor(canvas.width / FS);
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

/* ==========================================
   3. UPTIME COUNTER (live)
   ========================================== */
function initUptime() {
    const el    = document.getElementById('uptime-counter');
    const start = new Date('2011-04-24T00:00:00');
    if (!el) return;

    function update() {
        const ms   = Date.now() - start;
        const s    = Math.floor(ms / 1000);
        const m    = Math.floor(s  / 60);
        const h    = Math.floor(m  / 60);
        const d    = Math.floor(h  / 24);
        const y    = Math.floor(d  / 365);
        const rd   = d  % 365;
        const rh   = h  % 24;
        const rm   = m  % 60;
        const rs   = s  % 60;
        el.textContent = `${y}y ${rd}d ${rh}h ${rm}m ${rs}s // RUNNING_STABLE`;
    }

    update();
    setInterval(update, 1000);
}

/* ==========================================
   5. SCROLL REVEAL + SKILL BARS
   ========================================== */
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

/* ==========================================
   6. NAV ACTIVE ON SCROLL
   ========================================== */
function initNavScroll() {
    const IDS   = ['about', 'skills', 'experience', 'projects', 'contact'];
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
        if (el) observer.observe(el);
    });
}
/* ==========================================
   7. PROYECTOS DESTACADOS
   ========================================== */
function cargarProyectosDestacados() {
    const contenedor = document.getElementById('github-repos');
    if (!contenedor) return;

    const proyectos = [
 {
            nombre:  'VPN_TUNNEL_SECURE',
            desc:    'Túnel VPN privado desplegado en servidor con 1 GB RAM. WireGuard con hardening completo: firewall, certificados, kill-switch y reducción de superficie de ataque. Funcional en producción personal 24/7.',
            tech:    'WireGuard · #VPN · #Networking · #Security · #Hardening',
            url:     'https://github.com/LadyKernel/MyIronGuard',
            privado: false,
            banner: 'https://raw.githubusercontent.com/LadyKernel/MyIronGuard/main/assets/banner.png'           
        },
        {
            nombre:  'NETWORK_MONITOR_TOOL / GCLOUD_COST_MONITOR ',
            desc:    'Script de monitorización de gasto en Google Cloud. Calcula el coste acumulado en tiempo real y genera proyección del gasto total del mes para evitar sorpresas en factura.',
            tech:    'Bash · #Automation · #Monitoring  ·  #GCloud · #FinOps',
            url:     'https://github.com/LadyKernel/MyIronGuard/tree/main/network-monitor',
            privado: false, 
            banner: 'https://raw.githubusercontent.com/LadyKernel/MyIronGuard/main/assets/banner.png'           
         },
         {
            nombre:  'SYS_MONITOR',
            desc:    'Script de monitorización de sistema, para integrar con telegram alertas In Progress.',
            tech:    'Python · #GCloud · #Monitoring · #Alerts',
            url:     null,
            privado: true,
        },
    ];
// Filtrar privados
    const visibles = proyectos.filter(p => !p.privado);

    const html = visibles.map(p => {
        const cls = 'proyecto-card';

        // Si hay banner → mostrarlo. Si no → no poner nada.
        const bannerHTML = p.banner 
            ? `<img src="${p.banner}" class="proyecto-banner" alt="banner de ${p.nombre}">`
            : '';

        const footer = `
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-cibernetico">
                [ ENTRAR AL REPO ]
            </a>
        `;

return `
<div class="${cls}">
    ${bannerHTML}
    <div>
        <h3 class="proyecto-nombre">&gt; ${p.nombre}</h3>
        <p class="proyecto-desc">${p.desc}</p>
    </div>
    <div>
        <div class="proyecto-tech"><span class="hash">#</span> ${p.tech}</div>
        <div style="margin-top:12px;">${footer}</div>
    </div>
</div>`;
    }).join('');

    contenedor.innerHTML = html;
}

/* ==========================================
   8. MODAL CV
   ========================================== */
function abrirCV() {
    const modal = document.getElementById('modalCV');
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarCV() {
    const modal = document.getElementById('modalCV');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', e => {
    if (e.target.id === 'modalCV') cerrarCV();
});

/* ==========================================
   9. INIT
   ========================================== */
function initSite() {
    initMatrix();
    initUptime();
    cargarProyectosDestacados();
    initScrollAnimations();
    initNavScroll();
}

document.addEventListener('DOMContentLoaded', runBootSequence);
