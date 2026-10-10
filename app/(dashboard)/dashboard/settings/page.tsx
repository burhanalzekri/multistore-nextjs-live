import { requireShop } from "@/lib/tenant";
import { SettingsForm } from "@/components/settings-form";
export default async function SettingsPage() {
  const { shop } = await requireShop();
  return (
    <>
      <h1 className="mb-2 text-3xl font-black">إعدادات المتجر</h1>
      <p className="mb-6 text-slate-500">خصص الهوية والاتصال والمنطقة والبيع لمتجرك.</p>
      <SettingsForm
        shop={{
          id: shop.id,
          name: shop.name,
          slug: shop.slug,
          description: shop.description || "",
          primaryColor: shop.primaryColor,
          secondaryColor: shop.secondaryColor,
          currency: shop.currency,
          currencySymbol: shop.currencySymbol,
          currencyPosition: shop.currencyPosition,
          decimals: shop.decimals,
          language: shop.language,
          direction: shop.direction,
          timezone: shop.timezone,
          contactEmail: shop.contactEmail || "",
          phone: shop.phone || "",
          whatsapp: shop.whatsapp || "",
          address: shop.address || "",
          city: shop.city || "",
          region: shop.region || "",
          country: shop.country,
          googleMapsUrl: shop.googleMapsUrl || "",
          taxName: shop.taxName || "",
          taxPercent: shop.taxPercent,
          taxInclusive: shop.taxInclusive,
          seoTitle: shop.seoTitle || "",
          seoDescription: shop.seoDescription || "",
        }}
      />
    </>
  );
}
