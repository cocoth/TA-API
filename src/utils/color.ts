/**
 * Utility functions for terminal colors.
 * These functions provide ANSI escape codes for styling terminal output.
 * @module terminalColors
 * This module exports an object containing ANSI escape codes for various text styles and colors.
 * You can use these codes to format terminal output in Node.js applications.
 * @example
 * import { terminalColors as TC } from 'halo';
 * console.log(`${TC.R}This text is red${TC.reset}`);
 * @see {@link https://en.wikipedia.org/wiki/ANSI_escape_code} for more information
 */
export const terminalColors = {
    /**
     * reset - Resets all styles and colors to default.
     * This code is used to reset the terminal text formatting to its default state.
     */
    _reset: '\x1b[0m',
    /**
     * bright - Makes the text bright.
     * This code is used to make the terminal text bright or bold.
     */
    _bright: '\x1b[1m',
    /**
     * dim - Makes the text dim.
     * This code is used to make the terminal text dim or less bright.
     */
    _dim: '\x1b[2m',
    /**
     * italic - Makes the text italic.
     * This code is used to make the terminal text italicized.
     */
    _italic: '\x1b[3m',
    /**
     * underline - Underlines the text.
     * This code is used to underline the terminal text.
     */
    _underline: '\x1b[4m',
    /**
     * blink - Makes the text blink.
     * This code is used to make the terminal text blink.
     */
    _blink: '\x1b[5m',
    /**
     * reverse - Reverses the foreground and background colors.
     * This code is used to swap the foreground and background colors of the terminal text.
     */
    _reverse: '\x1b[7m',
    /**
     * hidden - Hides the text.
     * This code is used to hide the terminal text, making it invisible.
     */
    _hidden: '\x1b[8m',
    /**
     * strikethrough - Strikes through the text.
     * This code is used to add a strikethrough effect to the terminal text.
     */
    _strikethrough: '\x1b[9m',

    // Foreground colors
    /**
     * BLACK - Sets the text color to black.
     * This code is used to change the terminal text color to black.
     */
    BLACK: '\x1b[30m',
    /**
     * RED - Sets the text color to red.
     * This code is used to change the terminal text color to red.
     */
    RED: '\x1b[31m',
    /**
     * GREEN - Sets the text color to green.
     * This code is used to change the terminal text color to green.
     */
    GREEN: '\x1b[32m',
    /**
     * YELLOW - Sets the text color to yellow.
     * This code is used to change the terminal text color to yellow.
     */
    YELLOW: '\x1b[33m',
    /**
     * BLUE - Sets the text color to blue.
     * This code is used to change the terminal text color to blue.
     */
    BLUE: '\x1b[34m',
    /**
     * MAGENTA - Sets the text color to magenta.
     * This code is used to change the terminal text color to magenta.
     */
    MAGENTA: '\x1b[35m',
    /**
     * CYAN - Sets the text color to cyan.
     * This code is used to change the terminal text color to cyan.
     */
    CYAN: '\x1b[36m',
    /**
     * WHITE - Sets the text color to white.
     * This code is used to change the terminal text color to white.
     */
    WHITE: '\x1b[37m',

    // Bright foreground colors
    /**
     * BBLACK - Sets the text color to bright black (gray).
     * This code is used to change the terminal text color to bright black.
     */
    BBLACK: '\x1b[40m',
    /**
     * BRED - Sets the text color to bright red.
     * This code is used to change the terminal text color to bright red.
     */
    BRED: '\x1b[41m',
    /**
     * BGREEN - Sets the text color to bright green.
     * This code is used to change the terminal text color to bright green.
     */
    BGREEN: '\x1b[42m',
    /**
     * BYELLOW - Sets the text color to bright yellow.
     * This code is used to change the terminal text color to bright yellow.
     */
    BYELLOW: '\x1b[43m',
    /**
     * BBLUE - Sets the text color to bright blue.
     * This code is used to change the terminal text color to bright blue.
     */
    BBLUE: '\x1b[44m',
    /**
     * BMAGENTA - Sets the text color to bright magenta.
     * This code is used to change the terminal text color to bright magenta.
     */
    BMAGENTA: '\x1b[45m',
    /**
     * BCYAN - Sets the text color to bright cyan.
     * This code is used to change the terminal text color to bright cyan.
     */
    BCYAN: '\x1b[46m',
    /**
     * BWHITE - Sets the text color to bright white.
     * This code is used to change the terminal text color to bright white.
     */
    BWHITE: '\x1b[47m'
};