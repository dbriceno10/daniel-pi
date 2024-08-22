const isUUID = (id) => {
  const regex = new RegExp(/([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/);
  return regex.test(id);
};

module.exports = { isUUID };
