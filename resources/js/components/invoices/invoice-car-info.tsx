import React from 'react'
import SectionCard from './section-card'
import { Car } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Field from './field'
import { Input } from '../ui/input'

export default function InvoiceCarInfo({register,errors}:any) {
    const {t}=useTranslation()

    const fields = [
  ['car_no', t('invoices.car_no')],
  ['car_type', t('invoices.car_type')],
  ['car_model', t('invoices.car_model')],
  ['car_color', t('invoices.car_color')],
  ['car_year', t('invoices.car_year')],
  ['car_vin', t('invoices.car_vin')],
  ['car_plate', t('invoices.car_plate')],
  ['car_chassis', t('invoices.car_chassis')],
  ['car_engine', t('invoices.car_engine')],
  ['car_transmission', t('invoices.car_transmission')],
  ['car_fuel', t('invoices.car_fuel')],
] as const;
  return (
     <SectionCard icon={<Car size={18} />} title={t('invoices.car_info')}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* {(
                                [
                                    ['car_no', t('invoices.car_no')],
                                    ['car_type', t('invoices.car_type')],
                                    ['car_model', t('invoices.car_model')],
                                    ['car_color', t('invoices.car_color')],
                                    ['car_year', t('invoices.car_year')],
                                    ['car_vin', t('invoices.car_vin')],
                                    ['car_plate', t('invoices.car_plate')],
                                    ['car_chassis', t('invoices.car_chassis')],
                                    ['car_engine', t('invoices.car_engine')],
                                    ['car_transmission', t('invoices.car_transmission')],
                                    ['car_fuel', t('invoices.car_fuel')],
                                ] as [keyof FormData, string][]
                            ).map(([field, label]) => (
                                <Field key={field} label={label} error={(errors as any)[field]?.message}>
                                    <Input placeholder={label} {...register(field)} />
                                </Field>
                            ))} */}
                            {fields.map(([field, label]) => (
  <Field key={field} label={label} error={(errors as any)[field]?.message}>
    <Input placeholder={label} {...register(field as any)} />
  </Field>
))}
                        </div>
                    </SectionCard>
  )
}
