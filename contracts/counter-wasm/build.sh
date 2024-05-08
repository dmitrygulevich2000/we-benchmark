#!/bin/bash

# may need run before building
# cargo install --git https://github.com/waves-enterprise/we-cdk.git --force
# rustup toolchain install nightly
# rustup component add rust-src --toolchain nightly-x86_64-unknown-linux-gnu

echo "BUILDING..."
cargo we build || exit 1

wasm_path=./target/wasm32-unknown-unknown/release/counter_wasm.wasm
echo "BYTECODE BASE64:"
base64 -w 0 $wasm_path
echo

echo "BYTECODE HASH:"
shasum -a 256 $wasm_path
