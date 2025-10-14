// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('Post')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const { author, body } = await req.json()

  const { data, error } = await supabase.from('Post').insert([
    {
      author: author || 'Anonymous',
      body,
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}
