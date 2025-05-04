export class RegisterRequest {
  constructor(
    public username: string | undefined,
    public password: string | undefined,
    public email: string | undefined
  ) {}
}
