'use client'

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { donationConfig } from '@/utils/actions/donation-config'
import { Plus, Trash2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
  donationType: 'one-time' | 'subscription' | 'both'
  subscriptionFrequencies: string[]
  allowCustomAmount: boolean
  oneTimeAmounts: { value: string }[]
  subscriptionAmounts: { value: string }[]
}

export default function DonationConfigComponent({
  churchInfo, userId
}: {
  churchInfo: any,
  userId: string
}) {

  const router = useRouter()
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      donationType: 'one-time',
      subscriptionFrequencies: [],
      allowCustomAmount: true,
      oneTimeAmounts: [{ value: '10' }, { value: '20' }, { value: '50' }, { value: '100' }],
      subscriptionAmounts: [{ value: '10' }, { value: '20' }, { value: '50' }, { value: '100' }],
    },
    mode: 'onChange'
  })

  const { fields: oneTimeFields, append: appendOneTime, remove: removeOneTime } = useFieldArray({
    control,
    name: 'oneTimeAmounts'
  })

  const { fields: subscriptionFields, append: appendSubscription, remove: removeSubscription } = useFieldArray({
    control,
    name: 'subscriptionAmounts'
  })

  const donationType = watch('donationType')
  const allowCustomAmount = watch('allowCustomAmount')
  const subscriptionFrequencies = watch('subscriptionFrequencies')

  async function onSubmit(data: FormData) {
    try {
      const response = await donationConfig({
        church_id: churchInfo?.church_id, user_id: userId, configJson: data
      })

      console.log('response', response)

      if (response?.success) {
        toast.success("Donation configuration is set")

        router.push("/dashboard/pricing")
        return response

      }

      toast.warning("Donation configuration failed")

    } catch (error) {
      return error
    }
  }


  return (
    <Card className="w-full max-w-2xl m-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Configure Donations</CardTitle>
          <CardDescription>Set up your donation preferences for your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Donation Type</Label>
            <Controller
              name="donationType"
              control={control}
              rules={{
                validate: (value) => {
                  if ((value === 'subscription' || value === 'both') && subscriptionFrequencies.length === 0) {
                    return 'Please select at least one subscription frequency'
                  }
                  return true
                }
              }}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <Label htmlFor="subscription">Subscription</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {(donationType === "subscription" || donationType === "both") && (
            <div className="space-y-2">
              <Label>Subscription Frequencies</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {['daily', 'weekly', 'monthly', 'yearly'].map((frequency) => (
                  <Controller
                    key={frequency}
                    name="subscriptionFrequencies"
                    control={control}
                    rules={{
                      validate: (value) => value.length > 0 || 'Please select at least one frequency'
                    }}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={frequency}
                          checked={field.value.includes(frequency)}
                          onCheckedChange={(checked) => {
                            const updatedFrequencies = checked
                              ? [...field.value, frequency]
                              : field.value.filter((f) => f !== frequency)
                            field.onChange(updatedFrequencies)
                          }}
                        />
                        <Label htmlFor={frequency} className="capitalize">{frequency}</Label>
                      </div>
                    )}
                  />
                ))}
              </div>
              {errors.subscriptionFrequencies && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.subscriptionFrequencies.message}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                name="allowCustomAmount"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="allowCustom"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="allowCustom">Allow custom amount</Label>
            </div>
          </div>

          <div className={`space-y-4 ${!allowCustomAmount ? 'opacity-50 pointer-events-none' : ''}`}>
            {(donationType === "one-time" || donationType === "both") && (
              <div className="space-y-2">
                <Label>One-time Donation Amounts</Label>
                <div className="space-y-2">
                  {oneTimeFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Controller
                        name={`oneTimeAmounts.${index}.value`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            placeholder={`Amount ${index + 1}`}
                          />
                        )}
                      />
                      <Button variant="outline" size="icon" onClick={() => removeOneTime(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => appendOneTime({ value: '' })} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Amount
                  </Button>
                </div>
              </div>
            )}

            {(donationType === "subscription" || donationType === "both") && (
              <div className="space-y-2">
                <Label>Subscription Donation Amounts</Label>
                <div className="space-y-2">
                  {subscriptionFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Controller
                        name={`subscriptionAmounts.${index}.value`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...field}
                            placeholder={`Amount ${index + 1}`}
                          />
                        )}
                      />
                      <Button variant="outline" size="icon" onClick={() => removeSubscription(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => appendSubscription({ value: '' })} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Amount
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Configuration</Button>
        </CardFooter>
      </form>
    </Card>
  )
}