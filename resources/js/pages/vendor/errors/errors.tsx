import VendorLayout from '@/layouts/vendor/vendor-layout'
import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'

export default function ErrorPage({ error }: { error: string }) {
  const { t, i18n } = useTranslation()

  const isArabic = i18n.language === 'ar'
  return (
    <VendorLayout>
      <div
        className={`flex justify-center items-center mt-16 px-4 ${isArabic ? 'rtl' : 'ltr'
          }`}
      >
        <div className="text-center max-w-md w-full bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 border">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">
            {t('admin.error.title')}
          </h1>

          {/* Message */}
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {error || t('error.defaultMessage')}
          </p>

          {/* Action */}
          <Button
            onClick={() => router.visit('/dashboard')}
            className="w-full"
          >
            {t('admin.error.back')}
          </Button>
        </div>
      </div>
    </VendorLayout>
  )
}
