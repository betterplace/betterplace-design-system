export type Printable = object | string
export type JSONPrettyPrintProps<T extends Printable> = {
  json: T
}
