const UserModel = {
  get(id = null) {
    if (id) {
      return `Get user ${id}`;
    }
    return 'Get All user details';
  },
  create(data = null) {
    return `Record Inserted For ${JSON.stringify(data)}`;
  },
  delete(id = null) {

  },
  update(id = null) {

  }
};

export default UserModel;
