# @dougkulak/semrel-common
Common semrel utils: config reader, git-client, etc.

## Install
```shell script
yarn add @dougkulak/semrel-common
```

## Usage
```typescript
import { gitTags } from '@dougkulak/semrel-common'

const tags = await gitTags({ cwd: '/foo/bar/baz', branch: 'main' }) 
```
