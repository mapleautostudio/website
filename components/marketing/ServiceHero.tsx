"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { type Service } from "@/lib/content/services";
import { BOOKING_HREF } from "@/lib/content/contact";

const ease = [0.22, 1, 0.36, 1] as const;

type ServiceHeroData = Omit<Service, "icon">;

export function ServiceHero({
  service,
  iconNode,
}: {
  service: ServiceHeroData;
  iconNode: ReactNode;
}) {
  const headline = service.hero.headline;
  const commaIdx = headline.indexOf(",");
  const headlineFirst = commaIdx >= 0 ? headline.slice(0, commaIdx + 1) : headline;
  const headlineSecond = commaIdx >= 0 ? headline.slice(commaIdx + 1).trim() : null;
  const hasRightColumn = !!service.heroImage || !!service.heroPlaceholder;

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: 144, paddingBottom: 96 }}
    >
      <div className="container-x">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-12"
          style={{ fontSize: 13 }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> All services
        </Link>

        <div
          className={
            hasRightColumn
              ? "grid grid-cols-1 lg:grid-cols-[1fr_45%] gap-10 lg:gap-16 lg:items-center"
              : "max-w-230 flex flex-col gap-8"
          }
        >
          <motion.div
            className="flex flex-col gap-8 order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
          >
            <motion.div
              className="flex items-center gap-4"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              {iconNode}
              <span className="eyebrow">{service.hero.eyebrow}</span>
            </motion.div>

            <motion.h1
              className="m-0 font-display"
              style={{
                fontSize: hasRightColumn
                  ? "clamp(40px, 5.6vw, 72px)"
                  : "clamp(48px, 7vw, 88px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                maxWidth: hasRightColumn ? 580 : undefined,
              }}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              {headlineSecond ? (
                <>
                  <span className="text-fg-1">{headlineFirst}</span>{" "}
                  <em style={{ color: "var(--color-accent)", opacity: 0.9 }}>
                    {headlineSecond}
                  </em>
                </>
              ) : (
                <span className="text-fg-1">{headlineFirst}</span>
              )}
            </motion.h1>

            <motion.p
              className="m-0 body-lg"
              style={{ maxWidth: 520 }}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              {service.hero.sub}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-2"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <Link
                href={`${BOOKING_HREF}?service=${service.slug}`}
                className="btn btn--primary"
              >
                Book {service.shortTitle.toLowerCase()}
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <Link href="/#services" className="btn btn--ghost">
                Other services
              </Link>
            </motion.div>
          </motion.div>

          {hasRightColumn && (
            <motion.div
              className="relative order-1 lg:order-2"
              style={{ height: "clamp(280px, 56vh, 560px)" }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.7, ease, delay: 0.1 },
              }}
            >
              {service.heroImage ? (
                <>
                  <Image
                    src={service.heroImage.src}
                    alt={service.heroImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: service.heroImage.objectPosition ?? "center",
                    }}
                    priority
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(15,20,24,0) 60%, rgba(15,20,24,0.42) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      boxShadow: "inset 0 0 0 1px var(--color-hairline)",
                      pointerEvents: "none",
                    }}
                  />
                </>
              ) : service.heroPlaceholder ? (
                <div
                  className="w-full h-full relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-elevated), var(--color-elevated-2))",
                    border: "1px solid var(--color-hairline)",
                  }}
                >
                  <span
                    aria-hidden
                    className="font-display"
                    style={{
                      position: "absolute",
                      bottom: "-0.18em",
                      right: "-0.04em",
                      fontSize: "clamp(180px, 26vw, 360px)",
                      fontWeight: 200,
                      color: "var(--color-accent)",
                      opacity: 0.18,
                      lineHeight: 0.8,
                      letterSpacing: "-0.06em",
                    }}
                  >
                    {service.num}
                  </span>

                  <span
                    className="eyebrow"
                    style={{
                      position: "absolute",
                      top: "clamp(24px, 4vw, 36px)",
                      left: "clamp(24px, 4vw, 36px)",
                      color: "var(--color-accent)",
                    }}
                  >
                    MAPLE · {service.num}
                  </span>

                  <ul
                    className="list-none m-0 p-0 flex flex-col"
                    style={{
                      position: "absolute",
                      bottom: "clamp(24px, 4vw, 36px)",
                      left: "clamp(24px, 4vw, 36px)",
                      gap: 6,
                      maxWidth: "75%",
                    }}
                  >
                    {service.heroPlaceholder.meta.map((m) => (
                      <li
                        key={m}
                        className="font-display"
                        style={{
                          fontSize: "clamp(20px, 2.4vw, 28px)",
                          fontWeight: 300,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                          color: "var(--color-fg-1)",
                        }}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
