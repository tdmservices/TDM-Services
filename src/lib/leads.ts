/**
 * Saves an enquiry to the leads table, where the admin's Leads tab reads it.
 *
 * Runs in the browser with the public key. The database lets visitors add a
 * lead and nothing else — they cannot read, change or delete any.
 */
export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  locale?: string;
  /** Which form or tool the lead came from, e.g. "contact-form" or "seo-audit". */
  source?: string;
}

const trim = (v: string | undefined, max: number) => {
  const s = (v ?? "").trim().slice(0, max);
  return s || null;
};

export async function saveLead(input: LeadInput): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: trim(input.name, 200),
        email: trim(input.email, 320),
        phone: trim(input.phone, 60),
        service: trim(input.service, 200),
        message: trim(input.message, 5000),
        locale: trim(input.locale, 10),
        page: typeof window === "undefined" ? null : window.location.pathname.slice(0, 500),
        source: trim(input.source, 60) ?? "contact-form",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
