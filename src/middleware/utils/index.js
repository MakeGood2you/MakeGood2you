"use strict"


export function getUserUid() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.uid
}