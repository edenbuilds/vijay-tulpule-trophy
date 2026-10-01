// Paste into the browser console on any page of the site (it loads the other pages in same-origin iframes).
// Reports, for every route at each width: widows (one word alone on the last line of a text block), orphaned items (one item alone on the last row of a
// grid or wrapping flex) and sideways overflow. Written because "no widows or orphans, desktop and mobile" cannot be
// checked by eye across twelve pages at four widths. Judge each hit: a lone last card can be deliberate.
//
//   await wrapAudit()                       // everything
//   await wrapAudit({ routes: ["/trophy"], widths: [390] })
window.wrapAudit = async ({
  routes = ["/", "/teams", "/fixtures", "/format", "/trophy", "/gallery", "/about", "/sponsors", "/ceremonies", "/poem", "/contact", "/downloads"],
  widths = [390, 768, 1024, 1440],
} = {}) => {
  const TEXT = "h1,h2,h3,h4,h5,h6,p,li,figcaption,dt,dd,blockquote";
  const audit = (win) => {
    const d = win.document;
    const out = [];
    const cs = (el) => win.getComputedStyle(el);
    const shown = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && cs(el).visibility !== "hidden";
    };
    const blocks = new Map();
    const walker = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode()); ) {
      if (!n.nodeValue.trim() || !n.parentElement || n.parentElement.closest("script,style,noscript,svg,[aria-hidden='true']")) continue;
      let el = n.parentElement;
      while (el && cs(el).display.startsWith("inline")) el = el.parentElement;
      if (!el) continue;
      // Split-text headings wrap every line in its own element, so measure from the heading; a flex or grid
      // list item holds separate columns, so measure each column instead.
      const root = el.closest(TEXT);
      const holdsBlocks = (r) => [...r.querySelectorAll("*")].some((c) => !cs(c).display.startsWith("inline") && cs(c).display !== "none" && !c.closest("svg"));
      if (root && !/flex|grid/.test(cs(root).display) && (/^(H[1-6]|P)$/.test(root.tagName) || !holdsBlocks(root))) el = root;
      if (!shown(el)) continue;
      if (!blocks.has(el)) blocks.set(el, []);
      blocks.get(el).push(n);
    }
    for (const [el, nodes] of blocks) {
      const words = [];
      for (const n of nodes) {
        for (const m of n.nodeValue.matchAll(/\S+/g)) {
          const r = d.createRange();
          r.setStart(n, m.index);
          r.setEnd(n, m.index + m[0].length);
          const b = r.getClientRects();
          if (b.length) words.push({ w: m[0], top: b[0].top, h: b[0].height });
        }
      }
      if (words.length < 2) continue;
      const lines = [];
      for (const w of words.sort((a, b) => a.top - b.top)) {
        const l = lines.find((l) => Math.abs(l.top - w.top) < w.h / 2);
        if (l) l.n++;
        else lines.push({ top: w.top, n: 1, first: w.w });
      }
      const last = lines[lines.length - 1];
      if (lines.length >= 2 && last.n === 1 && words.length >= 3) out.push({ kind: "widow", text: words.map((w) => w.w).join(" ").slice(0, 70), last: last.first });
    }
    for (const c of d.querySelectorAll("*")) {
      const s = cs(c);
      if (c.tagName === "FORM") continue; // a full-width message field and a button are not orphans
      if (!(s.display === "grid" || (s.display === "flex" && s.flexWrap !== "nowrap"))) continue;
      const kids = [...c.children].filter((k) => shown(k) && cs(k).position !== "absolute" && cs(k).position !== "fixed");
      if (kids.length < 3) continue;
      const rows = [];
      for (const k of kids.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)) {
        const r = k.getBoundingClientRect();
        const row = rows[rows.length - 1];
        if (row && r.top < row.bottom - 4) {
          row.n++;
          row.bottom = Math.min(row.bottom, r.bottom);
        } else rows.push({ n: 1, bottom: r.bottom, wide: r.width > c.getBoundingClientRect().width * 0.9 });
      }
      // A last item that spans the full row is a deliberate closing row, not an orphan.
      if (rows[rows.length - 1].wide) continue;
      if (rows.length >= 2 && rows[0].n >= 2 && rows[rows.length - 1].n === 1) {
        out.push({ kind: "orphan item", text: `${c.tagName.toLowerCase()}.${(c.className || "").toString().split(" ").slice(0, 3).join(".")} rows ${rows.map((r) => r.n).join("+")}` });
      }
    }
    // Content wider than its own box (an unbreakable name or number in a row that is too narrow for it).
    for (const c of d.querySelectorAll("body *")) {
      if (c.closest("svg") || cs(c).overflowX !== "visible" || cs(c).display.startsWith("inline") || !shown(c)) continue;
      if (c.scrollWidth > c.clientWidth + 1 && c.clientWidth > 0) out.push({ kind: "spill", text: `${c.tagName.toLowerCase()} ${c.scrollWidth} > ${c.clientWidth}: ${(c.textContent || "").trim().slice(0, 40)}` });
    }
    if (d.documentElement.scrollWidth > win.innerWidth + 1) out.push({ kind: "overflow", text: `${d.documentElement.scrollWidth} > ${win.innerWidth}` });
    return out;
  };

  const results = [];
  for (const width of widths) {
    for (const route of routes) {
      const f = document.createElement("iframe");
      f.style.cssText = `position:fixed;left:-20000px;top:0;width:${width}px;height:900px;border:0`;
      f.src = route;
      document.body.appendChild(f);
      await new Promise((r) => (f.onload = r));
      await f.contentWindow.document.fonts.ready;
      await new Promise((r) => setTimeout(r, 2200));
      // Entrance animations offset text; measure it where it comes to rest.
      const st = f.contentDocument.createElement("style");
      st.textContent = "*,*::before,*::after{transition:none!important;animation:none!important}";
      f.contentDocument.head.appendChild(st);
      for (const hit of audit(f.contentWindow)) results.push({ width, route, ...hit });
      f.remove();
    }
  }
  const seen = new Set();
  return results.filter((r) => !seen.has(JSON.stringify(r)) && seen.add(JSON.stringify(r)));
};
