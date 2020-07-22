const generateOTP = () => {
    let otp = ''

    for(let i = 0; i < 6; i++) {
        const number = Math.floor(Math.random() * 10)
        otp += number
    }

    return otp
}

module.exports = {
    generateOTP: generateOTP
}