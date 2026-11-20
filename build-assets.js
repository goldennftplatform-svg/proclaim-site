// SPDX-License-Identifier: MIT AND Apache-2.0
// Generates two self-contained SVG graphics for the proclaim public site.
// No network, no external fonts. Data is hard-coded from staged/PROGRESS.md
// and must be updated if those numbers change.
const fs = require('fs');
const path = require('path');
const OUT = __dirname;

const hero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="proclaim — a public registry for Logos programs">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1020"/><stop offset="0.55" stop-color="#111a35"/><stop offset="1" stop-color="#0b1020"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6ee7ff"/><stop offset="0.5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#34d399"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="26"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="960" cy="150" r="180" fill="#6ee7ff" opacity="0.10" filter="url(#soft)"/>
  <circle cx="240" cy="520" r="200" fill="#8b5cf6" opacity="0.10" filter="url(#soft)"/>
  <text x="80" y="120" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="26" fill="#94a3b8" letter-spacing="6">LOGOS ECOSYSTEM</text>
  <text x="80" y="215" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="86" font-weight="700" fill="#f8fafc">proclaim</text>
  <rect x="80" y="248" width="120" height="5" rx="3" fill="url(#glow)"/>
  <text x="80" y="320" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="34" fill="#e2e8f0">A public registry for Logos programs.</text>
  <text x="80" y="362" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="22" fill="#94a3b8">Find who built what, verify the source,</text>
  <text x="80" y="392" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="22" fill="#94a3b8">and search by name.</text>
  <g font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="20">
    <g transform="translate(690,235)">
      <rect width="440" height="300" rx="18" fill="#0f1830" stroke="#334155" stroke-width="2"/>
      <text x="26" y="46" fill="#cbd5e1" font-size="22" font-weight="600">Registry</text>
      <g transform="translate(26,70)">
        <rect width="388" height="46" rx="9" fill="#16223f" stroke="#334155"/><circle cx="24" cy="23" r="8" fill="#34d399"/><text x="46" y="30" fill="#e2e8f0">wallet-core</text><text x="300" y="30" fill="#6ee7ff" font-size="16">verified</text>
        <rect y="54" width="388" height="46" rx="9" fill="#16223f" stroke="#334155"/><circle cx="24" cy="77" r="8" fill="#34d399"/><text x="46" y="84" fill="#e2e8f0">registry-sdk</text><text x="300" y="84" fill="#6ee7ff" font-size="16">verified</text>
        <rect y="108" width="388" height="46" rx="9" fill="#16223f" stroke="#334155"/><circle cx="24" cy="131" r="8" fill="#fbbf24"/><text x="46" y="138" fill="#e2e8f0">mini-app</text><text x="300" y="138" fill="#fbbf24" font-size="16">pending</text>
        <rect y="162" width="388" height="46" rx="9" fill="#16223f" stroke="#334155"/><circle cx="24" cy="185" r="8" fill="#34d399"/><text x="46" y="192" fill="#e2e8f0">token-bridge</text><text x="300" y="192" fill="#6ee7ff" font-size="16">verified</text>
      </g>
    </g>
    <g transform="translate(120,430)">
      <rect width="360" height="120" rx="16" fill="#0f1830" stroke="#334155" stroke-width="2"/>
      <text x="24" y="40" fill="#cbd5e1" font-size="20" font-weight="600">Six on-chain instructions</text>
      <text x="24" y="76" fill="#94a3b8" font-size="17">register · update · verify · search · lookup · init</text>
      <text x="24" y="102" fill="#64748b" font-size="15">Built and published locally — see the build page for status</text>
    </g>
  </g>
  <text x="80" y="600" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="16" fill="#64748b">Early-stage open source · MIT and Apache-2.0 · Not deployed to testnet yet</text>
</svg>`;

const status = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" role="img" aria-label="Build status: LP-0023 registry 15 of 28 items; LP-0021 and LP-0001 scaffolding in progress">
  <defs><linearGradient id="b2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1020"/><stop offset="1" stop-color="#131c36"/></linearGradient></defs>
  <rect width="1200" height="340" fill="url(#b2)"/>
  <text x="60" y="66" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="30" font-weight="700" fill="#f8fafc">Where the build actually is</text>
  <text x="60" y="98" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="17" fill="#94a3b8">Local, verifiable progress — not prize credit, not deployment</text>
  <g font-family="Segoe UI,Helvetica,Arial,sans-serif">
    ${[['LP-0023  Program Registry','15 / 28 items',0.54,'#34d399'],
       ['LP-0021  Wallet + Provider SDK','0 / 32 criteria',0.08,'#8b5cf6'],
       ['LP-0001  NFT + Private Proofs','0 / 46 criteria',0.05,'#6ee7ff']].map((r,i)=>{
      const y=140+i*64; const w=760;
      return `<text x="60" y="${y}" font-size="18" fill="#e2e8f0">${r[0]}</text>
      <text x="980" y="${y}" font-size="17" fill="#94a3b8">${r[1]}</text>
      <rect x="60" y="${y+12}" width="${w}" height="12" rx="6" fill="#1e293b"/>
      <rect x="60" y="${y+12}" width="${(w*r[2]).toFixed(1)}" height="12" rx="6" fill="${r[3]}"/>`;
    }).join('')}
  </g>
  <text x="60" y="326" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="15" fill="#64748b">326 passing tests across eight local workspaces · E2E CI still failing</text>
</svg>`;

const spdx = '<!-- SPDX-License-Identifier: MIT AND Apache-2.0 -->\n';
fs.writeFileSync(path.join(OUT, 'hero.svg'), spdx + hero);
fs.writeFileSync(path.join(OUT, 'status.svg'), spdx + status);
console.log('wrote hero.svg and status.svg');
