module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    overlay: false,
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
};
