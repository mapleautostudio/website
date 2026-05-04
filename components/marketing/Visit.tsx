import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { SHOP } from "@/lib/content/contact";

function MapPlaceholder() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "1.4 / 1",
        background: "var(--color-surface-deep)",
        border: "1px solid var(--color-hairline)",
        borderRadius: 6,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="grid"
            width="120"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 120 0 L 0 0 0 100"
              fill="none"
              stroke="var(--color-hairline)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />
        <line
          x1="0"
          y1="280"
          x2="800"
          y2="320"
          stroke="var(--color-hairline-2)"
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="120"
          x2="800"
          y2="80"
          stroke="var(--color-hairline-2)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <text
          x="20"
          y="270"
          fill="var(--color-fg-3)"
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="0.1em"
        >
          60 ST E
        </text>
        <text
          x="380"
          y="100"
          fill="var(--color-fg-3)"
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="0.1em"
        >
          FAITHFULL AVE
        </text>
        <text
          x="600"
          y="100"
          fill="var(--color-fg-3)"
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="0.1em"
        >
          MILLAR AVE
        </text>
        <text
          x="180"
          y="450"
          fill="var(--color-fg-3)"
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="0.1em"
        >
          NORTH INDUSTRIAL
        </text>

        <rect
          x="380"
          y="305"
          width="80"
          height="60"
          fill="none"
          stroke="var(--color-chrome)"
          strokeWidth="1.5"
        />
        <circle cx="450" cy="335" r="11" fill="var(--color-accent-soft)" />
        <circle cx="450" cy="335" r="5" fill="var(--color-accent)" />

        <g transform="translate(400, 270)">
          <rect
            x="0"
            y="0"
            width="220"
            height="26"
            fill="var(--color-surface-deep)"
            stroke="var(--color-hairline)"
            strokeWidth="1"
          />
          <text
            x="110"
            y="17"
            fill="var(--color-fg-1)"
            fontFamily="monospace"
            fontSize="11"
            textAnchor="middle"
          >
            MAPLE · 331 60 ST E #10
          </text>
        </g>
      </svg>
    </div>
  );
}

export function Visit() {
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(
    `${SHOP.location.line1}, ${SHOP.location.city}`
  )}`;

  return (
    <section id="visit" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end mb-12 lg:mb-16">
          <div>
            <span className="eyebrow block mb-5">VISIT</span>
            <h2
              className="m-0 font-display"
              style={{
                fontSize: "clamp(32px, 5.5vw, 56px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
              }}
            >
              <span className="text-fg-1">{SHOP.location.streetHeading}</span>
              <br />
              <span className="text-fg-2">
                {SHOP.location.neighborhoodHeading}
              </span>
            </h2>
          </div>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors self-start sm:self-auto"
            style={{ fontSize: 14 }}
          >
            Open in Maps
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </div>

        <MapPlaceholder />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mt-10 lg:mt-12">
          <div className="flex flex-col gap-4">
            <h3
              className="m-0 font-display"
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                lineHeight: 1.1,
              }}
            >
              {SHOP.location.line1}
            </h3>
            <p
              className="m-0 text-fg-2"
              style={{ fontSize: 15, lineHeight: 1.6 }}
            >
              {SHOP.location.city}
              <br />
              {SHOP.location.note}
              <br />
              {SHOP.location.parking}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2">
              <a
                href={`tel:${SHOP.phoneTel}`}
                className="inline-flex items-center gap-2 text-fg-1 hover:text-chrome transition-colors"
                style={{ fontSize: 14 }}
              >
                <Phone size={14} strokeWidth={1.5} /> {SHOP.phone}
              </a>
              <a
                href={`mailto:${SHOP.email}`}
                className="inline-flex items-center gap-2 text-fg-1 hover:text-chrome transition-colors break-all"
                style={{ fontSize: 14 }}
              >
                <Mail size={14} strokeWidth={1.5} /> {SHOP.email}
              </a>
            </div>
          </div>

          <div>
            <span className="eyebrow block mb-4">HOURS</span>
            <ul className="list-none m-0 p-0 flex flex-col">
              {SHOP.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between py-3 gap-4"
                  style={{ borderBottom: "1px solid var(--color-hairline)" }}
                >
                  <span
                    className="text-fg-1 whitespace-nowrap"
                    style={{ fontSize: 14 }}
                  >
                    {h.day}
                  </span>
                  <span className="meta whitespace-nowrap">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
