import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const { user_id, category_id, type, amount, note, transaction_date } = body;

  const { data, error } = await supabase
    .schema("financ")
    .from("transactions")
    .update({
      user_id,
      category_id,
      type,
      amount,
      note,
      transaction_date,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  const { error } = await supabase
    .schema("financ")
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
}