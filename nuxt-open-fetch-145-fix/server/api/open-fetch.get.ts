import { useNitroApp } from 'nitro/app'
import { defineEventHandler } from 'nitro/h3'

export default defineEventHandler(() => {
  const { $api } = useNitroApp()
  return $api('/ping')
})
