// Apply the stored/system theme before styles paint to avoid a light flash.
(() => {
  let preference = null;
  try { preference = localStorage.getItem('sv-theme'); } catch {}
  const theme = preference === 'light' || preference === 'dark'
    ? preference : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111614' : '#efeee8');
})();
