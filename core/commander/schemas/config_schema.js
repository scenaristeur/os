export const config_schema = {
  // foo: {
  //   type: 'number',
  //   maximum: 100,
  //   minimum: 1,
  //   default: 50
  // },
  user: {
    type: 'string',
    default: process.env.USER
    //  format: 'url'
  },
  home: {
    type: 'string',
    default: process.env.HOME
    //  format: 'url'
  },
  editor: {
    type: 'string',
    default: process.env.EDITOR
    //  format: 'url'
  },
  // boo:{
  //   bi:{
  //     bap: {
  //       type: 'string',
  //       format: 'url',
  //       default: "http://scenaristeur.github.io/os"
  //     }
  //   }
  // }
};
