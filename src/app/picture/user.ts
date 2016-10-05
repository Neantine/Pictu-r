/**
 * Created by Lilith on 05/10/2016.
 */
export class User {
  userId: string;
  userPwd: string;

  constructor(
    {
      userId = '',
      userPwd = ''
    }:
      { userId ? : string, userPwd ? : string })
  {
    this.userId = userId;
    this.userPwd = userPwd;
  }

}
