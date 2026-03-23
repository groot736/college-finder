const requests = new Map();

const MockRequest = {
  create: async (data) => {
    const id = Date.now().toString();
    const request = { _id: id, ...data, status: 'pending' };
    requests.set(id, request);
    return request;
  },
  find: async (filter) => Array.from(requests.values()).filter(r => {
    if (filter.user) return r.user === filter.user;
    return true;
  }),
  findByIdAndUpdate: async (id, update) => {
    const req = requests.get(id);
    if (req) {
      Object.assign(req, update);
      requests.set(id, req);
      return req;
    }
    return null;
  }
};

module.exports = MockRequest;
