/* ==========================================
   LADYKERNEL // PORTFOLIO SYSTEM v3.0
   ========================================== */

/* ==========================================
   1. BOOT SEQUENCE
   ========================================== */
const BOOT_LINES = [
    { text: 'BIOS v3.0.0 — LADYKERNEL SYSTEMS INITIALIZED',           type: '' },
    { text: 'CPU: Linux Core @ Professional Hz — OVERCLOCK_ACTIVE',    type: 'ok' },
    { text: 'RAM: 15+ años de experiencia operativa — LOADED',         type: 'ok' },
    { text: 'STACK: Linux · JBoss/WildFly · Nagios · Control-M',      type: 'ok' },
    { text: 'DEPLOY_ENGINE: PROD/NON-PROD — OPERATIONAL',              type: 'ok' },
    { text: 'SLA_GUARD: Protocolo (P1-P3) — ENFORCED',                type: 'ok' },
    { text: 'SECURITY: Módulo de seguridad — ARMED',                   type: 'ok' },
    { text: 'NET: Particle Engine — ONLINE',                           type: 'ok' },
    { text: 'GLITCH_SHIELD: Anti-intrusion — ACTIVE',                  type: 'ok' },
    { text: 'SYS: Nerea GF — PRODUCTION_READY // OPEN_TO_WORK',       type: 'ok' },
];

function runBootSequence() {
    const linesEl = document.getElementById('boot-lines');
    const barFill = document.getElementById('boot-bar-fill');
    const pctEl   = document.getElementById('boot-pct');
    let i = 0;

    function nextLine() {
        if (i >= BOOT_LINES.length) {
            setTimeout(() => {
                const screen = document.getElementById('boot-screen');
                screen.classList.add('fade-out');
                setTimeout(() => {
                    screen.style.display = 'none';
                    initSite();
                }, 900);
            }, 500);
            return;
        }

        const { text, type } = BOOT_LINES[i];
        const p = document.createElement('p');
        p.className = 'boot-line' + (type ? ` ${type}` : '');
        p.textContent = '> ' + text;
        linesEl.appendChild(p);
        linesEl.scrollTop = linesEl.scrollHeight;

        const pct = Math.round(((i + 1) / BOOT_LINES.length) * 100);
        barFill.style.width = pct + '%';
        if (pctEl) pctEl.textContent = pct + '%';

        i++;
        setTimeout(nextLine, 200);
    }

    setTimeout(nextLine, 400);
}

/* ==========================================
   2. PARTICLE CONSTELLATION BACKGROUND
   ========================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let W, H, particles;

    const CONFIG = {
        count:       70,
        speed:       0.3,
        maxDist:     130,
        dotSize:     1.5,
        dotColor:    [0, 212, 255],
        lineOpacity: 0.12,
    };

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = Array.from({ length: CONFIG.count }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * CONFIG.speed,
            vy: (Math.random() - 0.5) * CONFIG.speed,
            r:  CONFIG.dotSize + Math.random() * 1.2,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let a = 0; a < particles.length; a++) {
            const p = particles[a];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${CONFIG.dotColor.join(',')}, 0.7)`;
            ctx.shadowColor = `rgba(${CONFIG.dotColor.join(',')}, 0.8)`;
            ctx.shadowBlur  = 6;
            ctx.fill();
            ctx.shadowBlur  = 0;

            for (let b = a + 1; b < particles.length; b++) {
                const q  = particles[b];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < CONFIG.maxDist) {
                    const alpha = (1 - d / CONFIG.maxDist) * CONFIG.lineOpacity;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(${CONFIG.dotColor.join(',')}, ${alpha})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });
    draw();
}

/* ==========================================
   3. MATRIX RAIN (subtle bg)
   ========================================== */
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx    = canvas.getContext('2d');
    const CHARS  = 'アイウエオカキクケコ0101ABCDEF<>{}[]#$%&/\\01';
    const FS     = 13;
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
        ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#003d00';
        ctx.font = `${FS}px monospace`;
        drops.forEach((y, i) => {
            ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y * FS);
            if (y * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }

    setInterval(draw, 70);
}

/* ==========================================
   4. CUSTOM CURSOR
   ========================================== */
function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    function animateRing() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .tag, .stat-item, .curso-item, .proyecto-card, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* ==========================================
   5. UPTIME COUNTER
   ========================================== */
function initUptime() {
    const el    = document.getElementById('uptime-counter');
    const start = new Date('2011-04-24T00:00:00');
    if (!el) return;

    function update() {
        const ms = Date.now() - start;
        const s  = Math.floor(ms / 1000);
        const m  = Math.floor(s  / 60);
        const h  = Math.floor(m  / 60);
        const d  = Math.floor(h  / 24);
        const y  = Math.floor(d  / 365);
        el.textContent = `${y}y ${d % 365}d ${h % 24}h ${m % 60}m ${s % 60}s // RUNNING_STABLE`;
    }

    update();
    setInterval(update, 1000);
}

