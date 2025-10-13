// Zone.js para Node/SSR
import 'zone.js/node';

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

/**
 * Entrada SSR: el dev server pasa un "context" interno (no exportado públicamente).
 * No lo tipamos ni lo importamos; solo lo reenviamos a bootstrapApplication.
 */
export default function bootstrap(context?: unknown) {
  // El 3er argumento es el contexto de arranque del servidor.
  return bootstrapApplication(App, config, context as any);
}
