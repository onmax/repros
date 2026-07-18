interface Report {
  message: string
}

export async function useReport<T extends Report> () {
  const fetchResult = await useFetch<T>('/api/report')
  fetchResult.data.value?.message

  const asyncDataResult = await useAsyncData<T>(() => $fetch('/api/report'))
  asyncDataResult.data.value?.message
}
