// model User {
//   id        Int       @id @default(autoincrement())
//   username  String    @unique
//   email     String    @unique
//   password  String
//   role      USERROLES @default(reader)
//   created_at DateTime  @default(now())
//   updated_at DateTime  @updated_at

//   @@map("users")
// }

// enum USERROLES {
//   superuser
//   admin
//   reader
//   editor
//   tester
// }
