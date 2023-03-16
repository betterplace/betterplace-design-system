export type Printable = object | string
export type JSONPrettyPrintProps<T extends Printable> = {
  /**
   * string or a stringifiable object
   */
  json: T
}
