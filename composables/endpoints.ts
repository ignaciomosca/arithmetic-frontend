export const endpoints = () => {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl;
}
