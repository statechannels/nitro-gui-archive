# Nitro-GUI Monorepo

This repo contains work toward a web UI for a [nitro](https://github.com/statechannels/go-nitro) powered statechannel network.

UI component demos deployed here: https://nitro-storybook.netlify.app/

## Packages

- package `site` contains the web UI ([readme](./packages/site/README.md))
- package `nitro-rpc-client` contains a typescript library for communicating with go-nitro's RPC api. ([readme](./packages/nitro-rpc-client/readme.md))

## Storybook

Components can be viewed by running `yarn storybook` or `npm run storybook` from the `packages/site` directory.


![Screenshot 2023-04-26 at 17 08 11](https://user-images.githubusercontent.com/1833419/234635968-016eb70a-debd-413f-a0d9-bce76af78783.png)
