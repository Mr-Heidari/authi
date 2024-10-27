import React from 'react'

interface InformationFieldProps{
    name:string | undefined | null
    label:string 
}

export const InfromationField = ({name,label}:InformationFieldProps) => {
  return (
    <div className="flex flex-row w-full justify-between p-2 border-b-2 border-gray-300">
    <p className="text-blue-600 text-lg font-semibold">{label}</p>
    <p className="text-gray-500">{name}</p>
  </div>
  )
}
