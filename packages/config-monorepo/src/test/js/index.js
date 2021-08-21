import config from '../../main/js'

describe('@dougkulak/semrel-config-monorepo', () => {
  it('is not empty', () => {
    expect(config).not.toBeUndefined()
    expect(config).toEqual(require('../../../target/es5'))
  })
})
