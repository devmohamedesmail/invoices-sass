import React from 'react'
import { Label } from '../ui/label'
import InputError from '../input-error'

export default function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string; }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
        <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</Label>
        {children}
        {error && <InputError message={error} />}
    </div>
  )
}
