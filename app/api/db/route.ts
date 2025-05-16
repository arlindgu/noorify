import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('your_table').select('*');
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const body = await req.json();
    const { data, error } = await supabase.from('your_table').insert([body]);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}