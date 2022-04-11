import { SignupController } from './signup'
import { InvalidParamError, MissingParamError } from './../errors'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
  sut: SignupController,
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email:string) : boolean {
      return !!email
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignupController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
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
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any',
        password: 'any',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'email@mail.com',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'email@mail.com',
        password: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })

  test('should return 400 if email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any',
        email: 'invalid@mail.com',
        password: 'any',
        passwordConfirmation: 'any',
      },
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('should call emailValidator with a correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any',
        email: 'any@mail.com',
        password: 'any',
        passwordConfirmation: 'any',
      },
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any@mail.com')
  })
})
