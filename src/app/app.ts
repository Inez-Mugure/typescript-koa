import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import movieController from './controllers/movie.controller';
import * as bodyParser from 'koa-bodyparser';


const app:Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Initial route
// app.use(async (ctx:Koa.Context) => {
//   ctx.body = 'Hello world';
// });

// Route middleware.
app.use(movieController.routes());
app.use(movieController.allowedMethods());

// Middleware
app.use(bodyParser());

// Application error logging.
app.on('error', console.error);

export default app;