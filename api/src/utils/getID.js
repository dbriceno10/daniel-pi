async function getID(data) {
  let types = [];
  for (let i = 0; i < data.length; i++) {
    types.push(
      await Type.findOne({
        where: { name: data[i] },
        attributes: ['id'],
      })
    );
  }
  return types;
}

module.exports = { getID };
