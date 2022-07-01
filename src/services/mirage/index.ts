import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'

interface MakeServerProps {
  environment?: string;
  timing?: number
}

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer({ environment = "test", timing = 750}: MakeServerProps) {
  let server = createServer({
    environment: environment,
    serializers: {
      application: ActiveModelSerializer
    },
    models: {
      user: Model.extend<Partial<User>>({})
    },
    factories: {
      user: Factory.extend<Partial<User>>({
        name() {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email();
        },
        created_at() {
          return faker.date.recent(10).toISOString();
        }
      })
    },
    seeds(server) {
      server.createList('user', 100);
    },
    routes() {
      this.namespace = 'api';
      this.timing = timing;
      
      this.get('/users', (schema, request) => {
        const { page = 1, per_page = 10 } = request.queryParams;
        const allUsers = schema.all('user');
        const total = allUsers.length;
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const users = allUsers.slice(pageStart, pageEnd);
        return new Response(
          200,
          { 'x-total-count': String(total) },
          users
        )
      });
      this.get('/users/:id');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  })

  return server;
}