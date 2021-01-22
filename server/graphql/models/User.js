const BaseModel = require('./BaseModel');

class User extends BaseModel {
  async signIn(data, ctx) {
    try {
      const user = await ctx.authenticate(data);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async signUp(data) {
    if (data.password !== data.passwordConfirmation) {
      throw new Error('Password must be the same as password confirmation.');
    }

    try {
      return await this.Model.create(data);
    } catch (e) {
      if (e.code && e.code === 11000) {
        throw new Error('Email already exists. Please choose another.');
      }

      throw e;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (err) {
      return false;
    }
  }

  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }

    return null;
  }
}

module.exports = User;
