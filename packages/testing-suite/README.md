# @dougkulak/semrel-testing-suite
Semrel/msr testing helpers

## Install
```shell script
yarn add @dougkulak/semrel-testing-suite -D
```

## Usage
```ts
import { resolve } from 'path'
import resolveFrom, { silent as resolveFromSilent } from 'resolve-from'
import semanticRelease from 'semantic-release'
import { 
  cleanPath,
  copyDirectory,
  gitCommitAll,
  gitInit,
  gitInitOrigin,
  gitPush
} from '@dougkulak/semrel-testing-suite'
import { createPlugin } from '@dougkulak/semrel-plugin-creator'

const fixtures = resolve(__dirname, '../fixtures')

describe('integration', () => {
  const handler: any = jest.fn(({step}) => {
    if (step === 'analyzeCommits') {
      return 'patch'
    }
  })
  const pluginName = 'some-plugin'
  const plugin = createPlugin({handler, name: pluginName})
  const cwd = gitInit()

  copyDirectory(`${fixtures}/yarnWorkspaces/`, cwd)
  gitCommitAll(cwd, 'feat: Initial release')
  gitInitOrigin(cwd)
  gitPush(cwd)

  beforeAll(() => {
    jest.mock(pluginName, () => plugin, {virtual: true})
    jest
      .spyOn(resolveFrom, 'silent')
      .mockImplementation((fromDir: string, moduleId: string) => {
        if (moduleId === pluginName) {
          return pluginName
        }

        return resolveFromSilent(fromDir, moduleId) as string
      })
  })

  afterAll(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  afterEach(jest.clearAllMocks)

  const env = {
    ...process.env,
    TRAVIS_PULL_REQUEST_BRANCH: 'main',
    TRAVIS_BRANCH: 'main'
  }

  it('plugin is compatible with semrel', async () => {
    await semanticRelease(
      {
        branches: ['main'],
        dryRun: true,
        plugins: [pluginName],
      },
      {
        cwd: cleanPath(cwd),
        env,
      },
    )

    expect(handler).toBeCalledTimes(4)
  }, 15000)
})
```
