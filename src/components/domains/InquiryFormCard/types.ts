export interface InquiryFormCardProps {
  domainId: number | string
  domainName: string
  minimumOffer?: number
  currency?: 'jpy' | 'usd'
}

export interface InquiryFormData {
  name: string
  email: string
  offer: string
  budget: string
  message: string
}
