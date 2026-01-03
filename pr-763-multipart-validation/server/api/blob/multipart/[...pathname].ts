export default eventHandler(async (event) => {
  return hubBlob().handleMultipartUpload(event)
})
