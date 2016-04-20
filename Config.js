module.exports = {
  oracle: {
    user: 'desgemini',
    password: 'z7575380',
    connectString: '10.211.55.12:1521/xe',
    poolMax: 10,
    poolMin: 2,
    poolIncrement: 4,
    poolTimeout: 4
  },
  redis: {
    socket: 6379
  },
  jwt_secret: "Hear Me Roar",
};
