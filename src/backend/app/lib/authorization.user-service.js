class AuthorizationUserService {

  constructor() {
    this.authorizeUser = [];
  }

  isAuthorizeUser(userInfoSession) {
    return this.authorizedUsers.find(user => {

      return (user.userLogin === userInfoAccount.userLogin)
        && (user.userToken === userInfoAccount.userToken)

    });
  }


  /**
   * Search if this userInfoSession.userId is already Authorize
   * @param userInfoSession
   * @private
   */
  _isAlreadyAuthorize(userInfoSession) {
    return this.authorizedUsers.find(user => {

      return (user.userLogin === userInfoAccount.userLogin)
        && (user.userToken === userInfoAccount.userToken)

    });
  }

  // TODO method that remove right of an user after a certain amount of time
  removeAuthorizationForThisUser(userInfoSession) {

  }


  addAuthorizationForThisUser(userInfoSession) {
    if (this._isAlreadyAuthorize(userInfoSession)) {
      return null;
    }
    this.authorizeUser.push(userInfoSession);
    return userInfoSession;
  }

}

module.exports = AuthorizationUserService;
