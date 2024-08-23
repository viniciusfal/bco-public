interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({ children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className="border  text-zinc-900 text-sm rounded-lg focus:ring-[#22331d]  focus:border-[#22331d] block w-full p-2.5 bg-[#f5f5f5]  dark:placeholder-gray-400 "
    >
      {children}
    </select>
  )
}
