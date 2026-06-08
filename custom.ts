//% weight=100 color=#00aaff icon="\uf2db"
//% block="I2C Scanner"
namespace i2cScanner {

    /**
     * Skanuje magistralę I2C i zwraca znalezione adresy
     */
    //% block="skanuj I2C i zwróć listę adresów"
    export function scan(): number[] {
        let found: number[] = []
        for (let addr = 0x08; addr <= 0x77; addr++) {
            // próbujemy odczytać 1 bajt
            // jeśli nie ma błędu – urządzenie istnieje
            pins.i2cWriteNumber(addr, 0, NumberFormat.UInt8BE, true)
            let ok = true
            try {
                pins.i2cReadNumber(addr, NumberFormat.UInt8BE, false)
            } catch (e) {
                ok = false
            }
            if (ok) {
                found.push(addr)
            }
        }
        return found
    }

    /**
     * Skanuje I2C i wypisuje adresy po serialu
     */
    //% block="skanuj I2C i wypisz po serialu"
    export function scanAndPrint() {
        serial.writeLine("I2C scan:")
        let list = scan()
        if (list.length == 0) {
            serial.writeLine("Brak urządzeń")
        } else {
            for (let a of list) {
                serial.writeLine("0x" + a.toString(16))
            }
        }
    }
}
