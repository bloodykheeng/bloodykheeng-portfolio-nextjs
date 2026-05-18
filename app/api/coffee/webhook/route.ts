import { NextRequest, NextResponse } from "next/server";

interface PaymentRecord {
    status: string;
    amount?: string;
    code?: string;
    buyerName?: string;
    updatedAt: number;
}

// Module-level store — persists within a serverless function instance.
// Fine for a portfolio site; replace with a DB for production scale.
const payments = new Map<string, PaymentRecord>();

// OlyCash POSTs application/x-www-form-urlencoded to this endpoint
export async function POST(req: NextRequest) {
    try {
        const text = await req.text();
        const params = new URLSearchParams(text);

        const purchaseId = params.get("purchase_id");
        const message = params.get("message");

        if (!purchaseId || !message) {
            return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
        }

        const statusMap: Record<string, string> = {
            initiated: "initiated",
            success: "success",
            fail: "fail",
        };

        payments.set(purchaseId, {
            status: statusMap[message] ?? "pending",
            amount: params.get("amount") ?? undefined,
            code: params.get("code") ?? undefined,
            buyerName: params.get("buyer_name") ?? undefined,
            updatedAt: Date.now(),
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}

// Frontend polls this to get payment status
export async function GET(req: NextRequest) {
    const purchaseId = req.nextUrl.searchParams.get("purchase_id");

    if (!purchaseId) {
        return NextResponse.json({ status: "unknown" }, { status: 400 });
    }

    const record = payments.get(purchaseId);
    if (!record) {
        return NextResponse.json({ status: "pending" });
    }

    return NextResponse.json({
        status: record.status,
        amount: record.amount,
        code: record.code,
        buyerName: record.buyerName,
    });
}
