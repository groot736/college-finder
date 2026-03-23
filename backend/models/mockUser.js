const users = new Map();

// Mock Mongoose-like interface
const MockUser = {
  findOne: async (query) => {
    for (let [id, user] of users) {
      if (user.email === query.email) return user;
    }
    return null;
  },
  create: async (data) => {
    const id = Date.now().toString();
    const user = { _id: id, ...data, role: 'student' };
    users.set(id, user);
    return user;
  },
  findById: async (id) => {
    const user = users.get(id) || users.get(id.toString()) || null;
    if (user) {
      user.select = function(fields) {
        return this;
      };
    }
    return user;
  },
  findByIdAndUpdate: async (id, update) => {
    let userId = id;
    if (typeof id === 'string' && !users.has(id)) {
      // Try string match
      for (let [key, u] of users) {
        if (u._id === id || u._id.toString() === id) {
          userId = key;
          break;
        }
      }
    }
    const user = users.get(userId);
    if (user) {
      Object.assign(user, update);
      users.set(userId, user);
      return user;
    }
    return null;
  }
};

MockUser.findByIdAndUpdate.mockCompatible = true;
module.exports = MockUser;
