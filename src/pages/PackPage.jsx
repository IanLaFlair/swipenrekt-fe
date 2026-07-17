import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pack } from "../screens";
import { PACKS, RC, RGLOW } from "../data/seed.js";

function sizeFor(cnt) {
  return cnt <= 1 ? { w: 170, h: 232 } : cnt === 2 ? { w: 148, h: 204 } : cnt === 3 ? { w: 106, h: 146 } : cnt === 4 ? { w: 104, h: 142 } : { w: 94, h: 130 };
}

export default function PackPage() {
  const navigate = useNavigate();
  const { tier } = useParams();
  const [packPhase, setPackPhase] = useState("closed");
  const [packRevealed, setPackRevealed] = useState(0);
  const [packDragArmed, setPackDragArmed] = useState(false);
  const [packToast, setPackToast] = useState(null);

  const timersRef = useRef([]);
  const toastTimerRef = useRef(null);
  const dragStartRef = useRef(null);

  const clearPackTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  // Direct URL navigation between two /pack/:tier routes keeps this component
  // mounted (same route pattern) — reset local animation state when the tier
  // actually changes, matching what a fresh mount would give us.
  useEffect(() => {
    clearPackTimers();
    setPackPhase("closed");
    setPackRevealed(0);
    setPackToast(null);
    return clearPackTimers;
  }, [tier]);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const pk = PACKS[tier];

  const packStart = () => {
    if (packPhase !== "closed") return;
    clearPackTimers();
    const cards = pk.cards;
    const TEAR = 760;
    setPackPhase("tearing");
    setPackRevealed(0);
    timersRef.current.push(setTimeout(() => setPackPhase("revealing"), TEAR));
    let t = TEAR + 280;
    cards.forEach((c, i) => {
      const extra = (tier === "legendary" && i === cards.length - 1) ? 850 : 0;
      if (i > 0) t += 620;
      t += extra;
      const revealIdx = i + 1;
      timersRef.current.push(setTimeout(() => setPackRevealed(revealIdx), t));
    });
    timersRef.current.push(setTimeout(() => setPackPhase("done"), t + 720));
  };

  const packDown = (e) => { dragStartRef.current = { x: e.clientX, y: e.clientY }; setPackDragArmed(true); };
  const packMove = (e) => {
    if (!packDragArmed || !dragStartRef.current) return;
    const d = Math.hypot(e.clientX - dragStartRef.current.x, e.clientY - dragStartRef.current.y);
    if (d > 46) { setPackDragArmed(false); packStart(); }
  };
  const packUp = () => setPackDragArmed(false);
  const packReset = () => { clearPackTimers(); setPackPhase("closed"); setPackRevealed(0); };
  const packAddToAlbum = () => {
    setPackToast("Added to your Album ✓");
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setPackToast(null), 2100);
  };

  const torn = packPhase !== "closed";
  const n = pk.cards.length;
  const sz = sizeFor(n);
  const packCards = pk.cards.map((c, i) => {
    const open = i < packRevealed;
    const isActive = i === packRevealed - 1 && packPhase !== "done";
    const isHead = packPhase === "done" && (c.rarity === "legendary" || c.rarity === "epic") && i === n - 1;
    return {
      pos: c.pos, ovr: c.ovr, numLabel: "#" + c.num,
      rarityColor: RC[c.rarity], rarityLabel: c.rarity.toUpperCase(),
      glow: open ? RGLOW[c.rarity] : "transparent",
      w: sz.w + "px", h: sz.h + "px",
      flip: open ? "rotateY(0deg)" : "rotateY(180deg)",
      emph: isHead ? "scale(1.12)" : (isActive ? "scale(1.06)" : "scale(1)"),
      shown: torn ? 1 : 0
    };
  });

  const labelWords = pk.label.split(" ");
  const shimmerOn = pk.intensity >= 2 && !torn;
  const shSpeed = tier === "legendary" ? "1.6s" : (tier === "epic" ? "2.1s" : "2.8s");
  let statusText, statusColor;
  if (packPhase === "closed") { statusText = "Tap the pack to tear it open"; statusColor = "#8a8a9c"; }
  else if (packPhase === "tearing") { statusText = "Tearing open…"; statusColor = pk.color; }
  else if (packPhase === "revealing") { statusText = "Revealing " + packRevealed + " / " + n + "…"; statusColor = "#cfcfe0"; }
  else { statusText = tier === "legendary" ? "★  YOU PULLED A LEGENDARY!" : ("Nice pull — " + n + (n > 1 ? " cards" : " card") + " unlocked"); statusColor = pk.color; }

  return (
    <Pack
      v={{
        packBack: () => navigate("/profile"),
        pkStreak: pk.streak, pkGuarantee: pk.guarantee, pkColor: pk.color,
        pkLabelA: labelWords[0], pkLabelB: labelWords[1] || "",
        pkGlowColor: pk.glow,
        pkGlowOpacity: torn ? (0.35 + pk.intensity * 0.13) : (0.18 + pk.intensity * 0.09),
        pkOnOpen: packStart, pkOnDown: packDown, pkOnMove: packMove, pkOnUp: packUp,
        pkCoverPE: torn ? "none" : "auto",
        pkCoverOpacity: torn ? 0 : 1,
        pkTopCover: torn ? "translateY(-78%) rotate(-7deg)" : "translateY(0) rotate(0)",
        pkBottomCover: torn ? "translateY(82%) rotate(6deg)" : "translateY(0) rotate(0)",
        pkWiggle: packPhase === "closed" ? "packWiggle 2.8s ease-in-out infinite" : "none",
        pkShimmerOpacity: shimmerOn ? 1 : 0,
        pkShimmerAnim: shimmerOn ? ("shimmer " + shSpeed + " linear infinite") : "none",
        packCards,
        pkCardsOpacity: torn ? 1 : 0,
        pkShowBurst: packPhase === "done" && pk.intensity >= 3,
        pkStatusText: statusText, pkStatusColor: statusColor,
        pkShowDone: packPhase === "done",
        pkOnAdd: packAddToAlbum, pkOnReset: packReset,
        pkToastText: packToast || "",
        pkToastY: packToast ? 0 : 14,
        pkToastOpacity: packToast ? 1 : 0
      }}
    />
  );
}
