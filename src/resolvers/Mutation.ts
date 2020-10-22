import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { APP_SECRET, getUserId, validateEmail, validateName, validatePassword } from '../utils'
import { wrongEmailError, wrongPasswordError } from '../errors'

interface ISigninInput {
  email: string
  password: string
}

interface ISignupInput extends ISigninInput {
  name: string
}

export const signup = async (parent, args: ISignupInput, context, info) => {
  validateName(args.name)
  validateEmail(args.email)
  validatePassword(args.email)
  const password = await hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

export const signin = async (parent, args: ISigninInput, context, info) => {
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  if (!user) {
    throw new wrongEmailError()
  }
  const valid = await compare(args.password, user.password)
  if (!valid) {
    throw new wrongPasswordError()
  }
  const token = sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}
