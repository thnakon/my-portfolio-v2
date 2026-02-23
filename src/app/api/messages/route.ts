import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Failed to fetch messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, color, rotation, x, y, rating, emoji } = await req.json()

    if (!content || content.length > 500) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        color: color || "black",
        rotation: rotation || 0,
        x: x || 0,
        y: y || 0,
        rating: rating ? parseInt(rating) : null,
        emoji: emoji || null,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Failed to post message:", error)
    return NextResponse.json({ error: "Failed to post message" }, { status: 500 })
  }
}
