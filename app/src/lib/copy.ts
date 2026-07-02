export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall through to the local textarea method.
    }
  }

  const element = document.createElement('textarea')
  element.value = text
  element.style.position = 'fixed'
  element.style.opacity = '0'
  element.setAttribute('readonly', '')
  document.body.appendChild(element)
  element.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    element.remove()
  }
}
