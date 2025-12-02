
/**
 * Time utility class for handling date and time formatting.
 * This class provides methods to format dates in various ways, including human-readable formats,
 * ISO strings, and formats suitable for logging or saving to a database.
 */
export class Time {
  private static formatDateToParts(
    date: Date,
    locale?: string | null,
    timeZone?: string | null
  ): { [key: string]: string } {

    const systemLocale = locale || Time.getSystemLocale();
    const systemTimeZone = timeZone || Time.getSystemTimezone();

    const formatter = new Intl.DateTimeFormat(systemLocale, {
      timeZone: systemTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const formattedParts = formatter.formatToParts(date);
    const dateParts: { [key: string]: string } = {};

    formattedParts.forEach(({ type, value }) => {
      dateParts[type] = value;
    });

    return dateParts;
  }

  private static formatDateString(dateParts: { [key: string]: string }): string {
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`;
  }

  private static formateDateToSaveString(dateParts: { [key: string]: string }): string {
    return `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}-${dateParts.minute}-${dateParts.second}Z`;
  }

  private static logFormat(dateParts: { [key: string]: string }): string {
    return `${dateParts.day}/${dateParts.month}/${dateParts.year}:${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }

  /**
   * Gets the system's default timezone
   */
  public static getSystemTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /**
   * Gets the system's default locale
   */
  public static getSystemLocale(): string {
    return Intl.DateTimeFormat().resolvedOptions().locale;
  }

  /**
   * Gets both system locale and timezone
   */
  public static getSystemLocaleAndTimezone(): { locale: string; timeZone: string } {
    const resolved = Intl.DateTimeFormat().resolvedOptions();
    return {
      locale: resolved.locale,
      timeZone: resolved.timeZone
    };
  }

  /**
   * Formats a date to a human-readable string.
   * @param date The date to format.
   * @param timeZone The time zone to use for formatting.
   * @returns The formatted date string.
   */
  public static formatDateToHumanReadable(data: {
    date?: Date | undefined;
    locale?: string | null | undefined;
    timeZone?: string | null | undefined;
  }): string {
    const { date, locale, timeZone } = data;
    const now = new Date();
    const dateParts = Time.formatDateToParts(date || now, locale, timeZone);
    return `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
  }

  /**
   * Returns the current time formatted as a string suitable for saving.
   * This format is `YYYY-MM-DDTHH-MM-SSZ`, which is useful for file naming or database storage.
   */
  public static getCurrentTimeToSaveString(
    locale?: string | null,
    timeZone?: string | null
  ): string {
    const now = new Date();
    const dateParts = Time.formatDateToParts(now, locale, timeZone);
    return Time.formateDateToSaveString(dateParts);
  }

  /**
   * Returns the current time as a Date object.
   * This method formats the current time to a string and then converts it back to a Date object.
   */
  public static getCurrentTime(
    locale?: string | null,
    timeZone?: string | null
  ): Date {
    const now = new Date();
    const dateParts = Time.formatDateToParts(now, locale, timeZone);
    const formattedDateString = Time.formatDateString(dateParts);
    return new Date(formattedDateString);
  }

  /**
   * Returns the current time formatted as a string.
   * This format is `YYYY-MM-DDTHH:MM:SSZ`, which is useful for logging or displaying the current time.
   */
  public static getCurrentTimeToString(
    locale?: string | null,
    timeZone?: string | null
  ): string {
    const now = new Date();
    const dateParts = Time.formatDateToParts(now, locale, timeZone);
    return Time.formatDateString(dateParts);
  }

  /**
   * Returns the current time in a human-readable format.
   * This format is `DD/MM/YYYY HH:MM:SS`, which is suitable for display to users.
   */
  public static getCurrentTimeToHumanReadable(
    locale?: string | null,
    timeZone?: string | null
  ): string {
    const now = new Date();
    return Time.formatDateToHumanReadable({ date: now, locale, timeZone });
  }

  /**
   * Returns the current time formatted for logging.
   * This format is `DD/MM/YYYY:HH:MM:SS`, which is useful for log entries.
   */
  public static getTimeToLogFormat(
    locale?: string | null,
    timeZone?: string | null
  ): string {
    const now = new Date();
    const dateParts = Time.formatDateToParts(now, locale, timeZone);
    return Time.logFormat(dateParts);
  }

}
