import { useNavigate, useParams } from "react-router-dom";
import { Country } from "../screens";
import { COUNTRIES, ownedCountFor, genPlayers, RC, RGLOW } from "../data/seed.js";

export default function CountryPage() {
  const navigate = useNavigate();
  const { idx } = useParams();
  const ci = Number(idx);
  const co = COUNTRIES[ci] || { n: "", f: "" };
  const cOwned = ownedCountFor(ci);
  const cComplete = cOwned >= 26;

  const countryCards = genPlayers(ci).map((p) => ({
    name: p.name, pos: p.pos, numLabel: "#" + p.num, owned: p.owned, locked: !p.owned,
    rarityColor: RC[p.rar], rarityLabel: p.rar.toUpperCase(),
    glow: RGLOW[p.rar]
  }));

  return (
    <Country
      v={{
        backToAlbum: () => navigate("/album"),
        countryFlag: co.f, countryName: co.n,
        cOwned, cComplete,
        cPctW: Math.round(cOwned / 26 * 100) + "%",
        countryCards,
        championName: co.n.toUpperCase() + " CHAMPION"
      }}
    />
  );
}
