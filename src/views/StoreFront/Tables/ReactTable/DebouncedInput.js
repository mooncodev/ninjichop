// A debounced input react component
import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...rest
}) {
  const [value, setValue] = useState(String(initialValue))

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input {...rest} size='sm' value={value} onChange={e => setValue(e.target.value)} />
  )
}
