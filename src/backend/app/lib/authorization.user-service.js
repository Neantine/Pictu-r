class AuthorizationUserService {

  constructor() {
    this.authorizeUser = [];
  }

  authorizeUser(userInfoSession) {

    return new Promise((resolve, reject) => {

    resolve(userInfoSession);

    })
  }

  /**
   * Search if this userInfoSession.userId is already Authorize
   * @param userInfoSession
   * @private
   */
  _isAlreadyAuthorize(userInfoSession){

  }

  removeAuthorizationForThisUser(userInfoSession){

  }


  addAuthorizationForThisUser(userInfoSession){
    this.authorizeUser.push(userInfoSession)
  }

};

module.exports = AuthorizationUserService;
