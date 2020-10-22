import { createError } from 'apollo-errors'

export const authError = createError('authError', {
  message: 'Not authenticated',
})

export const badNameError = createError('badNameError', {
  message: 'Bad name',
})

export const badEmailError = createError('badEmailError', {
  message: 'Bad email',
})

export const badPasswordError = createError('badPasswordError', {
  message: 'Bad password',
})

export const wrongEmailError = createError('wrongEmailError', {
  message: 'Wrong email',
})

export const wrongPasswordError = createError('wrongPasswordError', {
  message: 'Wrong password',
})
