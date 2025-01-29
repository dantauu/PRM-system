import moment from 'moment'

const defaultViewFormat = 'DD.MM.YYYY'
const defaultApiFormat = 'YYYY-MM-DDTHH:mm:ss.SSS'

export const myMoment = Object.assign(moment, { defaultViewFormat, defaultApiFormat })
