import { Factory } from 'rosie'
import { UserResponse } from '../../models/user.model'
import { faker } from '@faker-js/faker'

export const UserFactory = new Factory<UserResponse>()
  .attr('id', faker.number.int({ min: 1, max: 1000 }))
  .attr('username', faker.internet.userName())
  .attr('email', faker.internet.email())
  .attr('createdAt', faker.date.recent())
  .attr('updatedAt', faker.date.recent())
// .attr('role', 'tester')

// const UserLoginFactoryUserProperty = new Factory()
//   .

export const UserLoginFactory = new Factory()
  .sequence('user')
  .attr('id', faker.number.int({ min: 1, max: 1000 }))
  .attr('username', faker.internet.userName())
  .attr('email', faker.internet.email())
  .attr('createdAt', faker.date.recent())
  .attr('updatedAt', faker.date.recent())
  .sequence('token')
  .attr('token', faker.seed())
