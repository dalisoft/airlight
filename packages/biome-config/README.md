# biome-config-airlight

Biome configuration to use with combine of [eslint-config-airlight-node](../eslint-config-node)

## Installation

```bash
npm install biome-config-airlight --save-dev
# or
yarn add biome-config-airlight -D
```

## Usage

`biome.json`

```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
  "extends": ["./node_modules/biome-config-airlight/biome.json"]
}
```

## Integration

### dprint

Follow guide from [here](https://dprint.dev/plugins/biome), copy content of `dprint-extends.json` and paste (not replace entirely) on your `dprint.json` config

## License

MIT
