import AdminLayout from '@/layouts/admin/admin-layout'
import React, { FormEvent, useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ImagePicker from '@/components/ui/image-picker'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import InputError from '@/components/input-error'

export default function SettingPage({ settings }: { settings: any }) {
  const { t } = useTranslation()
  const { props } = usePage<any>()





  const settingsSchema = z.object({
    app_name_ar: z.string().min(1, 'مطلوب'),
    app_name_en: z.string().min(1, 'Required'),
    copy_right_ar: z.string().optional(),
    copy_right_en: z.string().optional(),
    description_ar: z.string().optional(),
    description_en: z.string().optional(),
    about_ar: z.string().optional(),
    about_en: z.string().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    app_logo: z.any().optional(),
    app_logo_black: z.any().optional(),
    app_favicon: z.any().optional(),
    app_favicon_white: z.any().optional(),
  })


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      app_name_ar: settings?.app_name_ar || '',
      app_name_en: settings?.app_name_en || '',
      copy_right_ar: settings?.copy_right_ar || '',
      copy_right_en: settings?.copy_right_en || '',
      description_ar: settings?.description_ar || '',
      description_en: settings?.description_en || '',
      about_ar: settings?.about_ar || '',
      about_en: settings?.about_en || '',
      phone: settings?.phone || '',
      whatsapp: settings?.whatsapp || '',
    }
  })



  useEffect(() => {
    if (props.flash?.success) {
      toast.success(props.flash.success)
    }
    if (props.flash?.error) {
      toast.error(props.flash.error)
    }
  }, [props.flash])

  const onSubmit = (data: any) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })

    formData.append('_method', 'put')

    router.post(`/admin/settings/${settings?.id || 1}`, formData, {
      preserveScroll: true,
      onSuccess: () => {
        // toast handled
      }
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.settings.title')}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-4">
            {/* General Info */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{t('admin.settings.general_info')}</CardTitle>
                <CardDescription>{t('admin.settings.general_desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app_name_ar">{t('admin.settings.app_name_ar')} *</Label>
                  <Input
                    id="app_name_ar"
                    {...register('app_name_ar')}
                    required
                  />
                  <InputError message={errors.app_name_ar?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app_name_en">{t('admin.settings.app_name_en')} *</Label>
                  <Input
                    id="app_name_en"
                    {...register('app_name_en')}
                  
                  />
                  <InputError message={errors.app_name_en?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copy_right_ar">{t('admin.settings.copy_right_ar')}</Label>
                  <Input
                    id="copy_right_ar"
                    {...register('copy_right_ar')}
                  />
                  <InputError message={errors.copy_right_ar?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copy_right_en">{t('admin.settings.copy_right_en')}</Label>
                  <Input
                    id="copy_right_en"
                    {...register('copy_right_en')}
                  />
                
                  <InputError message={errors.copy_right_en?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('admin.settings.phone')}</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    dir="ltr"
                  />
                
                  <InputError message={errors.phone?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{t('admin.settings.whatsapp')}</Label>
                  <Input
                    id="whatsapp"
                    {...register('whatsapp')}
                    dir="ltr"
                  />
                  <InputError message={errors.whatsapp?.message} />
                </div>
              </CardContent>
            </Card>

            {/* Descriptions & About */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>{t('admin.settings.descriptions')}</CardTitle>
                <CardDescription>{t('admin.settings.descriptions_desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description_ar">{t('admin.settings.description_ar')}</Label>
                  <textarea
                    id="description_ar"
                    {...register('description_ar')}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <InputError message={errors.description_ar?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_en">{t('admin.settings.description_en')}</Label>
                  <textarea
                    id="description_en"
                    {...register('description_en')}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <InputError message={errors.description_en?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_ar">{t('admin.settings.about_ar')}</Label>
                  <textarea
                    id="about_ar"
                    {...register('about_ar')}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <InputError message={errors.about_ar?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_en">{t('admin.settings.about_en')}</Label>
                  <textarea
                    id="about_en"
                    {...register('about_en')}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <InputError message={errors.about_en?.message} />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>{t('admin.settings.images')}</CardTitle>
                <CardDescription>{t('admin.settings.images_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <ImagePicker
                    id="app_logo"
                    label={t('admin.settings.app_logo')}
                    initialPreview={settings?.app_logo}
                    onChange={(file) => setValue('app_logo', file)}
                    // error={errors.app_logo}
                    
                  />
                  <ImagePicker
                    id="app_logo_black"
                    label={t('admin.settings.app_logo_black')}
                    initialPreview={settings?.app_logo_black}
                    onChange={(file) => setValue('app_logo_black', file)}
                    // error={errors.app_logo_black}
                    
                  />
                  <ImagePicker
                    id="app_favicon"
                    label={t('admin.settings.app_favicon')}
                    initialPreview={settings?.app_favicon}
                    onChange={(file) => setValue('app_favicon', file)}
                    // error={errors.app_favicon}
                  />
                  <ImagePicker
                    id="app_favicon_white"
                    label={t('admin.settings.app_favicon_white')}
                    initialPreview={settings?.app_favicon_white}
                    onChange={(file) => setValue('app_favicon_white', file)}
                    
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto ">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('common.saving')}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t('common.save')}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