/* ==========================================
   6. STATS COUNTERS
   ========================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-num');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            let current  = 0;
            const step   = Math.max(1, Math.floor(target / 60));
            const timer  = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current + suffix;
                if (current >= target) clearInterval(timer);
            }, 25);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* ==========================================
   7. SCROLL REVEAL + SKILL BARS
   ========================================== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.barra-progreso').forEach(bar => {
                const w = bar.getAttribute('data-width') || 0;
                setTimeout(() => { bar.style.width = w + '%'; }, 250);
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.panel-holo.reveal').forEach(el => observer.observe(el));
}

/* ==========================================
   8. NAV ACTIVE ON SCROLL
   ========================================== */
function initNavScroll() {
    const IDS   = ['about', 'skills', 'stats', 'experience', 'projects', 'contact'];
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
   9. GLITCH EFFECT ON SECTION TITLES
   ========================================== */
function initGlitch() {
    const titles = document.querySelectorAll('.glitch-text');
    titles.forEach(el => {
        setInterval(() => {
            if (Math.random() > 0.85) {
                el.classList.add('glitching');
                setTimeout(() => el.classList.remove('glitching'), 200 + Math.random() * 200);
            }
        }, 2000);
    });
}

/* ==========================================
   10. PROJECTS
   ========================================== */
function cargarProyectos() {
    const contenedor = document.getElementById('github-repos');
    if (!contenedor) return;

    const proyectos = [
        {
            nombre:  'VPN_TUNNEL_SECURE',
            desc:    'Túnel VPN privado desplegado en servidor con 1 GB RAM. OpenVPN con hardening completo: firewall, certificados, kill-switch y reducción de superficie de ataque. Funcional en producción personal 24/7.',
            tech:    'OpenVPN · #Networking · #Security · #Hardening',
            url:     'https://github.com/LadyKernel/MyIronGuard',
            privado: false,
            banner: 'assets/vpn_privada.jpg'           

        },
        {
            nombre:  'NETWORK_MONITOR_TOOL',
            desc:    'Script de automatización para monitorización de tráfico, latencia y estados de interfaz en tiempo real.',
            tech:    'Bash · #Automation · #NetOps · #Monitoring',
            url:     'https://github.com/LadyKernel/MyIronGuard/tree/main/network-monitor',
            privado: false,
            banner: 'assets/network-monitor.jpg'
        },
        {
            nombre:  'GCLOUD_COST_MONITOR',
            desc:    'Script de monitorización de gasto en Google Cloud. Calcula el coste acumulado en tiempo real y genera proyección del gasto total del mes para evitar sorpresas en factura.',
            tech:    'Python · #GCloud · #FinOps · #Automation',
            url:     null,
            privado: true,
        },
    ];

    const html = proyectos
        .filter(p => !p.privado) // ⬅️ Oculta los privados
    .map(p => {
        const cls    = 'proyecto-card' + (p.privado ? ' privado' : '');
                // Banner arriba del todo
            const bannerHTML = p.banner
                ? `<img src="${p.banner}" class="proyecto-banner" alt="banner de ${p.nombre}">`
                : '';
        const footer = p.privado
            ? '<span class="badge-privado">[ LOCAL_DEV // PRIVATE ]</span>'
            : `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-cibernetico">[ ENTRAR AL REPO ]</a>`;

      return `
    <div class="${cls}">
        
        ${bannerHTML ? `<img src="${p.banner}" class="proyecto-banner" alt="banner de ${p.nombre}">` : ''}

        <div>
            <h3 class="proyecto-nombre">&gt; ${p.nombre}</h3>
            <p class="proyecto-desc">${p.desc}</p>
        </div>

        <div>
            <div class="proyecto-tech"><span class="hash">#</span> ${p.tech}</div>
            <div style="margin-top:12px;">${footer}</div>
        </div>

    </div>`
    }).join('');

    contenedor.innerHTML = html;
}

/* ==========================================
   11. MODAL CV
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

window.addEventListener('click', e => { if (e.target.id === 'modalCV') cerrarCV(); });

/* ==========================================
   12. HAMBURGER
   ========================================== */
function initHamburger() {
    const btn   = document.getElementById('nav-hamburger');
    const nav   = document.getElementById('main-nav');
    const links = document.querySelectorAll('#nav-links .nav-link');
    if (!btn) return;
    btn.addEventListener('click', () => nav.classList.toggle('nav-open'));
    links.forEach(link => link.addEventListener('click', () => nav.classList.remove('nav-open')));
}

/* ==========================================
   13. INIT
   ========================================== */
function initSite() {
    initParticles();
    initMatrix();
    initCursor();
    initUptime();
    initCounters();
    cargarProyectos();
    initScrollAnimations();
    initNavScroll();
    initGlitch();
    initHamburger();
}

document.addEventListener('DOMContentLoaded', runBootSequence);
