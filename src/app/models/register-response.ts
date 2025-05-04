export class RegisterResponse {
  username: string;
  email: string;

  constructor(res: any) {  // Không cần private res
    this.username = res.username;
    this.email = res.email;
  }
}

