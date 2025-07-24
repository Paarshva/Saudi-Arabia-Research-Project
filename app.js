// app.js - Real company names for Saudi NBFI Dashboard

// --- Data: make sure company info exactly matches the profile table in your HTML ---
const COMPANIES = [
    {
        name: "Abdul Latif Jameel United Finance (ALJUF)",
        segment: "Traditional",
        assets: 5.49,
        profit: 628,
        core: "Auto & Consumer",
        license: "Full Finance",
        products: ["Auto", "Consumer", "SME", "Credit Cards"],
        funding: ["Bank Lines", "Securitisation", "Sukuk (planned)"],
        description: "Largest auto-finance player with expanding cash-finance and SME platform.",
        recent: "2024 cloud core migration; 2025 AI fraud system.",
        regulatory: "PDPL compliant; no material fines."
    },
    {
        name: "Nayifat Finance",
        segment: "Traditional",
        assets: 2.06,
        profit: 131,
        core: "Consumer & SME",
        license: "Full Finance",
        products: ["Consumer", "SME", "Credit Card"],
        funding: ["Bank Lines", "Receivable Assignment"],
        description: "Publicly listed consumer lender with growing SME book.",
        recent: "Crowdfunding sandbox approval 2024.",
        regulatory: "IFRS 9 ECL model independently validated."
    },
    {
        name: "Al Yusr Leasing & Financing",
        segment: "Traditional",
        assets: 3.95,
        profit: 75,
        core: "Auto, Consumer, SME",
        license: "Full Finance",
        products: ["Auto", "Consumer", "SME"],
        funding: ["Syndicated Murabaha"],
        description: "Captive auto-leasing subsidiary of major automotive group.",
        recent: "Oracle Fusion rollout 2024; new mobile app 2025.",
        regulatory: "Sharia committee oversight."
    },
    {
        name: "Quara Finance",
        segment: "Traditional",
        assets: 0.98,
        profit: 43,
        core: "Consumer & SME",
        license: "Full Finance",
        products: ["Consumer", "SME", "BNPL Aggregation"],
        funding: ["Murabaha", "Shareholder Loan"],
        description: "Digital-first consumer lender doubling equity to fund growth.",
        recent: "Open-banking rails integration 2025.",
        regulatory: "SAMA non-objection for dividend payouts."
    },
    {
        name: "AlJabr Finance",
        segment: "Traditional",
        assets: 3.95,
        profit: 105,
        core: "Auto",
        license: "Full Finance",
        products: ["Auto", "EV Finance"],
        funding: ["Securitisation", "Club Loan", "Sukuk planned"],
        description: "Kia distributor finance arm; strong in EV financing.",
        recent: "Planned sukuk issue 2025.",
        regulatory: "ISO 27001 certified platform."
    },
    {
        name: "Tamara Finance",
        segment: "Digital",
        assets: null,
        profit: null,
        core: "BNPL & Consumer",
        license: "Digital (Full CF since 2025)",
        products: ["BNPL", "Consumer Lending", "Card"],
        funding: ["Equity $500M", "Warehouse Lines"],
        description: "First Saudi fintech unicorn; 10m users, 30k merchants.",
        recent: "Series C unicorn round 2023; full licence 2025.",
        regulatory: "First BNPL platform with >SAR5k finance cap."
    },
    {
        name: "Tabby",
        segment: "Digital",
        assets: null,
        profit: null,
        core: "BNPL & Cards",
        license: "BNPL (moving to Digital CF)",
        products: ["BNPL", "Card", "Subscription"],
        funding: ["Equity $1.8B", "ABS Conduits"],
        description: "Largest MENA fintech by valuation; IPO planned.",
        recent: "Series E $160M 2025; Tweeq wallet acquisition.",
        regulatory: "Graduated from sandbox 2023."
    },
    {
        name: "MIS Forward",
        segment: "Digital",
        assets: null,
        profit: null,
        core: "BNPL",
        license: "BNPL only",
        products: ["BNPL", "Micro-loans"],
        funding: ["Corporate Facility"],
        description: "Spin-off from IT group providing BNPL at POS.",
        recent: "STC loyalty integration 2025.",
        regulatory: "BNPL permit March 2023."
    },
    {
        name: "Madfu",
        segment: "Digital",
        assets: null,
        profit: null,
        core: "BNPL",
        license: "BNPL only",
        products: ["BNPL (cashback)"],
        funding: ["Seed Equity", "Sukuk planned"],
        description: "Fashion & travel BNPL with cashback rewards.",
        recent: "Sharia certification 2025.",
        regulatory: "BNPL permit Oct 2024."
    },
    {
        name: "Spotii",
        segment: "Digital",
        assets: null,
        profit: null,
        core: "BNPL",
        license: "BNPL only",
        products: ["BNPL (Cross-border)"],
        funding: ["Parent Company Warehouse"],
        description: "Cross-border BNPL subsidiary of global player.",
        recent: "SAR sukuk localisation study.",
        regulatory: "BNPL permit Jan 2024."
    }
];

