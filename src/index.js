import express from "express";
import { createServer } from "http";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "apollo-server-express";
// import { WebSocketServer } from 'ws'
//application that listens to any port with some protocols
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import { useServer } from 'graphql-ws/lib/use/ws'
// import { PubSub } from 'graphql-subscriptions'
import models from "./models/index.js";
// import middlewares from './middelwares/index'
import schemaWithoutMiddleware from "./modules/index.js";
import cors from "cors";
// import { validateToken } from './middelwares/auth.middleware.js'
// import rest from './rest'
// import './utils/schedule'

const port = process.env.PORT || 4000;
// export const pubsub = new PubSub()
(async () => {
  const app = express();
  const httpServer = createServer(app);

  const schema = applyMiddleware(schemaWithoutMiddleware);

  // const wsServer = new WebSocketServer({
  //   server: httpServer,
  //   path: '/graphql',
  // })

  // const getDynamicContext = async (ctx, msg, args) => {
  //   if (ctx.connectionParams.Authorization) {
  //     const userData = await validateToken(ctx.connectionParams.Authorization)
  //     return userData
  //   }
  // }

  // const serverCleanup = useServer(
  //   {
  //     schema,
  //     context: async (ctx, msg, args) => {
  //       return getDynamicContext(ctx, msg, args)
  //     },
  //   },
  //   wsServer
  // )//used to cleanup all the existing process

  const server = new ApolloServer({
    schema,
    //   plugins: [
    //     ApolloServerPluginDrainHttpServer({ httpServer }),
    //  //By draining the HTTP server, it ensures that no new requests are accepted
    //  //once the server is shutting down.
    //     {
    //       async serverWillStart() {
    //         return {
    //           async drainServer() {
    //             await serverCleanup.dispose()
    //             //cleanup mechanism for server
    //           },
    //         }
    //       },
    //     },
    //   ],
    context: async ({ req }) => {
      return { models, req };
    },
  });

  await server.start();
  app.use(
    "/graphql",
    cors({
      origin: true,
      credentials: true,
    })
  );
  //This allows requests from any origin and includes credentials (such as cookies
  //or authorization headers) in the request.
  server.applyMiddleware({ app, cors: false })
  //cors:false, indicating that CORS handling is already configured using the cors
  //middleware in the previous app.use statement.
  // rest(app)

  models.sequelize.sync({alter: true}).then(() => {
    httpServer.listen(port, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${port}/graphql`
      );
    });
  });
})();
