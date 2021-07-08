"use strict"
import {QSpinnerGears} from 'quasar'

export const positive = {
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
}
export const negative = {
    type: 'negative',
    message: `This is a "negative" type notification.`
}
export const loading = (bol) => {
    return {
        spinner: QSpinnerGears,
        message: 'Working...',
        timeout: bol
    }
}

//