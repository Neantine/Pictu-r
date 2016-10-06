const app = require('../../app');
const UserService = require('../../app/lib/user-service');
const userService = new UserService();


beforeEach(function(done) {
  done();
});

afterEach(() => {
});

describe('UserService', () => {

  it('function generateToken should generate a token unique', function (done) {
    let userId = '1';
    let userInfo = userService.generateToken(userId)

    expect(userInfo.userId).toEqual('1');
    expect(userInfo.userToken).toBeNonEmptyString;

  });

});
