export default Object.freeze({
  // POST /api/user/create
  post: {
    name: {
      exists: true,
      isLength: {
        errorMessage: 'Name should be at least 3 characters.',
        options: { min: 3 },
      },
    },
    email: {
      exists: true,
    },
    phoneNumber: {
      exists: true,
      isLength: {
        errorMessage: 'Number exceeding 10 digits',
        options: { max: 10 },
      },
    },
  },
  // DELETE /api/user/delete
  delete: {
    id: {
      in: ['params'],
      errorMessage: 'Id is required',
      exists: true,
    },
  },
  // GET /api/user/get
  get: {
    skip: {
      in: ['query'], // always in query
      errorMessage: 'Skip is invalid',
      isNumber: true,
      // default:0,
    },

    limit: {
      in: ['query'], // always in query
      errorMessage: 'Limit is invalid',
      // default:3,
      isNumber: true,
    },
  },

  // UPDATE /api/user/update
  Update: {
    originalId: {
      in: ['body'],
      errorMessage: 'Id is required',
      exists: true,
    },
  },

  login: {
    email: {
      exists: true,
    },
  },
});
