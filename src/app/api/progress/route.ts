import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET: Fetch user's progress for today
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().split('T')[0];

  try {
    const progress = await prisma.userProgress.findMany({
      where: {
        userId: session.user.id,
        date: today,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST: Update user progress
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { activityId, completed } = await request.json();
  const today = new Date().toISOString().split('T')[0];

  try {
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_activityId_date: {
          userId: session.user.id,
          activityId,
          date: today,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        activityId,
        completed,
        completedAt: completed ? new Date() : null,
        date: today,
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
