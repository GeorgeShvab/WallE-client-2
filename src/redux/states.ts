export const loadingStates = {
  initial: { isError: false, isLoading: true, isSuccess: false },
  failed: { isError: true, isLoading: false, isSuccess: false },
  succeed: { isError: false, isLoading: false, isSuccess: true },
}
