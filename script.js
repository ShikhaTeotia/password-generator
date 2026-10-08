// Same character sets as Python's string module
const SETS = {
  lower:  "abcdefghijklmnopqrstuvwxyz",
  upper:  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols:"!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};
const $ = id => document.getElementById(id);
const len = $("len"), out = $("out");

function buildPool(){
  let s = [];
  for (const k in SETS) if ($(k).checked) s.push(...SETS[k]);   // s.extend(list(...))
  return s;
}
function randInt(n){                       // unbiased crypto-random integer in [0,n)
  const max = Math.floor(4294967296 / n) * n, a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= max);
  return a[0] % n;
}
function shuffle(a){                       // random.shuffle(s)
  for (let i = a.length - 1; i > 0; i--){ const j = randInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function generate(){
  const pool = buildPool(), plen = Math.min(+len.value, pool.length);
  if (!pool.length){ out.className = "empty"; out.textContent = "Turn on at least one character type"; return; }
  out.className = "";
  out.textContent = shuffle(pool).slice(0, plen).join("");          // "".join(s[0:plen])
  $("copy").textContent = "Copy"; $("copy").classList.remove("done");
}
function update(){
  const pool = buildPool(), n = pool.length;
  len.max = Math.max(4, Math.min(94, n || 94));
  if (+len.value > +len.max) len.value = len.max;
  $("lenVal").textContent = len.value;
  len.style.setProperty("--p", ((len.value - len.min) / (len.max - len.min) * 100) + "%");
  const L = Math.min(+len.value, n);
  // unique characters, so combinations = n!/(n-L)!
  let bits = 0; for (let i = 0; i < L; i++) bits += Math.log2(n - i);
  const lv = !n ? ["—",0,"var(--line)"] : bits < 40 ? ["Weak",20,"var(--red)"] : bits < 70 ? ["Fair",50,"var(--amber)"]
           : bits < 100 ? ["Strong",78,"var(--mint)"] : ["Excellent",100,"var(--mint)"];
  $("label").textContent = lv[0]; $("bar").style.width = lv[1] + "%"; $("bar").style.background = lv[2];
  $("bits").textContent = n ? Math.round(bits) + " bits of entropy" : "";
  $("msg").textContent = n ? "" : "Select a character type";
}
$("gen").onclick = generate;
len.oninput = () => { update(); generate(); };
for (const k in SETS) $(k).onchange = () => { update(); generate(); };
$("copy").onclick = async () => {
  if (out.className === "empty") return;
  try { await navigator.clipboard.writeText(out.textContent); }
  catch (e) { const r = document.createRange(); r.selectNodeContents(out); getSelection().removeAllRanges(); getSelection().addRange(r); document.execCommand("copy"); }
  $("copy").textContent = "Copied"; $("copy").classList.add("done");
};
update(); generate();
