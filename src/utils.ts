import { verify } from 'jsonwebtoken'
export const APP_SECRET = 'GraphQL-is-aw3some'
import { authError, badNameError, badEmailError, badPasswordError } from './errors'

export function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId }: any = verify(token, APP_SECRET)
    return userId
  }
  throw new authError()
}

export function validateName(name: string) {
  const letters = /^[A-Za-z]+$/
  if (!name.match(letters)) {
    throw new badNameError()
  }
}

export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const result = re.test(String(email).toLowerCase())
  if (!result) {
    throw new badEmailError()
  }
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    throw new badPasswordError()
  }
}
