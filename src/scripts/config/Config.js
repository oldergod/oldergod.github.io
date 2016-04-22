'use strict';

const Config = {
  name: 'inthefreshhood',
  version: 1,
  stores: {
    'AppModel': {
      deleteOnUpgrade: true,
      properties: {
        autoIncrement: true
      }
    }
  }
};

export default Config;
