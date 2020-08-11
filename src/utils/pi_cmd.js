export function build_high_cmd(pin) {
    return`GPIO.output(${pin},GPIO.HIGH)\n`
}
export function build_low_cmd(pin) {
    return`GPIO.output(${pin},GPIO.LOW)\n`
}