

export interface Customers {
  id: number
  name: string
  email: string
  phone: string
  country: string
  dob: string
  avatarURL: string
  metrics: Metric[]
}

// Types
export interface Metric {
  name: string
  value: number
}

export interface Customer {
  name: string
  metrics: Metric[]
  emails: string[]
}
