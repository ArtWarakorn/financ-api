import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .schema("financ")
    .from("transactions")
    .select("*")
    .order("transaction_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();

  const { user_id, category_id, type, amount, note, transaction_date } = body;

  const { data, error } = await supabase
    .schema("financ")
    .from("transactions")
    .insert([
      {
        user_id,
        category_id,
        type,
        amount,
        note,
        transaction_date,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}