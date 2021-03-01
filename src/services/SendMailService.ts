import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

interface VarieblesNPS {
  name: string;
  title: string;
  description: string;
  user_id: string;
  link: string;
}

interface SendMailObj {
  to: string;
  subject: string;
  variables: VarieblesNPS;
  path: string;
}

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute({ to, subject, variables, path }: SendMailObj) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTamplateParse = handlebars.compile(templateFileContent);

    const html = mailTamplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@sta.com.br',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
