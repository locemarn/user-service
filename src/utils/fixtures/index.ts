import { Factory } from 'rosie'
import { UserResponse } from '../../@core/domain/user.entity'
import { faker } from '@faker-js/faker'

export const UserFactory = new Factory<UserResponse>()
  .attr('id', faker.number.int({ min: 1, max: 1000 }))
  .attr('username', faker.internet.userName())
  .attr('email', faker.internet.email())
  .attr('created_at', faker.date.recent())
  .attr('updated_at', faker.date.recent())
// .attr('role', 'tester')

// const UserLoginFactoryUserProperty = new Factory()
//   .

export const UserLoginFactory = new Factory()
  .sequence('user')
  .attr('id', faker.number.int({ min: 1, max: 1000 }))
  .attr('username', faker.internet.userName())
  .attr('email', faker.internet.email())
  .attr('created_at', faker.date.recent())
  .attr('updated_at', faker.date.recent())
  .sequence('token')
  .attr('token', faker.seed())
