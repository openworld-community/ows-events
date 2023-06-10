import { type FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { type FastifySwaggerUiOptions } from '@fastify/swagger-ui'


export const openApiOptions: FastifyDynamicSwaggerOptions = {
    openapi: {
        info: {
            title: 'Api Peredelano Afisha',
            description: 'REST API Peredelano Afisha',
            version: '0.0.1'
        },
        security: [],
        components: {
            securitySchemes: {
                authJWT: {
                    name: "Authorization",
                    in: 'header',
                    type: 'apiKey',
                    description: 'Для авторизации вставте JWT токен'
                }
            }
        },
    },
    hideUntagged: true,
};


export const openApiUiOptions: FastifySwaggerUiOptions = {
    routePrefix: 'api/docs',
    initOAuth: {},
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next()
        },
        preHandler: function (request, reply, next) {
            next()
        }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
}


