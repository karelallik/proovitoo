# Liikluskindlustuse pakkumiste võrdlus

Lihtne React + TypeScript rakendus, mis on valminud live-coding ülesande raames.

## Kasutajalugu

> Kasutajana tahan sisestada oma sõiduki registrinumbri ja näha liikluskindlustuse pakkumistest kõige odavamat, et saaksin kiiresti teada, milline kindlustus mulle kõige vähem maksab.

---

## Ülesande kirjeldus

Rakendus võimaldab kasutajal:

- sisestada sõiduki registrinumbri;
- laadida pakkumised failist `offers.json`;
- leida kehtivate MTPL pakkumiste seast odavaim pakkumine;
- kuvada:
  - kindlustusseltsi;
  - algse hinna;
  - normaliseeritud aastahinna;
  - võrreldud pakkumiste arvu.

Rakendus käsitleb `offers.json` faili nagu päris API vastust ning arvestab vigaste või puudulike andmetega.

---

## Kasutatud tehnoloogiad

- React
- TypeScript
- Vite

---

## Käivitamine

Paigalda sõltuvused:

```bash
npm install
```

Käivita arenduskeskkond:

```bash
npm run dev
```

Ehita tootmisversioon:

```bash
npm run build
```

Käivita lint:

```bash
npm run lint
```

---

## Tehtud otsused

Lahenduse koostamisel lähtusin põhimõttest, et äriloogika ja kasutajaliides oleksid eraldatud.

- `App.tsx` vastutab kasutajaliidese eest.
- `offers.ts` sisaldab kogu äriloogikat (andmete valideerimine, normaliseerimine ja odavaima pakkumise leidmine).

Registrinumbrid normaliseeritakse (tühikud, sidekriipsud ja suur-/väiketähed), et kasutaja saaks neid sisestada erineval kujul.

Pakkumiste võrdlemisel:

- arvestatakse ainult `MTPL` pakkumisi;
- arvestatakse ainult `status = ok` pakkumisi;
- vigased või puudulikud kirjed jäetakse vahele;
- kuupõhised hinnad teisendatakse aastahinnaks, et hinnad oleksid võrreldavad.

---

## Näidisregistrid

Rakendust saab testida järgmiste registrinumbritega:

- `123ABC`
- `456DEF`