interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'pnet';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}
const email = 'andresouza@predialnet.com.br';
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email,
      name: 'André do GoBarber',
    },
  },
} as IMailConfig;
