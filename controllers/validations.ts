import prisma from 'utils/prisma'

export const validateEmail = async (email: string): Promise<boolean> => {
  const draftUser = await prisma.pinlinkDraft.findFirst({
    where: { email },
  })
  const prodUser = await prisma.pinlinkProd.findFirst({
    where: { email },
  })

  if (draftUser || prodUser) return true

  return false
}

export const validateUsername = async (username: string, userId?: string): Promise<boolean> => {
  const draftUser = await prisma.pinlinkDraft.findFirst({
    where: { username },
    select: {
      username: true,
      userId: true,
    },
  })

  const prodUser = await prisma.pinlinkProd.findFirst({
    where: { username },
    select: {
      username: true,
      userId: true,
    },
  })

  if (draftUser && draftUser.userId === userId) return true
  if (prodUser && prodUser.userId === userId) return true

  if (draftUser || prodUser) return false

  return true
}
