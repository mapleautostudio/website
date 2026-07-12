import { requireAdmin } from "@/lib/admin/guard";
import { getDraftPricing, getPublishedPricing } from "@/lib/content/pricing";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PricingEditor } from "@/components/admin/PricingEditor";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const { user } = await requireAdmin();
  const [draft, published] = await Promise.all([
    getDraftPricing(),
    getPublishedPricing(),
  ]);

  return (
    <>
      <AdminHeader email={user.email ?? undefined} />
      <main className="flex-1">
        <div className="container-x" style={{ paddingBlock: 40 }}>
          <div className="flex flex-col gap-2 mb-6">
            <span className="eyebrow">DETAILING PRICING</span>
            <h1
              className="m-0 font-display"
              style={{
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              <span className="text-fg-1">Edit the packages</span>{" "}
              <span className="text-fg-2">customers see.</span>
            </h1>
          </div>
          <PricingEditor initialDraft={draft} initialPublished={published} />
        </div>
      </main>
    </>
  );
}
