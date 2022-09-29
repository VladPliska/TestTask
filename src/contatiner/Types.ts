const TYPES = {
  //Usecases
  Create: Symbol('Create'),
  UpdateUser: Symbol('UpdateUser'),
  DeleteUser: Symbol('DeleteUser'),
  GetUsers: Symbol('GetUsers'),
  GetUserById: Symbol('GetUserById'),
  SignIn: Symbol('SignIn'),
  RefreshToken: Symbol('RefreshToken'),
  //DB
  DB: Symbol('DB'),
  UserModel: Symbol('UserModel'),
  UserRepository: Symbol('UserRepository'),
  
  //Domain
  UserBuilder: Symbol('UserBuilder'),

  //Service, utils
  PasswordService: Symbol('PasswordService'),
  IdService: Symbol('IdService'),
  TokenService: Symbol('TokenService'),
}

export default TYPES;