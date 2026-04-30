import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const { name, type, icon } = body;

  const { data, error } = await supabase
    .schema("financ")
    .from("categories")
    .update({ name, type, icon })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = awaitparams;

  const { error } = await supabase
    .schema("financ")
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}