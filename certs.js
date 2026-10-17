// ---------- Certification helper ----------
// status: ready | confirm | requested | none
const CERT_STATUS = {
    ready: { lab: 'Evidence ready', dot: 'bg-emerald-600', chip: 'bg-emerald-50 text-emerald-800 border-emerald-200', rgb: [4, 120, 87] },
    confirm: { lab: 'Consultant to confirm', dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-800 border-amber-200', rgb: [217, 119, 6] },
    requested: { lab: 'Requested from KEIM Germany', dot: 'bg-sky-600', chip: 'bg-sky-50 text-sky-800 border-sky-200', rgb: [2, 132, 199] },
    none: { lab: 'No advantage claimed', dot: 'bg-slate-400', chip: 'bg-slate-50 text-slate-600 border-slate-200', rgb: [148, 163, 184] }
};
const CERTS = {
    greenstar: {
        name: 'Green Star Buildings', ver: 'v1.1 (GBCA)', credits: [
            { c: 'Impacts Disclosure', st: 'confirm', how: 'Whole-of-life LCA (modules A to D) over 60 years. This is where KEIM&rsquo;s fewer repaints (B2) count.', ev: 'EN 15804+A2 EPDs; the module table and CSV below for the consultant&rsquo;s LCA.' },
            { c: 'Upfront Carbon Reduction', st: 'confirm', how: 'Counts A1 to A5 only (the first paint job). KEIM&rsquo;s 2-coat system uses a third less paint than a typical 3-coat acrylic system, so less upfront carbon. Per kg, the association EPD gives both the same carbon.', ev: 'Module table and CSV; Technical Data Sheets (coats and consumption). A KEIM-specific EPD (requested) could add more.' },
            { c: 'Exposure to Toxins', st: 'ready', how: 'Paint VOC content limits. KEIM Innostar 0&ndash;1 g/L, Innoprim 0&ndash;1 g/L, Soldalit 0&ndash;3 g/L.', ev: 'Technical Data Sheets; T&Uuml;V S&Uuml;D AgBB letter for Innostar.' },
            { c: 'Responsible Finishes', st: 'confirm', how: 'Third-party product certification for finishes.', ev: 'C2C Certified&reg; Full Scope Silver v5.0, certificate 12367.' }
        ]
    },
    well: {
        name: 'WELL', ver: 'v2 (IWBI)', credits: [
            { c: 'X07 Materials Transparency', st: 'ready', how: 'C2C Material Health Gold counts for Part 1 and Part 3.', ev: 'C2C Certified&reg; Material Health Gold certificate.' },
            { c: 'X08 Materials Optimization', st: 'ready', how: 'C2C Silver or higher counts for Part 2 (third-party certified products).', ev: 'C2C Certified&reg; Full Scope Silver v5.0, certificate 12367.' },
            { c: 'X06 VOC Restrictions (interior)', st: 'confirm', how: 'Needs VOC content compliance plus emissions testing (AgBB is listed). Innostar meets the AgBB 2024 scheme. Content is 0&ndash;1 g/L; the assessor confirms the content standard.', ev: 'T&Uuml;V S&Uuml;D letter 26-K1317-1 (16 Jun 2026), report 26-N1907-2; Innostar TDS.' },
            { c: 'X06 for Soldalit', st: 'none', how: 'X06 covers interior wet-applied products. Soldalit is a facade paint.', ev: '' }
        ]
    },
    leed: {
        name: 'LEED', ver: 'v5 (USGBC)', credits: [
            { c: 'Building Product Selection and Procurement', st: 'confirm', how: 'Product transparency and optimisation through third-party certification.', ev: 'C2C Certified&reg; Full Scope Silver v5.0 and Material Health Gold.' },
            { c: 'Low-Emitting Materials', st: 'confirm', how: 'LEED usually asks for CDPH v1.2 emissions testing. Innostar has AgBB testing; check whether the project can use it.', ev: 'T&Uuml;V S&Uuml;D AgBB letter for Innostar.' },
            { c: 'Reduce Embodied Carbon', st: 'confirm', how: 'EPD-based. The association EPDs qualify as industry-wide EPDs; a KEIM-specific EPD would rate higher.', ev: 'EN 15804+A2 association EPDs. KEIM-specific EPD requested.' }
        ]
    }
};
const EVIDENCE = [
    ['Cradle to Cradle Certified&reg; Full Scope Silver v5.0 (Material Health Gold, Circularity Silver), cert. 12367, EPEA', 'ready', 'ready', 'ready'],
    ['natureplus&reg; certified, full composition declared', 'ready', 'ready', ''],
    ['VOC content (Technical Data Sheet)', '0&ndash;1 g/L', '0&ndash;3 g/L', '0&ndash;1 g/L'],
    ['Organic content (Technical Data Sheet)', 'under 5%', 'under 5%', 'under 5%'],
    ['VOC emissions to AgBB 2024 (T&Uuml;V S&Uuml;D)', 'ready', 'requested', ''],
    ['Fire: A2-s1,d0 to EN 13501-1', '', 'ready', ''],
    ['EPD, EN 15804+A2', 'Association', 'Association', 'Association'],
    ['KEIM-specific EPD (old one expired July 2024)', 'requested', 'requested', 'requested']
];
let certTab = 'greenstar';
function renderCerts() {
    const tabs = document.getElementById('cert-tabs'); if (!tabs) return;
    tabs.innerHTML = Object.entries(CERTS).map(([k, v]) => '<button onclick="certTab=\'' + k + '\';renderCerts()" class="px-4 py-2 rounded-full text-xs sm:text-sm font-black border transition-colors ' + (k === certTab ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50') + '">' + v.name + ' <span class="font-medium opacity-75">' + v.ver + '</span></button>').join('');
    document.getElementById('cert-cards').innerHTML = CERTS[certTab].credits.map(x => {
        const s = CERT_STATUS[x.st];
        return '<div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"><div class="flex items-start justify-between gap-3 mb-2"><h4 class="font-black text-slate-900 text-sm sm:text-base">' + x.c + '</h4><span class="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full border ' + s.chip + '"><span class="w-2 h-2 rounded-full ' + s.dot + '"></span>' + s.lab + '</span></div><p class="text-xs sm:text-sm text-slate-600">' + x.how + '</p>' + (x.ev ? '<p class="text-[11px] sm:text-xs text-slate-500 mt-2"><strong class="text-slate-700">Evidence:</strong> ' + x.ev + '</p>' : '') + '</div>';
    }).join('');
    const cell = v => {
        if (v === 'ready') return '<span class="inline-flex items-center gap-1 text-emerald-700 font-bold"><i class="fa-solid fa-circle-check"></i> Yes</span>';
        if (v === 'requested') return '<span class="inline-flex items-center gap-1 text-sky-700 font-bold"><i class="fa-solid fa-clock"></i> Requested</span>';
        if (!v) return '<span class="text-slate-300">&ndash;</span>';
        return '<span class="font-bold text-slate-800">' + v + '</span>';
    };
    document.getElementById('cert-evidence').innerHTML = '<thead><tr class="text-left text-slate-500 border-b border-slate-200"><th class="py-2 pr-3 font-bold">Evidence</th><th class="py-2 px-2 font-bold">Innostar</th><th class="py-2 px-2 font-bold">Soldalit</th><th class="py-2 px-2 font-bold">Innoprim</th></tr></thead><tbody>' +
        EVIDENCE.map(r => '<tr class="border-b border-slate-100"><td class="py-2 pr-3 text-slate-700">' + r[0] + '</td><td class="py-2 px-2">' + cell(r[1]) + '</td><td class="py-2 px-2">' + cell(r[2]) + '</td><td class="py-2 px-2">' + cell(r[3]) + '</td></tr>').join('') + '</tbody>';
}
