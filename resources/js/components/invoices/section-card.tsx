import React from 'react'

export default function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode; }) {
  return (
  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60">
            <div className="flex items-center gap-3">
                <span className="text-primary-600 dark:text-primary-400">{icon}</span>
                <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">{title}</h2>
            </div>
        </div>
        <div className="p-6">{children}</div>
    </div>
  )
}
