import config from '../../main/js'

describe('@dougkulak/semrel-config', () => {
  it('is not empty', () => {
    expect(config).not.toBeUndefined()
    expect(config).toEqual(require('../../../target/es5'))
  })
})
