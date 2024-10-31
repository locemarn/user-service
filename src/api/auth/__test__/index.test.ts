import * as utilsFuncs from '..'

const password = '123456'

describe('Auth utils methods', () => {
  describe('Function: generateToken', () => {
    test('should encrypt hash', async () => {
      const sut = await utilsFuncs.encryptHash(password)
      expect(sut).not.toBeNull()
    })
  })

  describe('Function: generateToken', () => {
    test('should compare passwords', async () => {
      const hashed = await utilsFuncs.encryptHash(password)
      const sut = await utilsFuncs.comparePasswords(password, hashed)
      expect(sut).toBeTruthy()
    })

    test('should return an error when compare passwords', async () => {
      const hashed = await utilsFuncs.encryptHash(password)
      const sut = await utilsFuncs.comparePasswords('123499', hashed)
      expect(sut).toBeFalsy()
    })
  })

  describe('Function: generateToken', () => {
    test('should generate a token', async () => {
      // jest.spyOn(utilsFuncs, 'generateToken').mockImplementationOnce(() =>
      //   Promise.resolve({
      //     token: '123madhash456',
      //     message: 'User Logged in Successfully',
      //   })
      // )
      const sut = await utilsFuncs.generateToken('user@email.com')
      // console.log('generateTokenMocked', sut)
      expect(sut).toHaveProperty('token')
      expect(sut).toHaveProperty('message')
    })
  })
})
