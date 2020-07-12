
// NOTE phone_numberなども必要あれば追加
export type SignUpInfoType = {
  username: string
  password: string
  email: string
  authCode: string
  showConfirmation: boolean
}

export type SignUpInfoKey = keyof SignUpInfoType
