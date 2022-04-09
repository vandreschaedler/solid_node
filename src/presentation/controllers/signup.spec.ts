import { SignupController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        // name: 'any',
        email: 'email@mail.com',
        password: 'any',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: 'any',
        // email: 'email@mail.com',
        password: 'any',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'email@mail.com',
        // password: 'any',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no passwordConfirmation is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'email@mail.com',
        password: 'any',
        // passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })

  test('should return 200 if all data is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'email@mail.com',
        password: 'any',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
