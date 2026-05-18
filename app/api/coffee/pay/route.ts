import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.OLYCASH_API_URL ?? "https://api.olycash.com/v2";
const OLYCASH_ID = process.env.OLYCASH_ID ?? "";
const OLYCASH_PASSWORD = process.env.OLYCASH_PASSWORD ?? "";

async function getKey(): Promise<string> {
    const res = await fetch(`${API_URL}/authorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ olycash_id: OLYCASH_ID, password: OLYCASH_PASSWORD }),
    });
    if (!res.ok) throw new Error("OlyCash authorization failed");
    const data = await res.json();
    return data.key as string;
}

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, phone, amount } = await req.json();

        if (!firstName || !lastName || !phone || !amount) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const key = await getKey();

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;
        const webhookUrl = `${appUrl}/api/coffee/webhook`;

        const payRes = await fetch(`${API_URL}/purchases/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: key,
                Account: OLYCASH_ID,
            },
            body: JSON.stringify({
                account_id: OLYCASH_ID,
                item_name: "Coffee",
                quantity: 1,
                total: amount,
                price: amount,
                currency: "UGX",
                buyer_first_name: firstName,
                buyer_last_name: lastName,
                buyer_email: `${phone}@olycash.local`,
                buyer_telephone: phone,
                method: "mobile_money",
                post_response_url: webhookUrl,
                fee_paid_by: "payer",
            }),
        });

        const data = await payRes.json();
        // console.log("🚀 ~ POST ~ data:", data)

        if (!payRes.ok || data.message !== "OK") {
            return NextResponse.json({ error: data.message ?? "Payment initiation failed." }, { status: 502 });
        }

        return NextResponse.json({ purchase_id: data.purchase_id, status: data.status });
    } catch (err) {
        // console.log("Payment error:", err);
        const msg = err instanceof Error ? err.message : "Server error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
