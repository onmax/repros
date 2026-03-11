import { blob } from 'hub:blob'

export default eventHandler(() => ({
  driver: blob.driver.name,
  options: blob.driver.options
}))
