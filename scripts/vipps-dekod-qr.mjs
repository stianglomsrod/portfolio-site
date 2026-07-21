/* Dekoder den offisielle Vipps-QR-en (lastet ned fra bedriftsportalen,
   «Plakater og QR-koder») i byggetid og skriver src/data/vipps.json med den
   eksakte URL-en. Mobilknappen bruker URL-en som href — lenkeformater skal
   aldri gjettes, derfor er QR-fila eneste kilde.

   Kjøres som prebuild (se package.json). Feiler HARDT (fail-closed) hvis
   fila mangler, ikke kan dekodes, eller innholdet ikke er en
   https://qr.vipps.no/-URL — et byttet/forgiftet QR-bilde skal stoppe
   bygget, aldri bli en href. */
import { readFileSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

const KILDE = new URL('../public/vipps/vipps-qr-59882.png', import.meta.url);
const MAAL = new URL('../src/data/vipps.json', import.meta.url);
const NUMMER = '59882';

const feil = (melding) => {
  console.error(`vipps-dekod-qr: ${melding}`);
  process.exit(1);
};

let png;
try {
  png = PNG.sync.read(readFileSync(KILDE));
} catch (e) {
  feil(`kunne ikke lese public/vipps/vipps-qr-59882.png: ${e.message}`);
}

const kode = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
if (!kode || !kode.data) feil('fant ingen QR-kode i bildet');

const raa = kode.data.trim();
if (raa.length > 300) feil(`dekodet innhold er urimelig langt (${raa.length} tegn)`);

let url;
try {
  url = new URL(raa);
} catch {
  feil(`dekodet innhold er ikke en URL: «${raa}»`);
}
if (url.protocol !== 'https:') feil(`URL-en er ikke https: «${raa}»`);
if (url.hostname !== 'qr.vipps.no') feil(`URL-en peker ikke på qr.vipps.no: «${raa}»`);
if (url.username || url.password) feil('URL-en inneholder innebygd legitimasjon');

writeFileSync(
  MAAL,
  JSON.stringify(
    { nummer: NUMMER, url: url.href, kilde: 'public/vipps/vipps-qr-59882.png' },
    null,
    2
  ) + '\n'
);
console.log(`vipps-dekod-qr: OK — ${url.href}`);
