.PHONY: build
build: build-lib build-types

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: build-lib
build-lib: setup
	bun run script/build.ts

.PHONY: build
build-types: setup
	bun x tsc --project tsconfig.json

.PHONY: dev
dev: setup
	bun script/dev.js

.PHONY: lint
lint: setup
	bun x @biomejs/biome check

.PHONY: format
format: setup
	bun x @biomejs/biome check --write

.PHONY: clean
clean:
	rm -rf ./dist

.PHONY: reset
reset: clean
	rm -rf ./node_modules

.PHONY: prepublishOnly
prepublishOnly: clean build
