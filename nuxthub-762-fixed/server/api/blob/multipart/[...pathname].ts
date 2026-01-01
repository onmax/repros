import { blob } from 'hub:blob'

export default eventHandler((event) => blob.handleMultipartUpload(event))
