#![no_std]
#![no_main]
use we_cdk::*;

#[action]
fn _constructor(init: Integer) {
    set_storage!(integer :: "counter" => init);
}

#[action]
fn increment(by: Integer) {
    let value: Integer = get_storage!(integer :: "counter");
    set_storage!(integer :: "counter" => value + by);
}

#[action]
fn set(to: Integer) {
    set_storage!(integer :: "counter" => to);
}