// --- Simple DOM switching logic for nav ---
const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');
navBtns.forEach(btn => btn.addEventListener('click', (e) => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.getAttribute('data-view');
    views.forEach(v => v.classList.remove('active'));
    document.getElementById(target + '-view').classList.add('active');
}));

// --- Table Rendering Logic ---
function renderTable() {
    const tbody = document.querySelector("#companies-table tbody");
    tbody.innerHTML = "";
    COMPANIES.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.name}</td>
            <td>${c.segment}</td>
            <td>${typeof c.assets === "number" ? c.assets.toFixed(2) : "-"}</td>
            <td>${c.profit !== null ? c.profit : "-"}</td>
            <td>${c.core}</td>
            <td>${c.license}</td>
            <td>${Array.isArray(c.products) ? c.products.join(", ") : c.products}</td>
        `;
        tbody.appendChild(tr);
    });
}
renderTable();

// -- Chart.js Assets Bar Chart (Traditional Only) --
function renderAssetBar() {
    const ctx = document.getElementById('chart-bar-assets').getContext('2d');
    const barLabels = COMPANIES.filter(c => typeof c.assets === "number").map(c => c.name);
    const barAssets = COMPANIES.filter(c => typeof c.assets === "number").map(c => c.assets);
    const barProfit = COMPANIES.filter(c => typeof c.profit === "number").map(c => c.profit);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: barLabels,
            datasets: [
                {
                    label: 'Assets (SAR bn)',
                    data: barAssets,
                    backgroundColor: '#21808d'
                },
                {
                    label: 'Net Profit (SAR m)',
                    data: barProfit,
                    backgroundColor: '#F59722'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                x: { ticks: { autoSkip: false } }
            }
        }
    });
}
renderAssetBar();

// -- Pie Chart (Aggregate Funding Structure) --
function renderFundingPie() {
    const ctx = document.getElementById('chart-pie-funding').getContext('2d');
    // Aggregate counts
    const fundingTypes = {};
    COMPANIES.forEach(c => {
        (c.funding || []).forEach(type => {
            fundingTypes[type] = (fundingTypes[type] || 0) + 1;
        });
    });
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(fundingTypes),
            datasets: [{
                data: Object.values(fundingTypes),
                backgroundColor: [
                    '#21808d', '#85a6b9', '#f4b86a', '#FCBF49',
                    '#50514F', '#247BA0', '#8DD3C7', '#FFDD67'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}
renderFundingPie();

// -- Product Stack Chart --
function renderProductStack() {
    const ctx = document.getElementById('chart-stack-products').getContext('2d');
    // Illustrative only: compare product focus of first 2 traditional and 2 digital
    const labels = ['Auto', 'Consumer', 'SME', 'BNPL', 'Cards', 'EV Finance', 'Subscription'];
    const companies = [
        COMPANIES[0].name,
        COMPANIES[1].name,
        COMPANIES[5].name,
        COMPANIES[6].name
    ];

    function getShare(c, prod) {
        return c.products.some(p => p.toLowerCase().includes(prod.toLowerCase())) ? 1 : 0;
    }

    const datasets = companies.map((n, i) => {
        const comp = COMPANIES.find(c => c.name === n);
        return {
            label: n,
            data: labels.map(p => getShare(comp, p)),
            backgroundColor: i < 2 ? '#21808d' : '#F59722'
        };
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            },
            scales: {
                x: { stacked: true, max: 1 },
                y: { stacked: true }
            }
        }
    });
}
renderProductStack();

// -- Asset share chart for Overview page (traditional vs digital) --
function renderOverviewChart() {
    const ctx = document.getElementById('assetShareChart').getContext('2d');
    const labels = ["Traditional NBFI (sum)", "Digital (no asset data)"];
    const traditionalAssets = COMPANIES.filter(c => c.segment === "Traditional" && typeof c.assets === "number")
        .reduce((a, b) => a + b.assets, 0);
    const data = [traditionalAssets, 0.5]; // Placeholder for digital

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#21808d', '#85a6b9']
            }]
        },
        options: {
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
renderOverviewChart();

// --- Glossary (already static in HTML, add tooltips or highlight in modals, left as exercise) ---

// Note: Add filtering, modals for detail cards, and glossary term hover logic as needed.
// This implementation provides the core structure and updated real company labels.
