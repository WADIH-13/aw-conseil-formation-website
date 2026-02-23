import { NextRequest, NextResponse } from "next/server";
import { getCartByGuestToken } from "@/lib/universe/queries";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const guestToken = searchParams.get("guest_token");

  if (!guestToken) {
    return NextResponse.json({ error: "Missing guest_token" }, { status: 400 });
  }

  try {
    const cart = await getCartByGuestToken(guestToken);

    if (!cart || cart.cart_items.length === 0) {
      return NextResponse.json({ error: "Cart not found or empty" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Cart data ready for PDF export",
      cart,
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return NextResponse.json({ error: "Failed to export PDF" }, { status: 500 });
  }
}
