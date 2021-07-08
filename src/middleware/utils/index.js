"use strict"


export function getUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
}