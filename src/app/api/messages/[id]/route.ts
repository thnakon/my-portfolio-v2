import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

const ADMIN_EMAIL = "thnakon.d@gmail.com"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const message = await prisma.message.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    // Allow if admin OR owner
    const isAdmin = session.user.email === ADMIN_EMAIL
    const isOwner = message.userId === (session.user as any).id

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.message.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("Failed to delete message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { content, color, rating, emoji } = await req.json()

    const message = await prisma.message.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    const isOwner = message.userId === (session.user as any).id
    if (!isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: {
        content,
        color,
        rating: rating !== undefined ? rating : undefined,
        emoji: emoji !== undefined ? emoji : undefined,
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

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error("Failed to update message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
