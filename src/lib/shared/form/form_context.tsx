import { createContext, useContext } from 'react'
import { UseFormReturn, Values } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<UseFormReturn<any> | null>(null)

export function FormProvider<T extends Values>(props: UseFormReturn<T> & { children?: React.ReactNode }) {
  const { children, ...data } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <FormContext.Provider value={data as unknown as UseFormReturn<any>}>{props.children}</FormContext.Provider>
}

export function useFormContext<T extends Values>(): UseFormReturn<T> {
  return useContext(FormContext) as unknown as UseFormReturn<T>
}
