// User-facing form errors. Keep backend details in the browser console for support.
export function submissionErrorMessage(error) {
  const detail = String(error?.message || error || '')
  if (/timed out|abort|timeout/i.test(detail)) {
    return 'The request timed out and its receipt could not be confirmed. Please contact us before trying again so we can check for a duplicate.'
  }
  if (/row.level security|permission denied|42501|401|403|42P01/i.test(detail)) {
    return 'The website could not save your request because the submission database needs attention. Please contact us using WhatsApp or email.'
  }
  if (/failed to fetch|network|offline|connection/i.test(detail)) {
    return 'We could not reach the submission service. Please check your connection or contact us using WhatsApp or email.'
  }
  return 'Your request could not be confirmed. Please contact us using WhatsApp or email, or try again.'
}
