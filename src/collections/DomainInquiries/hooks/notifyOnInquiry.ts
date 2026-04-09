import type { CollectionAfterChangeHook } from 'payload'

/**
 * Logs new domain inquiry submissions to the console.
 * Structured for future Resend integration — replace console.log with
 * email send call when a provider is configured.
 */
export const notifyOnInquiry: CollectionAfterChangeHook = ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  const domainName = typeof doc.domain === 'object' ? doc.domain?.domainName : doc.domainName
  const label = domainName || doc.domainName || 'unknown'

  req.payload.logger.info(
    `[DomainInquiry] New inquiry from ${doc.name} <${doc.email}> for domain "${label}"`,
  )

  // Future: send email via Resend
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'noreply@replay-domains.com',
  //   to: process.env.INQUIRY_NOTIFY_EMAIL || 'craig@...',
  //   subject: `New inquiry for ${label}`,
  //   text: `Name: ${doc.name}\nEmail: ${doc.email}\nOffer: ${doc.offer || 'N/A'}\nBudget: ${doc.budget || 'N/A'}\nMessage: ${doc.message}`,
  // })

  return doc
}
